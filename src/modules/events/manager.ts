import AresEventsManagerResults from "./results";
import AresEventHandler from "./handler";
import { basename } from "path";
import { AresClient } from "../../lib/classes/client";
import { logger } from "../logger/logger";
import { getDirContent } from "../../utils/helpers";
import { isAresEventHandler } from "../../utils/typeguards";
import { AresError } from "../../lib/classes/error";
import { AresCachedManager } from "../../lib/classes/cacheManager";
import { ClientEvents } from "discord.js";
import {
  LogErrorMessagesCodes,
  LogMessagesCodes,
  LogScopes,
} from "../../ts/enums";
import {
  EVENTS_MANAGER_REQUIRED_DIR,
  EVENTS_MANAGER_REQUIRED_PATH,
} from "../../lib/constants";

/**
 * The events manager, responsible for handling the client's events.
 */
export class AresEventsManager extends AresCachedManager<
  keyof ClientEvents,
  AresEventHandler
> {
  readonly results = new AresEventsManagerResults(this.scope);

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
   * Fetches the event handlers from the supplied directory,
   * and further processes them.
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
   * Caches the supplied handler, based on the validation results.
   * @param filePath The path to the supplied handler.
   */
  private async cacheEventHandler(filePath: string): Promise<void> {
    const handler: AresEventHandler = (await import(filePath)).default;
    const filename = basename(filePath);

    const valid = this.validateHandlerInput(handler, filename);
    if (!valid) {
      this.results.addUncached(filename);
      return;
    }

    handler.production
      ? this.results.addCached(handler)
      : this.results.addDisabled(handler);
    this.cache.set(handler.name, handler);
  }

  /**
   * Verifies whether the supplied handler is valid or not
   * and and performs validations.
   * @param input The data to validate.
   * @param filename The filename of the supplied input.
   * @returns `true` if the input is valid, `false` otherwise.
   */
  private validateHandlerInput(input: unknown, filename: string): boolean {
    if (!isAresEventHandler(input)) {
      logger.log(
        this.scope,
        LogMessagesCodes.EventsManagerInvalidHandler,
        filename
      );

      return false;
    }

    if (this.cache.has(input.name)) {
      logger.log(
        this.scope,
        LogMessagesCodes.EventsManagerDuplicatedHandler,
        input.name
      );

      return false;
    }

    return true;
  }

  /**
   * Registers cached handlers.
   */
  public async registerEventHandlers(): Promise<void> {
    this.cache.forEach((handler) => {
      if (this.production && !handler.production) return;

      try {
        handler.once
          ? this.client.once(handler.name, (...props) =>
              handler.execute(...props)
            )
          : this.client.on(handler.name, (...props) =>
              handler.execute(...props)
            );

        logger.log(
          this.scope,
          LogMessagesCodes.EventsManagerListeningForEvent,
          handler.name
        );
      } catch (e) {
        logger.log(e as Error);
      }
    });
  }
}
