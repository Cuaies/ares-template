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

  EventsManagerDuplicatedHandler,
  EventsManagerInvalidHandler,
  EventsManagerListeningForEvent,
  EventsManagerCachedEventsResult,
  EventsManagerUncachedEventsResult,

  CommandsManagerCachedCommandsResult,
  CommandsManagerCachesCommandsList,
  CommandsManagerUncachedCommandsList,
  CommandsManagerInvalidCommand,
  CommandsManagerDuplicatedCommand,

  FileIteration,
  StringLogVerbose,
  StringLogDebug,
  StringLogWarn,
  StringLogError,
}
