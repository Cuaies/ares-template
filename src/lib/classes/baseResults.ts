import { LogScopes } from "../../ts/enums";
import { ResultsStatus } from "../../ts/types";

/**
 * The base class for results.
 */
export abstract class AresBaseResults<T> {
  /**
   * The scope of the results.
   */
  readonly scope: LogScopes;
  /**
   * The success status of the operation.
   */
  protected _success: boolean = undefined!;
  /**
   * The items successfully cached, and not disabled.
   */
  protected _cached: T[] = [];
  /**
   * The items successfully cached, but disabled.
   */
  protected _disabled: T[] = [];
  /**
   * The items unsuccessfully cached.
   */
  protected _uncached: T[] = [];

  constructor(scope: LogScopes) {
    this.scope = scope;
  }

  /**
   * Returns the number of cached items, both `cached` and `disabled`.
   */
  get cachedLength(): number {
    return this._cached.length + this._disabled.length;
  }

  /**
   * Returns the number of cached items.
   */
  get disabledLength(): number {
    return this._disabled.length;
  }

  /**
   * Returns the number of cached items.
   */
  get uncachedLength(): number {
    return this._uncached.length;
  }

  /**
   * Returns the success status of the operation.
   */
  get success(): ResultsStatus {
    if (!this.uncachedLength && (this._success ?? true)) {
      return { success: true, ok: "ok" };
    }
    return { success: false, ok: "non-ok" };
  }

  /**
   * Sets the cached items.
   */
  setCached(value: T[]) {
    this._cached = value;
  }

  /**
   * Sets the success state.
   */
  setSuccess(success: boolean): this {
    this._success = success;
    return this;
  }

  /**
   * Adds an entry to the cached array.
   */
  addCached(entry: T): this {
    this._cached.push(entry);
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
   * Adds an entry to the uncached array.
   */
  addUncached(entry: T): this {
    this._uncached.push(entry);
    return this;
  }

  /**
   * Displays the results of the operation.
   */
  abstract displayResults(): void;
}
