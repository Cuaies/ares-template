import { LogScopes } from "../../ts/enums";
import { AresBaseModule } from "./baseModule";
import { AresBaseResults } from "./baseResults";
import { AresClient } from "./client";

/**
 * The foundation of all managers.
 */
export abstract class AresBaseManager extends AresBaseModule {
  /**
   * Manager's results class.
   */
  abstract readonly results: InstanceType<typeof AresBaseResults>;

  protected constructor(client: AresClient, scope: LogScopes) {
    super(client, scope);
  }

  /**
   * Initializes the manager, loading the data and getting it in the ready state.
   */
  abstract init(): Promise<void>;
}
