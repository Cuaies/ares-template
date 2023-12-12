import { logger } from "../../modules/logger/logger";
import { LogMessagesCodes, LogScopes } from "../../ts/enums";
import { ResultsStatus } from "../../ts/types";

export class AresResults {
  private _success = true;

  get status(): ResultsStatus {
    return this._success
      ? { success: true, ok: "ok" }
      : { success: false, ok: "non-ok" };
  }

  constructor(readonly scope: LogScopes) {
    this.scope = scope;
  }

  /**
   * Sets the status.
   * @param success - `true` if the operation was successful, `false` otherwise.
   */
  public setStatus(success: boolean): void {
    this._success = success;
  }

  /**
   * @virtual
   * */
  public display() {
    const { scope, status } = this;

    logger.log(scope, LogMessagesCodes.ManagerDisplayResults, status);
  }
}
