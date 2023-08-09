import AresEventHandler from "../handler";
import { Events } from "discord.js";
import { logger } from "../../logger/logger";
import { LogMessagesCodes, LogScopes } from "../../../ts/enums";

export default new AresEventHandler(
  Events.ClientReady,
  true,
  true,
  async (client) => {
    logger.log(
      LogScopes.Client,
      LogMessagesCodes.ClientReady,
      client.shard!.ids.toString(),
      client.user.username
    );

    if (process.env.NODE_ENV != "production") {
      client.user.setStatus("dnd");
    }
  }
);
