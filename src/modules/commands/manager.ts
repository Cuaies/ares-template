import { join } from "path";
import { AresBaseManager } from "../../lib/classes/baseManager";
import CommandManagerResults from "./results";
import { AresClient } from "../../lib/classes/client";
import { LogScopes } from "../../ts/enums";
import { CommandCollection } from "../../ts/types";

/**
 * Path to the command handlers' directory.
 */
const COMMANDS_PATH = join(__dirname, "handlers");

export class AresCommandsManager extends AresBaseManager {
  readonly results = new CommandManagerResults(this.scope);
  declare readonly cache: CommandCollection;

  constructor(client: AresClient) {
    super(client, LogScopes.CommandsManager);
  }

  /**
   * @param dirPath Path to the command handlers' directory.
   */
  public async init(dirPath: string = COMMANDS_PATH): Promise<void> {
    await this.load(dirPath);
  }

  /**
   * Caches the command handler.
   * @param dirPath Path to the command handlers' directory.
   */
  public async load(dirPath: string): Promise<void> {
    return;
  }
}
