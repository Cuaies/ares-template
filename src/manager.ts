import { ShardingManager } from "discord.js";
import { logger } from "./modules/logger/logger";
import { LogMessagesCodes } from "./ts/enums";
import path from "path";
import config from "config";

const token = config.client.token;
const manager = new ShardingManager(path.join(__dirname, "./client.js"), {
  totalShards: "auto",
  token,
});

manager.on("shardCreate", (shard) => {
  logger.log(LogMessagesCodes.ShardingManagerShardCreate, {
    shardId: shard.id,
  });

  shard.on("ready", () => {
    logger.log(LogMessagesCodes.ShardingManagerShardReady, {
      shardId: shard.id,
    });
  });
  shard.on("death", () => {
    logger.log(LogMessagesCodes.ShardingManagerShardDeath, {
      shardId: shard.id,
    });
  });
  shard.on("reconnecting", () => {
    logger.log(LogMessagesCodes.ShardingManagerShardReconnecting, {
      shardId: shard.id,
    });
  });
});

manager
  .spawn()
  .then((shardColl) =>
    logger.log(LogMessagesCodes.ShardingManagerSpawn, {
      shardAmount: shardColl.size,
    })
  )
  .catch((e: Error) => logger.log(e));
