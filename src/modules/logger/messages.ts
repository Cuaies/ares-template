import { LogEntry } from "winston";
import { LogMessagesCodes } from "../../ts/enums";

/**
 * Object containing all the log messages available for the current message codes.
 */
export const logMessagesEntries: {
  [key in LogMessagesCodes]: LogEntry;
} = {};
