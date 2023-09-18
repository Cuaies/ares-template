import { AresResults } from "../../lib/classes/results";
import { LogMessagesCodes, LogScopes } from "../../ts/enums";
import { AresApplicationCommandType } from "../../ts/types";
import { logger } from "../logger/logger";

export default class AresCommandsManagerResults extends AresResults<AresApplicationCommandType> {
  constructor(scope: LogScopes) {
    super(scope);
  }

  displayResults(): void {
    const { ok } = this.success;

    logger.log(
      this.scope,
      LogMessagesCodes.CommandsManagerCachedCommandsResult,
      this.cachedLength,
      this.disabledLength,
      ok
    );
  }
}
