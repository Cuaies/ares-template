import { LogScopes } from "../../ts/enums";
import { AresBaseResults } from "./baseResults";
import { AresCacheManager } from "./cacheManager";
import { AresClient } from "./client";

/**
 * The base class for all managers.
 */
export abstract class AresBaseManager extends AresCacheManager {
  /**
   * The client instance.
   */
  readonly client: AresClient;

  /**
   * Manager's results class.
   */
  abstract readonly results: InstanceType<typeof AresBaseResults>;

  constructor(client: AresClient, scope: LogScopes) {
    super(scope);

    this.client = client;
  }

  /**
   * Initializes the manager.
   */
  abstract init(): Promise<void>;
}
