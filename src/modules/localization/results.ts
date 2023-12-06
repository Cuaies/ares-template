import { Locale } from "discord.js";
import { AresResults } from "../../lib/classes/results";
import { LogMessagesCodes, LogScopes } from "../../ts/enums";
import { logger } from "../logger/logger";

export default class AresLocalizationsManagerResults extends AresResults<Locale> {
  constructor(scope: LogScopes) {
    super(scope);
  }

  display(): void {
    const { success, ok } = this.success;

    logger.log(
      this.scope,
      LogMessagesCodes.LocalizationManagerResultsDisplay,
      this.cachedLength,
      ok
    );

    if (success) {
      logger.log(
        this.scope,
        LogMessagesCodes.ManagerListCached,
        Array.from(this._cached)
      );
    } else {
      logger.log(
        this.scope,
        LogMessagesCodes.ManagerListUncached,
        Array.from(this._cached)
      );
    }
  }
}
