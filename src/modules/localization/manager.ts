import { AresBaseManager, AresClient, AresError } from "../../lib/classes";
import { LogErrorMessagesCodes, LogScopes } from "../../ts/enums";
import { AresManagerOptions } from "../../ts/types";

export class AresLocalizationsManager extends AresBaseManager {
  constructor(client: AresClient) {
    super(client, LogScopes.LocalizationsManager);
  }

  /**
   * @override
   */
  protected async setup(opts: AresManagerOptions) {
    throw new AresError(
      this.scope,
      LogErrorMessagesCodes.MethodNotImplemented,
      this.setup.name
    );
  }
}
