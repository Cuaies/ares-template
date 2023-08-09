import { join, basename } from "path";
import { AresBaseManager } from "../../lib/classes/baseManager";
import { EventsCollection } from "../../ts/types";
import { AresClient } from "../../lib/classes/client";
import { LogMessagesCodes, LogScopes } from "../../ts/enums";
import { logger } from "../logger/logger";
import { getDirContent } from "../../utils/helpers";
import AresEventManagerResults from "./results";
import AresEventHandler from "./handler";
import { isEvents } from "../../utils/typeguards";

/**
 * Path to the event handlers directory.
 */
const HANDLERS_PATH = join(__dirname, "handlers");

export class AresEventManager extends AresBaseManager {
  readonly results = new AresEventManagerResults(this.scope);
  declare readonly cache: EventsCollection;

  constructor(client: AresClient) {
    super(client, LogScopes.EventsManager);
  }

  /**
   * @param dirPath Path to the event handlers' directory.
   */
  public async init(dirPath: string = HANDLERS_PATH) {
    await this.load(dirPath);
    await this.registerEventHandlers();
    this.results.displayResults();
  }

  /**
   * Caches the event handlers.
   * @param dirPath Path to the event handlers directory.
   */
  public async load(dirPath: string): Promise<void> {
    const { files } = (await getDirContent(dirPath))["handlers"];

    if (!files.length) {
      this.results.displayResults();
      return;
    }

    await files.reduce(async (p, file) => {
      await p;
      const handlerPath = file.path;
      const handler: AresEventHandler = (await import(handlerPath)).default;

      logger.log(
        this.scope,
        LogMessagesCodes.FileIteration,
        handler.name,
        basename(handlerPath)
      );

      if (isEvents(handler.name)) {
        if (this.cache.has(handler.name)) {
          this.results.addUncached(handler);
          logger.log(
            this.scope,
            LogMessagesCodes.EventsManagerDuplicatedHandler,
            handler.name
          );
          return;
        }

        handler.production
          ? this.results.addCached(handler)
          : this.results.addDisabled(handler);

        this.cache.set(handler.name, handler);
      } else {
        logger.log(
          this.scope,
          LogMessagesCodes.EventsManagerInvalidHandler,
          handler.name
        );

        this.results.addUncached(handler);
      }
    }, Promise.resolve());
  }

  /**
   * Registers cached handlers.
   */
  public async registerEventHandlers(): Promise<void> {
    if (!this.client) return;

    this.cache.forEach((handler) => {
      if (this._production && !handler.production) return;

      logger.log(
        this.scope,
        LogMessagesCodes.EventsManagerListeningForEvent,
        handler.name
      );

      try {
        handler.once
          ? this.client.once(handler.name, (...props) =>
              handler.execute(...props)
            )
          : this.client.on(handler.name, (...props) =>
              handler.execute(...props)
            );
      } catch (e) {
        logger.log(e as Error);
      }
    });
  }
}
