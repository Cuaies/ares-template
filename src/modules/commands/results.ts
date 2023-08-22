import { AresBaseResults } from "../../lib/classes/baseResults";
import { LogMessagesCodes, LogScopes } from "../../ts/enums";
import { AresApplicationCommandType } from "../../ts/types";
import { logger } from "../logger/logger";

export default class CommandManagerResults extends AresBaseResults<AresApplicationCommandType> {
  constructor(scope: LogScopes) {
    super(scope);
  }

  displayResults(): void {
    const { ok } = this.success;

    logger.log(
      this.scope,
      LogMessagesCodes.CommandsManagerCachedCommandsResult,
      this._cached.length + this._disabled.length,
      this._disabled.length,
      ok
    );
  }
}
