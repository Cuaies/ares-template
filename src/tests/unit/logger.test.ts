import { AresLogger } from "../../modules/logger/logger";
import { LogMessagesCodes } from "../../ts/enums";

describe("AresLogger", () => {
  let logger: AresLogger;

  beforeAll(() => {
    logger = new AresLogger();
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

  describe("initialization", () => {
    test("should properly initialize", () => {
      expect(logger).toBeInstanceOf(AresLogger);
    });

    test("should properly initialize in production", () => {
      process.env.NODE_ENV = "production";
      const loggerProd = new AresLogger();
      expect(loggerProd._production).toBe(true);
      expect(loggerProd.instance.level).toBe("info");
    });

    test("should properly initialize in development", () => {
      expect(logger._production).toBe(false);
      expect(logger.instance.level).toBe("silly");
    });
  });

  describe("log()", () => {
    test("should log message based on the provided code and arguments", () => {
      const code = LogMessagesCodes.TEST;
      const args = { test: "test", test2: 1 };
      const spy = jest.spyOn(logger, "log");

      logger.log(code, args);
      expect(spy).toHaveBeenCalledWith(code, args);
      expect(spy).toReturnWith(logger.instance);
    });

    test("should log an error when an Error object is passed", () => {
      const errorMessage = "Test error message";
      const error = new Error(errorMessage);
      const spy = jest.spyOn(logger, "log");

      logger.log(error);
      expect(spy).toHaveBeenCalledWith(error);
      expect(spy).toReturnWith(logger.instance);
    });
  });
});
