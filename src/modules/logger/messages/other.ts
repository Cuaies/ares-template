import { LogEntry } from "winston";
import { LogMessagesCodes } from "../../../ts/enums";
import { ResultsStatus } from "../../../ts/types";

const {
  TEST,
  TESTARGS,

  ShardingManagerShardCreate,
  ShardingManagerShardReady,
  ShardingManagerShardDeath,
  ShardingManagerShardReconnecting,
  ShardingManagerSuccess,

  ClientAttemptingLogin,
  ClientReady,

  EventsManagerCachedEventsResult,
  EventsManagerUncachedEventsResult,
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
  [ClientAttemptingLogin]: (shard: string): LogEntry => {
    return {
      level: "verbose",
      message: `Attempting login [shard=${shard}]`,
    };
  },
  [ClientReady]: (shard: string, username: string): LogEntry => {
    return {
      level: "info",
      message: `Login successful [shard=${shard}] [username=${username}]`,
    };
  },
  [EventsManagerCachedEventsResult]: (
    loadedCount: number,
    prototypesCount: number,
    status: ResultsStatus["ok"]
  ): LogEntry => {
    return {
      level: "verbose",
      message: `Loaded ${loadedCount} handlers [${prototypesCount} current prototype(s)] [${status}]`,
    };
  },
  [EventsManagerUncachedEventsResult]: (uncachedCount: string[]) => {
    return {
      level: "warn",
      message: `Invalid handlers list: ${uncachedCount}`,
    };
  },
};
