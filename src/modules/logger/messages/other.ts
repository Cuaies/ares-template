import { LogEntry } from "winston";
import { LogMessagesCodes } from "../../../ts/enums";

const {
  TEST,
  TESTARGS,

  ShardingManagerShardCreate,
  ShardingManagerShardReady,
  ShardingManagerShardDeath,
  ShardingManagerShardReconnecting,
  ShardingManagerSuccess,

  ClientAttemptedLogin,
} = LogMessagesCodes;

export const logMessages = {
  [TEST]: (): LogEntry => {
    return {
      level: "silly",
      message: `Test message`,
    };
  },
  [TESTARGS]: (strArg: string): LogEntry => {
    return {
      level: "silly",
      message: `Test message with args [strArg=${strArg}]`,
    };
  },
  [ShardingManagerShardCreate]: (id: number): LogEntry => {
    return {
      level: "info",
      message: `Shard has launched [shard=${id}]`,
    };
  },
  [ShardingManagerShardReady]: (id: number): LogEntry => {
    return {
      level: "info",
      message: `Shard is ready [shard=${id}]`,
    };
  },
  [ShardingManagerShardDeath]: (id: number): LogEntry => {
    return {
      level: "info",
      message: `Shard has died [shard=${id}]`,
    };
  },
  [ShardingManagerShardReconnecting]: (id: number): LogEntry => {
    return {
      level: "info",
      message: `Shard is reconnecting [shard=${id}]`,
    };
  },
  [ShardingManagerSuccess]: (amount: number): LogEntry => {
    return {
      level: "info",
      message: `Manager successfully spawned shards [amount=${amount}]`,
    };
  },
  [ClientAttemptedLogin]: (): LogEntry => {
    return {
      level: "verbose",
      message: `Attempting client login...`,
    };
  },
};
