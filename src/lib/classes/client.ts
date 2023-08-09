import { Client, ClientOptions } from "discord.js";
import { logger } from "../../modules/logger/logger";
import { LogMessagesCodes, LogScopes } from "../../ts/enums";
import { AresEventManager } from "../../modules/events/manager";

/**
 * Client class used to interact with the Discord API.
 */
export class AresClient extends Client {
  public eventsManager: AresEventManager;

  constructor(opts: ClientOptions) {
    super(opts);

    this.eventsManager = new AresEventManager(this);
  }

  /**
   * Initializes the client.
   */
  async init(token: string) {
    try {
      const eventsManagerInit = this.eventsManager.init();

      await Promise.all([eventsManagerInit]);
    } catch (err) {
      logger.log(err as unknown as Error);
      return this.destroy();
    }

    logger.log(
      LogScopes.Client,
      LogMessagesCodes.ClientAttemptingLogin,
      this.shard!.ids.toString()
    );
    await this.login(token);
  }
}
