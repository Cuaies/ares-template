import { Collection } from "discord.js";

/**
 * The base class for all cache managers.
 */
export abstract class AresCacheManager {
  /**
   * The collection of cached items.
   */
  readonly cache: InstanceType<typeof Collection>;

  constructor() {
    this.cache = new Collection();
  }
}
