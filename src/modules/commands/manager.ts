import { join, basename, dirname } from "path";
import { AresBaseManager } from "../../lib/classes/baseManager";
import { AresClient } from "../../lib/classes/client";
import { AresApplicationCommandType, CommandCollection } from "../../ts/types";
import { getDirContent } from "../../utils/helpers";
import { isAresApplicationCommandType } from "../../utils/typeguards";
import { logger } from "../logger/logger";
import AresCommandsManagerResults from "./results";
import { AresError } from "../../lib/classes/error";
import {
  LogErrorMessagesCodes,
  LogMessagesCodes,
  LogScopes,
} from "../../ts/enums";
import {
  COMMANDS_MANAGER_REQUIRED_DIR,
  COMMANDS_MANAGER_REQUIRED_PATH,
} from "../../lib/constants";

export class AresCommandsManager extends AresBaseManager {
  readonly results = new AresCommandsManagerResults(this.scope);
  declare readonly cache: CommandCollection;

  constructor(client: AresClient) {
    super(client, LogScopes.CommandsManager);
  }

  /**
   * @param dirPath Path to the commands' directory.
   */
  public async init(
    dirPath: string = COMMANDS_MANAGER_REQUIRED_PATH
  ): Promise<void> {
    await this.load(dirPath);
    this.results.displayResults();
  }

  /**
   * Caches all of the application commands found.
   * @param dirPath Path to the commands' directory.
   */
  public async load(dirPath: string): Promise<void> {
    const dirContent = (await getDirContent(dirPath))[
      COMMANDS_MANAGER_REQUIRED_DIR
    ];

    if (!dirContent.validDir) {
      throw new AresError(
        this.scope,
        LogErrorMessagesCodes.ManagerRequiredDir,
        COMMANDS_MANAGER_REQUIRED_DIR
      );
    }

    for (const dir of Object.values(dirContent.subDirs)) {
      for (const file of dir.files) {
        await this.cacheCommand(file.path);
      }
    }
  }

  /**
   * Caches a single application command.
   */
  private async cacheCommand(filePath: string): Promise<void> {
    const command: AresApplicationCommandType = (await import(filePath))
      .default;

    const valid = this.validateCommand(command, filePath);
    if (!valid) {
      this.results.addUncached(command);
      return;
    }

    command.data.production
      ? this.results.addCached(command)
      : this.results.addDisabled(command);
    this.cache.set(command.data.name, command);
  }

  /**
   * Validates an application command's integrity.
   */
  private validateCommand(
    command: AresApplicationCommandType,
    filePath: string
  ): boolean {
    const dir = basename(dirname(filePath));
    const file = basename(filePath);

    if (!isAresApplicationCommandType(command)) {
      logger.log(
        this.scope,
        LogMessagesCodes.CommandsManagerInvalidCommand,
        join(dir, file)
      );

      return false;
    }

    if (this.cache.has(command.data.name)) {
      logger.log(
        this.scope,
        LogMessagesCodes.CommandsManagerDuplicatedCommand,
        command.data.name,
        join(dir, file)
      );

      return false;
    }

    // TODO: Add further validation.

    return true;
  }
}
