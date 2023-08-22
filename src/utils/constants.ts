import { join } from "path";

/**
 * Represents the *absolute* path to the `src` directory.
 */
export const SRC_PATH = join(__dirname, "..");
/**
 * Represents the *absolute* path to the `modules` directory.
 */
export const MODULES_PATH = join(__dirname, "..", "modules");

/**
 * Represents the name of the directory that is required for the commands manager to work.
 */
export const COMMANDS_MANAGER_REQUIRED_DIR = "commands";
/**
 * Represents the *absolute* path to the required directory.
 */
export const COMMANDS_MANAGER_REQUIRED_PATH = join(
  MODULES_PATH,
  "commands",
  COMMANDS_MANAGER_REQUIRED_DIR
);
