/**
 * Represents the codes for the log messages, other than errors.
 */
export enum LogMessagesCodes {
  TEST = 100,
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
}
