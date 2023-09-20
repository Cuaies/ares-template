import { AresResults } from "../../lib/classes/results";
import { LogMessagesCodes, LogScopes } from "../../ts/enums";
import { logger } from "../logger/logger";
import AresEventHandler from "./handler";

export default class AresEventsManagerResults extends AresResults<
  InstanceType<typeof AresEventHandler>
> {
  constructor(scope: LogScopes) {
    super(scope);
  }

  displayResults() {
    const { ok } = this.success;

    logger.log(
      this.scope,
      LogMessagesCodes.EventsManagerCachedEventsResult,
      this.cachedLength,
      this.disabledLength,
      ok
    );

    this.displayUncached();
  }
}
