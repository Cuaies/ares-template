import { Collection } from "discord.js";
import { AresBaseModule } from "./baseModule";
import { LogScopes } from "../../ts/enums";

/**
 * The base class for all cache managers.
 */
export abstract class AresCacheManager extends AresBaseModule {
  /**
   * The collection of cached items.
   */
  readonly cache: InstanceType<typeof Collection>;

  constructor(scope: LogScopes) {
    super(scope);

    this.cache = new Collection();
  }
}
