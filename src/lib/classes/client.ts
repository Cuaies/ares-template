import { Client, ClientOptions } from "discord.js";
import { logger } from "../../modules/logger/logger";
import { LogMessagesCodes, LogScopes } from "../../ts/enums";
import { AresEventsManager } from "../../modules/events/manager";
import { AresCommandsManager } from "../../modules/commands/manager";
import { AresLocalizationsManager } from "../../modules/localization/manager";
import config from "config";

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

    if (config.modules.localizations.active) {
      this.localizationsManager = new AresLocalizationsManager(this);
    }
  }

  /**
   * Initializes the client.
   */
  async init(token: string) {
    try {
      const eventsManagerInit = this.eventsManager?.init();
      const commandsManagerInit = this.commandsManager?.init();
      const localizationsManagerInit = this.localizationsManager?.init();

      await Promise.all([
        eventsManagerInit,
        commandsManagerInit,
        localizationsManagerInit,
      ]);
    } catch (err) {
      logger.log(err as unknown as Error);
    }

    logger.log(
      LogScopes.Client,
      LogMessagesCodes.ClientAttemptingLogin,
      this.shard!.ids.toString()
    );
    await this.login(token);
  }
}
