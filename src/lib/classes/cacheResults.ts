import { logger } from "../../modules/logger/logger";
import { LogMessagesCodes, LogScopes } from "../../ts/enums";
import { AresResults } from "./baseResults";

/**
 * Represents the results of the caching operations of the cached manager.
 * Extends the base results class and introduces sets for different types of results.
 */
export class AresCachedResults extends AresResults {
  /**
   * A set containing the entries that were successfully cached.
   */
  public cached: Set<string>;

  /**
   * A set containing the entries that were valid but were disabled.
   */
  public disabled: Set<string>;

  /**
   * A set containing the entries that were invalid and were not cached.
   */
  public uncached: Set<string>;

  constructor(scope: LogScopes) {
    super(scope);

    this.cached = new Set<string>();
    this.disabled = new Set<string>();
    this.uncached = new Set<string>();
  }

  /**
   * @override
   */
  public display() {
    const { scope, status, cached, disabled, uncached } = this;

    logger.log(
      scope,
      LogMessagesCodes.CacheManagerDisplayResults,
      status,
      cached,
      disabled,
      uncached
    );
  }
}
