import { Collection } from "discord.js";
import { LogErrorMessagesCodes, LogScopes } from "../../ts/enums";
import { AresClient } from "./client";
import { AresCachedResults } from "./cacheResults";
import { AresError } from "./error";
import { AresBaseManager } from "./baseManager";

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
  readonly results = new AresCachedResults(this.scope);

  /**
   * The collection of cached items.
   */
  readonly cache: InstanceType<typeof Collection<Key, Value>>;

  constructor(client: AresClient, scope: LogScopes) {
    super(client, scope);

    this.cache = new Collection();
  }

  /**
   * Adds a new entry to the cache.
   * @param key - The key to add.
   * @param value - The value to add.
   */
  public add(key: Key, value: Value): void {
    throw new AresError(
      this.scope,
      LogErrorMessagesCodes.MethodNotImplemented,
      this.add.name
    );
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
