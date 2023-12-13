import { basename } from "path";
import { AresCachedManager, AresClient, AresError } from "../../lib/classes";
import { AresApplicationCommand, AresManagerOptions } from "../../ts/types";
import { getDirContent } from "../../utils/helpers";
import { isAresApplicationCommandType } from "../../utils/typeguards";
import { logger } from "../logger/module";
import {
  LogErrorMessagesCodes,
  LogMessagesCodes,
  LogScopes,
} from "../../ts/enums";

export class AresCommandsManager extends AresCachedManager<
  string,
  AresApplicationCommand
> {
  constructor(client: AresClient) {
    super(client, LogScopes.CommandsManager);
  }

  /**
   * @override
   */
  protected checkSpecificConditions(
    key: string,
    value: AresApplicationCommand
  ): boolean {
    if (!isAresApplicationCommandType(value)) {
      logger.log(this.scope, LogMessagesCodes.CacheManagerInvalidEntry, key);

      return false;
    }

    if (value.data.isDisabled) {
      this.results.disabled.add(key);
    }

    // TODO: add validation for required properties

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
          .default as AresApplicationCommand;

        this.add(handler.data?.name ?? file.filename, handler);
      }
    }
  }
}
