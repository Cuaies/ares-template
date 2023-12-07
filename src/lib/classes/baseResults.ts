import { LogErrorMessagesCodes, LogScopes } from "../../ts/enums";
import { ResultsStatus } from "../../ts/types";
import { AresError } from "./error";

export class AresResults {
  private _success: boolean = true;

  get status(): ResultsStatus {
    return this._success
      ? { success: true, ok: "ok" }
      : { success: false, ok: "non-ok" };
  }

  constructor(readonly scope: LogScopes) {
    this.scope = scope;
  }

  public setStatus(): void {
    throw new AresError(
      this.scope,
      LogErrorMessagesCodes.MethodNotImplemented,
      this.setStatus.name
    );
  }

  public display() {
    throw new AresError(
      this.scope,
      LogErrorMessagesCodes.MethodNotImplemented,
      this.display.name
    );
  }
}
