import { AresClient } from "./client";

/**
 * The foundation of all classes.
 */
export class AresBase {
  /**
   * Defines the state of the process, whether it's running in production mode or not.
   */
  readonly production: boolean = process.env.NODE_ENV === "production";
  /**
   * The client that instantiated this class.
   */
  readonly client: AresClient;

  protected constructor(client: AresClient) {
    this.client = client;
  }
}
