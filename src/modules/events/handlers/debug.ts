import { Events } from "discord.js";
import AresEventHandler from "../handler";
import { logger } from "../../logger/logger";
import { LogMessagesCodes, LogScopes } from "../../../ts/enums";

export default new AresEventHandler(Events.Debug, false, false, (message) => {
  logger.log(LogScopes.Client, LogMessagesCodes.StringLogDebug, message);
});
