import { Collection } from "discord.js";
import { LogScopes } from "../../ts/enums";
import { AresBaseManager } from "./baseManager";
import { AresClient } from "./client";

/**
 * The foundation of all cached managers.
 */
export abstract class AresCachedManager<K, V> extends AresBaseManager {
  /**
   * The collection of cached items.
   */
  readonly cache: InstanceType<typeof Collection<K, V>>;

  constructor(client: AresClient, scope: LogScopes) {
    super(client, scope);

    this.cache = new Collection();
  }
}
