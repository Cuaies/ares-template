import { Events } from "discord.js";
import AresEventHandler from "../handler";
import { logger } from "../../logger/logger";

export default new AresEventHandler(Events.Error, false, true, (err) => {
  logger.log(err);
});
