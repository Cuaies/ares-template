import AresEventHandler from "./handler";
import { basename } from "path";
import { ClientEvents } from "discord.js";
import { AresCachedManager, AresClient, AresError } from "../../lib/classes";
import {
  LogErrorMessagesCodes,
  LogMessagesCodes,
  LogScopes,
} from "../../ts/enums";
import { getDirContent } from "../../utils/helpers";
import { isAresEventHandler } from "../../utils/typeguards";
import { logger } from "../logger/module";
import { AresManagerOptions } from "../../ts/types";

/**
 * Represents the client's events manager.
 */
export class AresEventsManager extends AresCachedManager<
  keyof ClientEvents,
  AresEventHandler
> {
  constructor(client: AresClient) {
    super(client, LogScopes.EventsManager);
  }

  /**
   * @override
   */
  protected checkSpecificConditions(
    key: keyof ClientEvents,
    value: AresEventHandler
  ): boolean {
    if (!isAresEventHandler(value)) {
      logger.log(this.scope, LogMessagesCodes.CacheManagerInvalidEntry, key);

      return false;
    }

    if (value.isDisabled) {
      this.results.disabled.add(key);
    }

    return true;
  }

  /**
   * Adds a listener function for the cache's handlers.
   */
  private async registerEventHandlers(): Promise<void> {
    this.cache.forEach((handler) => {
      if (this.isProduction && handler.isDisabled) return;

      try {
        handler.isOnce
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

  /**
   * @override
   */
  protected async setup(opts: AresManagerOptions) {
    const content = (await getDirContent(opts.loader.dirPath))[
      basename(opts.loader.dirPath)
    ];

    if (!content.validDir) {
      throw new AresError(
        this.scope,
        LogErrorMessagesCodes.InvalidDirPath,
        content.baseDirPath
      );
    }

    for (const file of content.files) {
      const handler = (await import(file.path)).default as AresEventHandler;

      this.add(handler.name ?? file.filename, handler);
    }

    await this.registerEventHandlers();
  }
}
