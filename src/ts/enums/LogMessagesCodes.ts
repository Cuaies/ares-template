/**
 * Represents the codes for the log messages, other than errors.
 */
export enum LogMessagesCodes {
  TEST = 100,
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
}
