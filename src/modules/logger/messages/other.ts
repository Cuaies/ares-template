import { LogEntry } from "winston";
import { LogMessagesCodes } from "../../../ts/enums";
import { ResultsStatus } from "../../../ts/types";

const {
  TEST,
  TESTARGS,

  StringLogVerbose,
  StringLogDebug,
  StringLogWarn,
  StringLogError,

  ManagerDisplayResults,

  CacheManagerInvalidEntry,
  CacheManagerDuplicatedEntry,
  CacheManagerAddedEntry,
  CacheManagerDisplayResults,

  ShardingManagerShardCreate,
  ShardingManagerShardReady,
  ShardingManagerShardDeath,
  ShardingManagerShardReconnecting,
  ShardingManagerSuccess,

  EventsManagerListeningForEvent,

  ClientAttemptingLogin,
  ClientReady,
} = LogMessagesCodes;

export const logMessages = {
  [TEST]: () => {
    return {
      level: "silly",
      message: `Test message`,
    };
  },
  [TESTARGS]: (strArg: string) => {
    return {
      level: "silly",
      message: `Test message with args [strArg=${strArg}]`,
    };
  },

  [StringLogVerbose]: (message: string) => {
    return {
      level: "verbose",
      message,
    };
  },
  [StringLogDebug]: (message: string) => {
    return {
      level: "debug",
      message,
    };
  },
  [StringLogWarn]: (message: string) => {
    return {
      level: "warn",
      message,
    };
  },
  [StringLogError]: (message: string) => {
    return {
      level: "error",
      message,
    };
  },

  [ManagerDisplayResults]: (status: ResultsStatus) => {
    return {
      level: status.success ? "info" : "warn",
      message: `Manager initialization finished [ok=${status.ok}]`,
    };
  },

  [CacheManagerInvalidEntry]: (id: string) => {
    return {
      level: "warn",
      message: `Entry does not pass validation requirements [id=${id}]`,
    };
  },
  [CacheManagerDuplicatedEntry]: (entry: string) => {
    return {
      level: "warn",
      message: `Duplicated entry [entry=${entry}]`,
    };
  },
  [CacheManagerAddedEntry]: (id: string) => {
    return {
      level: "verbose",
      message: `Added entry to the cache [id=${id}]`,
    };
  },
  [CacheManagerDisplayResults]: (
    status: ResultsStatus,
    cached,
    disabled,
    uncached
  ) => {
    return {
      level: status.success ? "info" : "warn",
      message: `Manager initialization finished [${cached.size} cached] [${disabled.size} current prototype(s)] [${uncached.size} invalid] [ok=${status.ok}]`,
    };
  },

  [ShardingManagerShardCreate]: (id: number) => {
    return {
      level: "info",
      message: `Shard has launched [shard=${id}]`,
    };
  },
  [ShardingManagerShardReady]: (id: number) => {
    return {
      level: "info",
      message: `Shard is ready [shard=${id}]`,
    };
  },
  [ShardingManagerShardDeath]: (id: number) => {
    return {
      level: "info",
      message: `Shard has died [shard=${id}]`,
    };
  },
  [ShardingManagerShardReconnecting]: (id: number) => {
    return {
      level: "info",
      message: `Shard is reconnecting [shard=${id}]`,
    };
  },
  [ShardingManagerSuccess]: (amount: number) => {
    return {
      level: "info",
      message: `Manager successfully spawned shards [amount=${amount}]`,
    };
  },

  [EventsManagerListeningForEvent]: (event: string) => {
    return {
      level: "verbose",
      message: `Listening for event [event=${event}]`,
    };
  },

  [ClientAttemptingLogin]: (shard: string) => {
    return {
      level: "verbose",
      message: `Attempting login ${shard ? `[shard=${shard}]` : ""}`,
    };
  },
  [ClientReady]: (shard: string, username: string) => {
    return {
      level: "info",
      message: `Login successful [shard=${shard}] [username=${username}]`,
    };
  },
} satisfies Record<LogMessagesCodes, (...args: any[]) => LogEntry>;
