import { Client, ClientOptions } from "discord.js";
import { logger } from "../../modules/logger/logger";
import { LogMessagesCodes } from "../../ts/enums";

/**
 * Client class used to interact with the Discord API.
 */
export class AresClient extends Client {
  constructor(opts: ClientOptions) {
    super(opts);
  }

  /**
   * Initializes the client.
   */
  async init(token: string) {
    logger.log(LogMessagesCodes.ClientAttemptedLogin);
    await this.login(token);
  }
}
