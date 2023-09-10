import { Locale } from "discord.js";
import { AresBaseResults } from "../../lib/classes/baseResults";
import { LogMessagesCodes, LogScopes } from "../../ts/enums";
import { logger } from "../logger/logger";

export default class AresLocalizationsManagerResults extends AresBaseResults<Locale> {
  constructor(scope: LogScopes) {
    super(scope);
  }

  displayResults(): void {
    const { ok } = this.success;

    logger.log(
      this.scope,
      LogMessagesCodes.LocalizationManagerResultsDisplay,
      this.cachedLength,
      ok
    );
  }
}
