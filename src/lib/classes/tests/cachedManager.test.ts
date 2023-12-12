import { Collection } from "discord.js";
import { AresClient } from "..";
import { LogMessagesCodes, LogScopes } from "../../../ts/enums";
import { AresCachedManager } from "../cacheManager";
import { logger } from "../../../modules/logger/module";

jest.mock("../../../utils/helpers", () => ({
  isProduction: jest.fn(() => false),
}));

class TestAresCachedManager extends AresCachedManager<string, number> {
  setup() {
    return;
  }
}

describe("AresCachedManager", () => {
  let client: AresClient;
  let manager: TestAresCachedManager;
  const logMock = jest.spyOn(logger, "log");

  beforeEach(() => {
    client = new AresClient({ intents: [] });
    manager = new TestAresCachedManager(client, LogScopes.TEST);
  });

  describe("add()", () => {
    test("should add a valid entry", () => {
      const key = "key";
      const value = 123;

      manager.add(key, value);

      expect(manager.cache.get(key)).toBe(value);
      expect(manager.cache.size).toBe(1);
    });

    test("should not add a duplicated entry", () => {
      const key = "key";
      const value = 123;

      manager.add(key, value);
      manager.add(key, value + 1);

      expect(manager.cache.get(key)).toBe(value);
      expect(manager.cache.size).toBe(1);

      expect(logMock).toHaveBeenCalledWith(
        LogScopes.TEST,
        LogMessagesCodes.CacheManagerDuplicatedEntry,
        key
      );
    });
  });

  describe("delete()", () => {
    test.todo("should delete the entry");
  });
});
