import { AresBaseManager } from "../../lib/classes/baseManager";
import { AresClient } from "../../lib/classes/client";
import { AresError } from "../../lib/classes/error";
import { LogErrorMessagesCodes, LogScopes } from "../../ts/enums";
import { LocalizationsCollection } from "../../ts/types";
import { logger } from "../logger/logger";
import AresLocalizationsManagerResults from "./results";

export class AresLocalizationsManager extends AresBaseManager {
  readonly results = new AresLocalizationsManagerResults(this.scope);
  declare readonly cache: LocalizationsCollection;

  constructor(client: AresClient) {
    super(client, LogScopes.LocalizationsManager);
  }

  async init(): Promise<void> {
    // TODO: implement
    logger.log(
      new AresError(
        this.scope,
        LogErrorMessagesCodes.MethodNotImplemented,
        "init"
      )
    );
    return;
  }
}
