import { transports, createLogger, Logger } from "winston";
import { join } from "path";
import { logFileFormat, consoleFormat } from "./formats";
import { BaseModule } from "../../lib/classes/baseModule";

const { File, Console } = transports;
const LOGS_DIR_PATH = join(__dirname, "../../../logs");

/**
 * Client logger class that wraps the winston logger.
 */
class AresLogger extends BaseModule {
  /**
   * Winston logger instance.
   */
  readonly logger: Logger;

  constructor() {
    super();
    this.logger = createLogger({
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
      this.logger.add(
        new Console({
          format: consoleFormat,
        })
      );
    }
  }
}

export const logger = new AresLogger();
