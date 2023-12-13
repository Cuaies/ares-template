import { LogEntry } from "winston";
import {
  LogErrorMessagesCodes,
  LogMessagesCodes,
  LogScopes,
} from "../../../ts/enums";
import {
  isErrorLogMessageCode,
  isLogMessageCode,
  isLogScope,
} from "../../../utils/typeguards";
import { logErrorMessages, logMessages } from "./messages";

/**
 * Contains various methods for formatting log entries.
 */
export class LogEntryFormatter {
  /**
   * Fetches and prepares a log entry.
   */
  static prepareEntry = <Code extends LogMessagesCodes | LogErrorMessagesCodes>(
    scope: LogScopes | null,
    code: Code,
    ...args: Code extends LogMessagesCodes
      ? Parameters<(typeof logMessages)[Code]>
      : Code extends LogErrorMessagesCodes
      ? Parameters<(typeof logErrorMessages)[Code]>
      : never
  ): LogEntry => {
    let logEntry;

    if (isErrorLogMessageCode(code)) {
      logEntry = {
        message: (logErrorMessages[code] as (...args: any) => any)(...args),
        level: "error",
      };
    } else if (isLogMessageCode(code)) {
      logEntry = (logMessages[code] as (...args: any) => any)(...args);
    }

    return Object.assign(logEntry, {
      message: this.appendScope(scope, code, logEntry),
    });
  };

  /**
   * Appends the scope to the message.
   */
  static appendScope(
    scope: LogScopes | null,
    code: LogMessagesCodes | LogErrorMessagesCodes | null,
    logEntry: LogEntry
  ): string {
    const isScope = isLogScope(scope);
    let messageScope: string;

    if (logEntry.level === "error" && isErrorLogMessageCode(code)) {
      messageScope = `[${
        isScope
          ? LogScopes[scope] + ":" + LogErrorMessagesCodes[code]
          : LogErrorMessagesCodes[code]
      }]`;
    } else {
      messageScope = isScope ? `[${LogScopes[scope]}]` : "";
    }

    if (messageScope === "") {
      return logEntry.message;
    }

    return [messageScope, logEntry.message].join(" ");
  }
}
