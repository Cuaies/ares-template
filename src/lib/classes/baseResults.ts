import { LogScopes } from "../../ts/enums";
import { ResultsStatus } from "../../ts/types";

export abstract class BaseResults<T> {
  /**
   * The scope of the results.
   */
  readonly scope: LogScopes;

  protected _cached: T[];
  protected _uncached: T[];
  protected _disabled: T[];

  constructor(scope: LogScopes) {
    this.scope = scope;

    this._cached = [];
    this._uncached = [];
    this._disabled = [];
  }

  /**
   * Returns the success status of the operation.
   */
  get success(): ResultsStatus {
    if (this._uncached.length) {
      return { success: false, ok: "non-ok" };
    }
    return { success: true, ok: "ok" };
  }

  /**
   * Adds an entry to the cached array.
   */
  addCached(entry: T): this {
    this._cached.push(entry);
    return this;
  }

  /**
   * Adds an entry to the uncached array.
   */
  addUncached(entry: T): this {
    this._uncached.push(entry);
    return this;
  }

  /**
   * Adds an entry to the disabled array.
   */
  addDisabled(entry: T): this {
    this._disabled.push(entry);
    return this;
  }

  /**
   * Displays the results of the operation.
   */
  abstract displayResults(): void;
}
