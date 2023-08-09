import { AresBaseResults } from "../../lib/classes/baseResults";
import { LogMessagesCodes, LogScopes } from "../../ts/enums";
import { logger } from "../logger/logger";
import AresEventHandler from "./handler";

export default class AresEventManagerResults extends AresBaseResults<
  InstanceType<typeof AresEventHandler>
> {
  constructor(scope: LogScopes) {
    super(scope);
  }

  displayResults() {
    const { success, ok } = this.success;

    logger.log(
      this.scope,
      LogMessagesCodes.EventsManagerCachedEventsResult,
      this._cached.length + this._disabled.length,
      this._disabled.length,
      ok
    );

    if (!success) {
      logger.log(
        this.scope,
        LogMessagesCodes.EventsManagerUncachedEventsResult,
        this._uncached.map((event) => event.name)
      );
    }
  }
}
