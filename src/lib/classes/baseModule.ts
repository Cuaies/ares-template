/**
 * Base class for all modules.
 */
export class BaseModule {
  /**
   * Boolean indicating whether the app is running in production mode or not.
   */
  readonly _production: boolean;

  constructor() {
    this._production = process.env.NODE_ENV === "production";
  }
}
