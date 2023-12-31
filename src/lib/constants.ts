import { join } from "path";
import { isProduction } from "../utils/helpers";

/**
 * Represents the *absolute* path to the root directory.
 */
export const ROOT_PATH = join(__dirname, "..", "..");
/**
 * Represents the *absolute* path to the `src` directory.
 */
export const SRC_PATH = join(__dirname, "..");
/**
 * Represents the *absolute* path to the `modules` directory.
 */
export const MODULES_PATH = join(__dirname, "..", "modules");

/**
 * Represents the *absolute* path to `events/handlers/`,
 * the directory where the event handlers are stored.
 */
export const EVENT_HANDLERS_PATH = join(MODULES_PATH, "events", "handlers");

/**
 * Represents the *absolute* path to `commands/handlers/`,
 * the directory where the command handlers are stored.
 */
export const COMMAND_HANDLERS_PATH = join(MODULES_PATH, "commands", "handlers");

/**
 * Represents the *absolute* path to `localization/handlers/`,
 * the directory where the localization handlers are stored.
 */
export const LOCALIZATION_HANDLERS_PATH = join(
  MODULES_PATH,
  "localization",
  "handlers"
);

export const LOGS_DIR_PATH = join(ROOT_PATH, "logs");

/**
 * Represents an absolute path.
 *
 * This path is used by the sharding manager to spawn client shards.
 */
export const SHARDING_MANAGER_CLIENT_FILE = join(
  SRC_PATH,
  `client.${isProduction() ? "js" : "js"}`
);
