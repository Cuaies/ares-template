import { isProduction } from "../../utils/helpers";

/**
 * Represents the base class.
 *
 * Provides common functionality and properties for classes.
 */
export class AresBase {
  /**
   * Indicates whether the application is running in production mode.
   *
   * @returns `true` if the application is running in production mode; otherwise, `false`.
   */
  public get isProduction(): boolean {
    return isProduction();
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected constructor() {}
}
