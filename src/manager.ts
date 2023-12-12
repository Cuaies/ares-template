import { ShardingManager } from "discord.js";
import { logger } from "./modules/logger/module";
import { LogMessagesCodes, LogScopes } from "./ts/enums";
import { SHARDING_MANAGER_CLIENT_FILE } from "./lib/constants";
import config from "config";

const token = config.client.token;
const manager = new ShardingManager(SHARDING_MANAGER_CLIENT_FILE, {
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
