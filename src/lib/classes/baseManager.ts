import { BaseResults } from "./baseResults";
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
  abstract readonly results: InstanceType<typeof BaseResults>;

  constructor(client: AresClient) {
    super();
    this.client = client;
  }

  /**
   * Initializes the manager.
   */
  abstract init(): Promise<void>;
}