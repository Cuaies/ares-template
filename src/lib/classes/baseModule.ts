import { LogScopes } from "../../ts/enums";

/**
 * Base class for all modules.
 */
export class AresBaseModule {
  /**
   * Boolean indicating whether the app is running in production mode or not.
   */
  readonly _production = process.env.NODE_ENV === "production";

  /**
   * The scope of the module.
   */
  readonly scope: LogScopes;

  constructor(scope: LogScopes) {
    this.scope = scope;
  }
}
