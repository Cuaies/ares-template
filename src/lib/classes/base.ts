/**
 * The foundation of all classes.
 */
export class AresBase {
  /**
   * Defines the state of the process, whether it's running in production mode or not.
   */
  readonly production: boolean = process.env.NODE_ENV === "production";

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected constructor() {}
}
