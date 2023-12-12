import { Client, ClientOptions } from "discord.js";
import { logger } from "../../modules/logger/module";
import { LogMessagesCodes, LogScopes } from "../../ts/enums";
import { AresEventsManager } from "../../modules/events/manager";
import { AresCommandsManager } from "../../modules/commands/manager";
import { AresLocalizationsManager } from "../../modules/localization/manager";
import config from "config";
import {
  COMMAND_HANDLERS_PATH,
  EVENT_HANDLERS_PATH,
  LOCALIZATION_HANDLERS_PATH,
} from "../constants";

/**
 * Client class used to interact with the Discord API.
 */
export class AresClient extends Client {
  public eventsManager?: AresEventsManager;
  public commandsManager?: AresCommandsManager;
  public localizationsManager?: AresLocalizationsManager;

  constructor(opts: ClientOptions) {
    super(opts);

    if (config.modules.events.active) {
      this.eventsManager = new AresEventsManager(this);
    }

    if (config.modules.commands.active) {
      this.commandsManager = new AresCommandsManager(this);
    }

    if (config.modules.localization.active) {
      this.localizationsManager = new AresLocalizationsManager(this);
    }
  }

  /**
   * Initializes the client.
   */
  async init(token: string) {
    try {
      const eventsManagerInit = this.eventsManager?.init({
        loader: { dirPath: EVENT_HANDLERS_PATH },
      });
      const commandsManagerInit = this.commandsManager?.init({
        loader: { dirPath: COMMAND_HANDLERS_PATH },
      });
      const localizationsManagerInit = this.localizationsManager?.init({
        loader: { dirPath: LOCALIZATION_HANDLERS_PATH },
      });

      await Promise.all([
        eventsManagerInit,
        commandsManagerInit,
        localizationsManagerInit,
      ]);
    } catch (err) {
      logger.log(err as unknown as Error);
      this.destroy();
      return;
    }

    logger.log(
      LogScopes.Client,
      LogMessagesCodes.ClientAttemptingLogin,
      this.shard!.ids.toString()
    );

    await this.login(token);
  }
}
