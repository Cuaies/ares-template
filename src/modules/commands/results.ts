import { AresBaseResults } from "../../lib/classes/baseResults";
import { LogMessagesCodes, LogScopes } from "../../ts/enums";
import { AresApplicationCommandType } from "../../ts/types";
import { UNKNOWN } from "../../utils/constants";
import { logger } from "../logger/logger";

export default class CommandManagerResults extends AresBaseResults<AresApplicationCommandType> {
  constructor(scope: LogScopes) {
    super(scope);
  }

  displayResults(): void {
    const { ok, success } = this.success;

    logger.log(
      this.scope,
      LogMessagesCodes.CommandsManagerCachedCommandsResult,
      this._cached.length + this._disabled.length,
      this._disabled.length,
      ok
    );

    logger.log(
      this.scope,
      LogMessagesCodes.CommandsManagerCachesCommandsList,
      this._cached
        .concat(this._disabled)
        .map(
          (command) =>
            `${!command.data.production ? "!" : ""}${command.data.name}-${
              command.data.type
            }`
        )
    );

    if (!success) {
      logger.log(
        this.scope,
        LogMessagesCodes.CommandsManagerUncachedCommandsList,
        this._uncached.map((command) => command.data.name ?? UNKNOWN)
      );
    }
  }
}
