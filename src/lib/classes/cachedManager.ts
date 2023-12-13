import { Collection } from "discord.js";
import {
  LogErrorMessagesCodes,
  LogMessagesCodes,
  LogScopes,
} from "../../ts/enums";
import { AresClient } from "./client";
import { AresCachedResults } from "./cachedResults";
import { AresError } from "./error";
import { AresBaseManager } from "./baseManager";
import { logger } from "../../modules/logger/module";

/**
 * Abstract class that serves as the foundation for managing cached data.
 * Inherits basic manager functionalities and introduces caching capabilities.
 *
 * @typeParam Key - The type of keys used for caching.
 * @typeParam Value - The type of values associated with the cached keys.
 */
export abstract class AresCachedManager<Key, Value> extends AresBaseManager {
  /**
   * Results instance associated with the manager.
   * @override
   */
  protected readonly results = new AresCachedResults(this.scope);

  /**
   * The collection of cached items.
   */
  readonly cache: InstanceType<typeof Collection<Key, Value>>;

  constructor(client: AresClient, scope: LogScopes) {
    super(client, scope);

    this.cache = new Collection();
  }

  /**
   * Validates whether the entry meets the generic conditions for the manager cache.
   * @param key - The key to validate.
   * @param value - The value to validate.
   * @returns `true` if the entry meets the generic conditions for the manager cache; otherwise `false`.
   */
  private checkGenericConditions(key: Key, value: Value): boolean {
    if (this.cache.has(key)) {
      logger.log(
        this.scope,
        LogMessagesCodes.CacheManagerDuplicatedEntry,
        `${key}`
      );

      return false;
    }
    return true;
  }

  /**
   * Validates whether the entry meets the specific conditions for the manager cache.
   * @param value - The value to validate.
   * @returns `true` if the entry meets the specific conditions for the manager cache; otherwise `false`.
   *
   * @remarks
   * Method used in further entry validation, checking for specific conditions based on the entry type.
   *
   * @virtual
   */
  protected checkSpecificConditions?(key: Key, value: Value): boolean;

  /**
   * Validates whether the value meets the conditions for the manager cache.
   * @param value - The value to validate.
   */
  private isValidValue(key: Key, value: Value): boolean {
    if (
      !this.checkGenericConditions(key, value) ||
      (this.checkSpecificConditions &&
        !this.checkSpecificConditions(key, value))
    ) {
      this.results.uncached.add(`${key}`);
      this.results.setStatus(false);
      return false;
    }
    return true;
  }

  /**
   * Adds a new entry to the cache.
   * @param key - The key to add.
   * @param value - The value to add.
   */
  public add(key: Key, value: Value): void {
    if (!this.isValidValue(key, value)) return;

    this.cache.set(key, value);
    this.results.cached.add(`${key}`);

    logger.log(this.scope, LogMessagesCodes.CacheManagerAddedEntry, `${key}`);
  }

  /**
   * Deletes an entry from the cache.
   * @param key - The key to delete.
   */
  public delete(key: Key): void {
    throw new AresError(
      this.scope,
      LogErrorMessagesCodes.MethodNotImplemented,
      this.delete.name
    );
  }
}
