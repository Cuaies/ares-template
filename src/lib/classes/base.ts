import { isProduction } from "../../utils/helpers";

/**
 * The foundation of all classes.
 */
export class AresBase {
  /**
   * Defines the state of the process, whether it's running in production mode or not.
   */
  readonly isProduction: boolean = isProduction();

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected constructor() {}
}
