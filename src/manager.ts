import { ShardingManager } from "discord.js";
import { logger } from "./modules/logger/logger";
import { LogMessagesCodes, LogScopes } from "./ts/enums";
import path from "path";
import config from "config";

const token = config.client.token;
const manager = new ShardingManager(path.join(__dirname, "./client.js"), {
  totalShards: "auto",
  token,
});

manager.on("shardCreate", (shard) => {
  logger.log(
    LogScopes.ShardingManager,
    LogMessagesCodes.ShardingManagerShardCreate,
    shard.id
  );

  shard.on("ready", () => {
    logger.log(
      LogScopes.ShardingManager,
      LogMessagesCodes.ShardingManagerShardReady,
      shard.id
    );
  });
  shard.on("death", () => {
    logger.log(
      LogScopes.ShardingManager,
      LogMessagesCodes.ShardingManagerShardDeath,
      shard.id
    );
  });
  shard.on("reconnecting", () => {
    logger.log(
      LogScopes.ShardingManager,
      LogMessagesCodes.ShardingManagerShardReconnecting,
      shard.id
    );
  });
});

manager
  .spawn()
  .then((shardColl) =>
    logger.log(
      LogScopes.ShardingManager,
      LogMessagesCodes.ShardingManagerSuccess,
      shardColl.size
    )
  )
  .catch((e: Error) => logger.log(e));
