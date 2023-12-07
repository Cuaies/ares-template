import { LogScopes } from "../../ts/enums";
import { AresResults } from "./baseResults";

export class AresCachedResults extends AresResults {
  private _cached: Set<string> = new Set<string>();

  get cachedSize(): number {
    return this._cached.size;
  }

  private _disabled: Set<string> = new Set<string>();

  get disabledSize(): number {
    return this._disabled.size;
  }

  private _uncached: Set<string> = new Set<string>();

  get uncachedSize(): number {
    return this._uncached.size;
  }

  constructor(scope: LogScopes) {
    super(scope);
  }

  public addCached(entry: string): this {
    this._cached.add(entry);
    return this;
  }

  public setCached(entry: string[]): this {
    this._cached = new Set<string>(entry);
    return this;
  }

  public addDisabled(entry: string): this {
    this._disabled.add(entry);
    return this;
  }

  public setDisabled(entry: string[]): this {
    this._disabled = new Set<string>(entry);
    return this;
  }

  public addUncached(entry: string | string): this {
    this._uncached.add(entry);
    return this;
  }

  public setUncached(entry: string[]): this {
    this._uncached = new Set<string>(entry);
    return this;
  }
}
