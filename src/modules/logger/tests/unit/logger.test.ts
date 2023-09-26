import { AresError } from "../../../../lib/classes/error";
import { LogEntryFormatter } from "../../formatter";
import { AresLogger } from "../../logger";
import { logErrorMessages, logMessages } from "../../messages";
import {
  LogErrorMessagesCodes,
  LogMessagesCodes,
  LogScopes,
} from "../../../../ts/enums";

describe("AresLogger", () => {
  let logger: AresLogger;

  beforeAll(() => {
    logger = new AresLogger();
  });

  describe("initialization", () => {
    test("should properly initialize", () => {
      expect(logger).toBeInstanceOf(AresLogger);
    });

    test("should properly initialize in production", () => {
      process.env.NODE_ENV = "production";
      const loggerProd = new AresLogger();
      expect(loggerProd.production).toBe(true);
      expect(loggerProd.instance.level).toBe("info");
    });

    test("should properly initialize in development", () => {
      expect(logger.production).toBe(false);
      expect(logger.instance.level).toBe("silly");
    });
  });

  describe("log()", () => {
    test("should log a message based on the provided scope and code", () => {
      const spy = jest.spyOn(logger, "log");
      logger.log(LogScopes.TEST, LogMessagesCodes.TEST);

      expect(spy).toHaveBeenCalledWith(LogScopes.TEST, LogMessagesCodes.TEST);
      expect(spy).toReturnWith(logger.instance);
    });

    test("should log generic errors", () => {
      const spy = jest.spyOn(logger, "log");
      const err = new Error("test");
      logger.log(err);

      expect(spy).toHaveBeenCalledWith(err);
      expect(spy).toReturnWith(logger.instance);
    });

    test("should log custom errors", () => {
      const spy = jest.spyOn(logger, "log");
      const err = new AresError(null, LogErrorMessagesCodes.TEST);
      logger.log(err);

      expect(spy).toHaveBeenCalledWith(err);
      expect(spy).toReturnWith(logger.instance);
    });
  });

  describe("LogEntryFormatter", () => {
    describe("errors", () => {
      test("should properly format entries w/o scope", () => {
        const entry = LogEntryFormatter.prepareEntry(
          null,
          LogErrorMessagesCodes.TEST
        );
        const desiredEntry = {
          level: "error",
          message: `[${
            LogErrorMessagesCodes[LogErrorMessagesCodes.TEST]
          }] ${logErrorMessages[LogErrorMessagesCodes.TEST]()}`,
        };

        expect(entry).toEqual(desiredEntry);
      });

      test("should properly format entries with scope", () => {
        const entry = LogEntryFormatter.prepareEntry(
          LogScopes.TEST,
          LogErrorMessagesCodes.TEST
        );
        const desiredEntry = {
          level: "error",
          message: `[${LogScopes[LogScopes.TEST]}:${
            LogErrorMessagesCodes[LogErrorMessagesCodes.TEST]
          }] ${logErrorMessages[LogErrorMessagesCodes.TEST]()}`,
        };

        expect(entry).toEqual(desiredEntry);
      });
    });

    describe("messages", () => {
      test("should properly format entries w/o scope", () => {
        const entry = LogEntryFormatter.prepareEntry(
          null,
          LogMessagesCodes.TEST
        );
        const desiredEntry = logMessages[LogMessagesCodes.TEST]();

        expect(entry).toEqual(desiredEntry);
      });

      test("should properly format entries with scope", () => {
        const entry = LogEntryFormatter.prepareEntry(
          LogScopes.TEST,
          LogMessagesCodes.TEST
        );
        const rawEntry = logMessages[LogMessagesCodes.TEST]();
        const desiredEntry = {
          level: rawEntry.level,
          message: `[${LogScopes[LogScopes.TEST]}] ${rawEntry.message}`,
        };

        expect(entry).toEqual(desiredEntry);
      });
    });
  });
});
