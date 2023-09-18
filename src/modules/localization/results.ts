import { Locale } from "discord.js";
import { AresResults } from "../../lib/classes/results";
import { LogMessagesCodes, LogScopes } from "../../ts/enums";
import { logger } from "../logger/logger";

export default class AresLocalizationsManagerResults extends AresResults<Locale> {
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
