import { transports, createLogger, Logger, format } from "winston";
import { join } from "path";
import { logFileFormat, consoleFormat } from "./structures/formats";
import { LogMessagesCodes, LogScopes } from "../../ts/enums";
import { logMessages } from "./structures/messages";
import { isLogScope } from "../../utils/typeguards";
import { LogEntryFormatter } from "./structures/";
import { LOGS_DIR_PATH } from "../../lib/constants";
import { AresBase } from "../../lib/classes/base";

const { File, Console } = transports;
const { combine, timestamp, ms, errors, json } = format;

/**
 * Client logger class that wraps the winston logger.
 */
export class AresLogger extends AresBase {
  /**
   * Winston logger instance.
   */
  readonly instance: Logger;

  constructor() {
    super();

    this.instance = createLogger({
      level: this.isProduction ? "info" : "silly",
      silent: process.env.JEST_WORKER_ID !== undefined,
      format: combine(timestamp(), ms(), errors({ stack: true }), json()),
      transports: [
        new File({
          filename: join(LOGS_DIR_PATH, "error.log"),
          level: "error",
          format: logFileFormat,
        }),
        new File({
          filename: join(LOGS_DIR_PATH, "combined.log"),
          format: logFileFormat,
          handleExceptions: true,
          handleRejections: true,
        }),
      ],
      exceptionHandlers: [
        new File({
          filename: join(LOGS_DIR_PATH, "exceptions.log"),
          format: logFileFormat,
        }),
      ],
    });

    this.instance.add(
      new Console({
        format: consoleFormat,
        handleExceptions: true,
        handleRejections: true,
      })
    );
  }

  /**
   * @overload
   *
   * Records a message through the transports.
   * @param scope Scope of the log message.
   * @param code Code of the log message.
   * @param args Arguments to be passed to the log message.
   */
  public log<Code extends LogMessagesCodes>(
    scope: LogScopes,
    code: Code,
    ...args: Parameters<(typeof logMessages)[Code]>
  ): Logger;
  /**
   * @overload
   *
   * Records an error through the transports.
   * @param error Error to log.
   */
  public log(error: Error): Logger;
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
