import { AresResults } from "../../lib/classes/results";
import { LogMessagesCodes, LogScopes } from "../../ts/enums";
import { isAresEventHandler } from "../../utils/typeguards";
import { logger } from "../logger/logger";
import AresEventHandler from "./handler";

export default class AresEventsManagerResults extends AresResults<
  InstanceType<typeof AresEventHandler>
> {
  constructor(scope: LogScopes) {
    super(scope);
  }

  display() {
    const { success, ok } = this.success;

    logger.log(
      this.scope,
      LogMessagesCodes.EventsManagerCachedEventsResult,
      this.cachedLength,
      this.disabledLength,
      ok
    );

    if (success) {
      this.displayCached(
        [...this._cached, ...this._disabled].map((entry) => entry.name)
      );
    } else {
      this.displayUncached(
        Array.from(this._uncached).map((entry) =>
          isAresEventHandler(entry) ? entry.name : entry
        )
      );
    }
  }
}
