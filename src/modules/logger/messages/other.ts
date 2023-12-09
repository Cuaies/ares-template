import { LogEntry } from "winston";
import { LogMessagesCodes } from "../../../ts/enums";
import { ResultsStatus } from "../../../ts/types";
import { Locale } from "discord.js";

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

  ManagerListCached,
  ManagerListUncached,
  ManagerDisplayResults,

  CacheManagerDuplicatedEntry,
  CacheManagerDisplayResults,

  EventsManagerInvalidHandler,
  EventsManagerDuplicatedHandler,
  EventsManagerListeningForEvent,
  EventsManagerCachedEventsResult,

  CommandsManagerCachedCommandsResult,
  CommandsManagerInvalidCommand,
  CommandsManagerDuplicatedCommand,

  LocalizationManagerResultsDisplay,

  InvalidLocaleDirName,
  InvalidDir,

  FileIteration,
  StringLogVerbose,
  StringLogDebug,
  StringLogWarn,
  StringLogError,
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
  [EventsManagerDuplicatedHandler]: (handler: string) => {
    return {
      level: "warn",
      message: `Duplicated handler name [handler=${handler}]`,
    };
  },
  [EventsManagerInvalidHandler]: (handler: string) => {
    return {
      level: "warn",
      message: `Handler name does not match allowed values [handler=${handler}]`,
    };
  },
  [EventsManagerListeningForEvent]: (event: string) => {
    return {
      level: "verbose",
      message: `Listening for event [event=${event}]`,
    };
  },
  [EventsManagerCachedEventsResult]: (
    loadedCount: number,
    prototypesCount: number,
    status: ResultsStatus["ok"]
  ) => {
    return {
      level: status === "ok" ? "info" : "error",
      message: `Loaded ${loadedCount} handlers [${prototypesCount} current prototype(s)] [${status}]`,
    };
  },
  [CommandsManagerCachedCommandsResult]: (
    loadedCount: number,
    prototypesCount: number,
    status: ResultsStatus["ok"]
  ) => {
    return {
      level: status === "ok" ? "info" : "error",
      message: `Loaded ${loadedCount} commands [${prototypesCount} current prototype(s)] [${status}]`,
    };
  },
  [CommandsManagerInvalidCommand]: (filePath: string) => {
    return {
      level: "warn",
      message: `Invalid application command [path=${filePath}]`,
    };
  },
  [CommandsManagerDuplicatedCommand]: (command: string, filePath: string) => {
    return {
      level: "warn",
      message: `Duplicated application command [command=${command}] [path=${filePath}]`,
    };
  },
  [LocalizationManagerResultsDisplay]: (
    loadedCount: number,
    status: ResultsStatus["ok"]
  ) => {
    return {
      level: "info",
      message: `Loaded ${loadedCount} locales [${status}]`,
    };
  },
  [InvalidLocaleDirName]: (dirName: string) => {
    return {
      level: "warn",
      message: `Invalid locale directory name [dirName=${dirName}]`,
    };
  },
  [InvalidDir]: (dirName: string) => {
    return {
      level: "warn",
      message: `Invalid directory [dirName=${dirName}]`,
    };
  },
  [ManagerListCached]: (entries: string[]) => {
    return {
      level: "info",
      message: `Cached entries list: ${entries.join(", ")}`,
    };
  },
  [ManagerListUncached]: (entries: string[]) => {
    return {
      level: "warn",
      message: `Invalid entries list: ${entries.join(", ")}`,
    };
  },
  [FileIteration]: (handler: string, file: string) => {
    return {
      level: "debug",
      message: `File iteration [handler=${handler}, file=${file}]`,
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
  [CacheManagerDisplayResults]: (
    status: ResultsStatus,
    cached,
    disabled,
    uncached
  ) => {
    return {
      level: status.success ? "info" : "warn",
      message: `Manager initialization finished [${cached.size} entries] [${disabled.size} current prototype(s)] [ok=${status.ok}]`,
    };
  },
  [CacheManagerDuplicatedEntry]: (entry: string) => {
    return {
      level: "warn",
      message: `Duplicated entry [entry=${entry}]`,
    };
  },
} satisfies Record<LogMessagesCodes, (...args: any[]) => LogEntry>;
