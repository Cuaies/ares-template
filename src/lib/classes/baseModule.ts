import { LogScopes } from "../../ts/enums";
import { AresBase } from "./base";
import { AresClient } from "./client";

/**
 * The foundation of all modules.
 */
export class AresBaseModule extends AresBase {
  /**
   * Defines the scope, used to categorize and filter log entries.
   */
  readonly scope: LogScopes;

  protected constructor(client: AresClient, scope: LogScopes) {
    super(client);

    this.scope = scope;
  }
}
