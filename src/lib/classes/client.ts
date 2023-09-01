import { Client, ClientOptions } from "discord.js";
import { logger } from "../../modules/logger/logger";
import { LogMessagesCodes, LogScopes } from "../../ts/enums";
import { AresEventsManager } from "../../modules/events/manager";
import { AresCommandsManager } from "../../modules/commands/manager";
import config from "config";

/**
 * Client class used to interact with the Discord API.
 */
export class AresClient extends Client {
  public eventsManager?: AresEventsManager;
  public commandsManager?: AresCommandsManager;

  constructor(opts: ClientOptions) {
    super(opts);

    if (config.modules.events.active) {
      this.eventsManager = new AresEventsManager(this);
    }

    if (config.modules.commands.active) {
      this.commandsManager = new AresCommandsManager(this);
    }
  }

  /**
   * Initializes the client.
   */
  async init(token: string) {
    try {
      const eventsManagerInit = this.eventsManager?.init();
      const commandsManagerInit = this.commandsManager?.init();

      await Promise.all([eventsManagerInit, commandsManagerInit]);
    } catch (err) {
      logger.log(err as unknown as Error);
    }

    logger.log(
      LogScopes.Client,
      LogMessagesCodes.ClientAttemptingLogin,
      this.shard?.ids.toString()
    );
    await this.login(token);
  }
}
