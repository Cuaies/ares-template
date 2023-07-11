import { AresLogger } from "../../modules/logger/logger";
import { LogMessagesCodes } from "../../ts/enums";

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
