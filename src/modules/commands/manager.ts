import { basename } from "path";
import { AresCachedManager, AresClient, AresError } from "../../lib/classes";
import { AresApplicationCommandType, AresManagerOptions } from "../../ts/types";
import { getDirContent } from "../../utils/helpers";
import { isAresApplicationCommandType } from "../../utils/typeguards";
import { logger } from "../logger/module";
import {
  LogErrorMessagesCodes,
  LogMessagesCodes,
  LogScopes,
} from "../../ts/enums";

/**
 * Represents the client's commands manager.
 */
export class AresCommandsManager extends AresCachedManager<
  string,
  AresApplicationCommandType
> {
  constructor(client: AresClient) {
    super(client, LogScopes.CommandsManager);
  }

  /**
   * @override
   */
  protected checkSpecificConditions(
    key: string,
    value: AresApplicationCommandType
  ): boolean {
    if (!isAresApplicationCommandType(value)) {
      logger.log(this.scope, LogMessagesCodes.CacheManagerInvalidEntry, key);

      return false;
    }

    if (value.data.isDisabled) {
      this.results.disabled.add(key);
    }

    return true;
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

    for (const dir of Object.values(content.subDirs)) {
      for (const file of dir.files) {
        const handler = (await import(file.path))
          .default as AresApplicationCommandType;

        this.add(handler.data?.name ?? file.filename, handler);
      }
    }
  }
}
