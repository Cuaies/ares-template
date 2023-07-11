import { transports, createLogger, Logger } from "winston";
import { join } from "path";
import { logFileFormat, consoleFormat } from "./formats";
import { BaseModule } from "../../lib/classes/baseModule";
import { LogMessagesCodes } from "../../ts/enums";
import { logMessagesEntries } from "./messages";

const { File, Console } = transports;
const LOGS_DIR_PATH = join(__dirname, "../../../logs");

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
    });

    if (!this._production) {
      this.instance.add(
        new Console({
          format: consoleFormat,
        })
      );
    }
  }

  public log(code: LogMessagesCodes, ...args: any[]): Logger;
  public log(error: Error): Logger;
  public log(messageType: LogMessagesCodes | Error, args?: any[]): Logger {
    if (messageType instanceof Error) {
      return this.instance.error(messageType.message);
    }
    return this.instance.log({ ...logMessagesEntries[messageType], ...args });
  }
}

export const logger = new AresLogger();
