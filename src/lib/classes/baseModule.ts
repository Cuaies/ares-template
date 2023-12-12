import { LogScopes } from "../../ts/enums";
import { AresBase } from "./base";
import { AresClient } from "./client";

/**
 * Represents the base class for modules.
 */
export class AresBaseModule extends AresBase {
  /**
   * Represents the scope of the logger, enabling categorization and filtering of log entries.
   */
  protected readonly scope: LogScopes;

  /**
   * Represents the client that instantiated this class.
   */
  readonly client: AresClient;

  protected constructor(client: AresClient, scope: LogScopes) {
    super();

    this.client = client;
    this.scope = scope;
  }
}
