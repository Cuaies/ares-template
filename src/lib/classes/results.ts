import { logger } from "../../modules/logger/logger";
import { LogMessagesCodes, LogScopes } from "../../ts/enums";
import { ResultsStatus } from "../../ts/types";

/**
 * Represents the handler used to store and display the state of the manager's loading operation.
 */
export abstract class AresResults<T> {
  /**
   * Defines the scope, used to categorize and filter log entries.
   */
  readonly scope: LogScopes;

  /**
   * The status of the operation.
   */
  private _success: boolean = undefined!;

  /**
   * Returns the status of the loading operation.
   */
  get success(): ResultsStatus {
    if (!this.uncachedLength && (this._success ?? true)) {
      this._success = true;
      return { success: true, ok: "ok" };
    }
    this._success = false;
    return { success: false, ok: "non-ok" };
  }

  /**
   * Sets the success state.
   */
  public setSuccess(success: boolean): this {
    this._success = success;
    return this;
  }

  /**
   * The items successfully cached, and ready to be used in production.
   */
  protected _cached: Set<T> = new Set<T>();

  /**
   * Returns the number of cached items, both production-ready and in development or disabled.
   */
  get cachedLength(): number {
    return this._cached.size + this._disabled.size;
  }

  /**
   * Adds an entry to the cached collection.
   */
  public addCached(entry: T): this {
    this._cached.add(entry);
    return this;
  }

  /**
   * Sets the cached collection.
   */
  public setCached(entry: T[]): this {
    this._cached = new Set<T>(entry);
    return this;
  }

  /**
   * The items successfully cached, but disabled.
   */
  protected _disabled: Set<T> = new Set<T>();

  /**
   * Returns the number of cached items, currently in development or disabled.
   */
  get disabledLength(): number {
    return this._disabled.size;
  }

  /**
   * Adds an entry to the disabled collection.
   */
  public addDisabled(entry: T): this {
    this._disabled.add(entry);
    return this;
  }

  /**
   * The items unsuccessfully cached.
   */
  protected _uncached: Set<string> = new Set<string>();

  /**
   * Returns the number of uncached items.
   */
  get uncachedLength(): number {
    return this._uncached.size;
  }

  /**
   * Adds an entry to the uncached collection.
   * @param entry The name of the entry's file that failed to load.
   */
  public addUncached(entry: string): this {
    this._uncached.add(entry);
    return this;
  }

  constructor(scope: LogScopes) {
    this.scope = scope;
  }

  /**
   * Displays the list of uncached items.
   */
  protected displayUncached(): void {
    logger.log(this.scope, LogMessagesCodes.ManagerListUncached, [
      ...this._uncached,
    ]);
  }

  /**
   * Displays the results of the loading operation.
   */
  abstract displayResults(): void;
}
