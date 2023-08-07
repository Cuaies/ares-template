import { transports, createLogger, Logger } from "winston";
import { join } from "path";
import { logFileFormat, consoleFormat } from "./formats";
import { BaseModule } from "../../lib/classes/baseModule";
import { LogMessagesCodes, LogScopes } from "../../ts/enums";
import { logMessages } from "./messages";
import { isLogScope } from "../../utils/typeguards";
import { LogEntryFormatter } from "./formatter";

const { File, Console } = transports;
const LOGS_DIR_PATH = join(__dirname, "../../../logs");

// TODO: Fix errors being improperly logged to the transports.

/**
 * Client logger class that wraps the winston logger.
 */
export class AresLogger extends BaseModule {
  /**
   * Winston logger instance.
   */
  readonly instance: Logger;

  constructor() {
    super();
    this.instance = createLogger({
      level: this._production ? "info" : "silly",
      transports: [
        new File({
          filename: join(LOGS_DIR_PATH, "error.log"),
          level: "error",
          format: logFileFormat,
        }),
        new File({
          filename: join(LOGS_DIR_PATH, "combined.log"),
          format: logFileFormat,
        }),
      ],
      exceptionHandlers: [
        new File({
          filename: join(LOGS_DIR_PATH, "exceptions.json"),
        }),
      ],
    });

    this.instance.add(
      new Console({
        format: consoleFormat,
      })
    );
  }

  public log(error: Error): Logger;
  public log<Code extends LogMessagesCodes>(
    scope: LogScopes,
    code: Code,
    ...args: Parameters<(typeof logMessages)[Code]>
  ): Logger;
  public log<Code extends LogMessagesCodes>(
    scopeOrError: LogScopes | Error,
    code?: Code,
    ...args: Parameters<(typeof logMessages)[Code]>
  ): Logger {
    if (scopeOrError instanceof Error) {
      return this.instance.error(scopeOrError);
    }

    if (isLogScope(scopeOrError) && code) {
      return this.instance.log(
        LogEntryFormatter.prepareEntry<LogMessagesCodes>(
          scopeOrError,
          code,
          ...args
        )
      );
    }

    return this.instance;
  }
}

export const logger = new AresLogger();
