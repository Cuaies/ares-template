import { basename } from "path";
import { AresBaseManager } from "../../lib/classes/baseManager";
import { EventsCollection } from "../../ts/types";
import { AresClient } from "../../lib/classes/client";
import { logger } from "../logger/logger";
import { getDirContent } from "../../utils/helpers";
import AresEventManagerResults from "./results";
import AresEventHandler from "./handler";
import { isAresEventHandler } from "../../utils/typeguards";
import { AresError } from "../../lib/classes/error";
import {
  LogErrorMessagesCodes,
  LogMessagesCodes,
  LogScopes,
} from "../../ts/enums";
import {
  EVENTS_MANAGER_REQUIRED_DIR,
  EVENTS_MANAGER_REQUIRED_PATH,
} from "../../utils/constants";

export class AresEventManager extends AresBaseManager {
  readonly results = new AresEventManagerResults(this.scope);
  declare readonly cache: EventsCollection;

  constructor(client: AresClient) {
    super(client, LogScopes.EventsManager);
  }

  /**
   * @param dirPath Path to the event handlers' directory.
   */
  public async init(dirPath: string = EVENTS_MANAGER_REQUIRED_PATH) {
    await this.load(dirPath);
    await this.registerEventHandlers();
    this.results.displayResults();
  }

  /**
   * Caches the event handlers.
   * @param dirPath Path to the event handlers directory.
   */
  public async load(dirPath: string): Promise<void> {
    const dirContent = (await getDirContent(dirPath))[
      EVENTS_MANAGER_REQUIRED_DIR
    ];

    if (!dirContent.validDir) {
      throw new AresError(
        this.scope,
        LogErrorMessagesCodes.ManagerRequiredDir,
        EVENTS_MANAGER_REQUIRED_DIR
      );
    }

    for (const file of dirContent.files) {
      await this.cacheEventHandler(file.path);
    }
  }

  /**
   * Validates the handler's integrity.
   */
  private validateHandler(
    handler: AresEventHandler,
    filePath: string
  ): boolean {
    const file = basename(filePath);

    if (!isAresEventHandler(handler)) {
      logger.log(
        this.scope,
        LogMessagesCodes.EventsManagerInvalidHandler,
        file
      );

      return false;
    }

    if (this.cache.has(handler.name)) {
      logger.log(
        this.scope,
        LogMessagesCodes.EventsManagerDuplicatedHandler,
        handler.name
      );

      return false;
    }

    return true;
  }

  /**
   * Caches a single event handler.
   */
  private async cacheEventHandler(filePath: string): Promise<void> {
    const handler: AresEventHandler = (await import(filePath)).default;

    const valid = this.validateHandler(handler, filePath);
    if (!valid) {
      this.results.addUncached(handler);
      return;
    }

    handler.production
      ? this.results.addCached(handler)
      : this.results.addDisabled(handler);
    this.cache.set(handler.name, handler);
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
