import { join, basename } from "path";
import { AresBaseManager } from "../../lib/classes/baseManager";
import { AresClient } from "../../lib/classes/client";
import { LogMessagesCodes, LogScopes } from "../../ts/enums";
import { AresApplicationCommandType, CommandCollection } from "../../ts/types";
import { getDirContent } from "../../utils/helpers";
import { isAresCommand } from "../../utils/typeguards";
import { logger } from "../logger/logger";
import CommandManagerResults from "./results";

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
    this.results.displayResults();
  }

  /**
   * Caches all of the application commands found.
   * @param dirPath Path to the command handlers' directory.
   */
  public async load(dirPath: string): Promise<void> {
    const { subDirs } = (await getDirContent(dirPath))["handlers"];

    for (const dir of Object.values(subDirs)) {
      for (const file of dir.files) {
        const command: AresApplicationCommandType = (await import(file.path))
          .default;

        if (!isAresCommand(command)) {
          logger.log(
            this.scope,
            LogMessagesCodes.CommandsManagerInvalidCommand,
            join(basename(dir.baseDirPath), basename(file.path))
          );

          this.results.addUncached(command);
          continue;
        }

        if (this.cache.has(command.data.name)) {
          logger.log(
            this.scope,
            LogMessagesCodes.CommandsManagerDuplicatedCommand,
            command.data.name,
            join(basename(dir.baseDirPath), basename(file.path))
          );

          this.results.addUncached(command);
          continue;
        }

        // TODO: validate before caching

        command.data.production
          ? this.results.addDisabled(command)
          : this.results.addCached(command);
        this.cache.set(command.data.name, command);
      }
    }
  }
}
