import { LogScopes } from "../../ts/enums";
import { AresBaseModule } from "./baseModule";
import { AresResults } from "./baseResults";
import { AresClient } from "./client";
import { AresManagerOptions } from "../../ts/types";
import { Awaitable } from "discord.js";
import { types } from "util";

/**
 * Abstract base class for managers.
 */
export abstract class AresBaseManager extends AresBaseModule {
  /**
   * Results instance associated with the manager.
   * @virtual
   */
  protected readonly results: InstanceType<typeof AresResults> =
    new AresResults(this.scope);

  protected constructor(client: AresClient, scope: LogScopes) {
    super(client, scope);
  }

  /**
   * Sets up the manager by supplying essential data and performing preparatory tasks.
   *
   * @remarks
   * Orchestrates the initialization process, encompassing the setup of
   * foundational data and execution of preparatory tasks. This ensures that the manager is equipped to
   * handle interactions and various operations effectively.
   *
   * @virtual
   */
  protected abstract setup(opts: AresManagerOptions): Awaitable<void>;

  /**
   * Initializes the manager.
   *
   * @remarks
   * This method should be called after creating an instance of the class to perform any necessary setup or initialization.
   *
   * @sealed
   */
  public async init(opts: AresManagerOptions): Promise<void> {
    if (types.isAsyncFunction(this.setup)) {
      await this.setup(opts);
    } else {
      this.setup(opts);
    }

    this.results.display();
  }
}
