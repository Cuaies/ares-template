import { AresBaseResults } from "../../lib/classes/baseResults";
import { AresError } from "../../lib/classes/error";
import { LogErrorMessagesCodes, LogScopes } from "../../ts/enums";
import { logger } from "../logger/logger";

export default class AresLocalizationsManagerResults extends AresBaseResults<any> {
  constructor(scope: LogScopes) {
    super(scope);
  }

  displayResults() {
    // TODO: implement
    logger.log(
      new AresError(
        this.scope,
        LogErrorMessagesCodes.MethodNotImplemented,
        "displayResults"
      )
    );
    return;
  }
}
