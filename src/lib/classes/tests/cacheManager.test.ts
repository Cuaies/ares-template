import { Collection } from "discord.js";
import { AresClient } from "..";
import { LogMessagesCodes, LogScopes } from "../../../ts/enums";
import { AresCachedManager } from "../cacheManager";
import { logger } from "../../../modules/logger/logger";

jest.mock("../../../utils/helpers", () => ({
  isProduction: jest.fn(() => false),
}));

class TestAresCachedManager extends AresCachedManager<string, number> {
  setup() {}
}

describe("AresCachedManager", () => {
  let manager: AresCachedManager<string, number>;
  const logMock = jest.spyOn(logger, "log");

  beforeEach(() => {
    manager = new TestAresCachedManager(
      new AresClient({ partials: [], intents: [] }),
      LogScopes.TEST
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("constructor()", () => {
    test("should instantiate with empty collections", () => {
      expect(manager.cache).toBeInstanceOf(Collection);
      expect(manager.cache.size).toBe(0);

      expect(manager.results.cached).toBeInstanceOf(Set);
      expect(manager.results.cached.size).toBe(0);

      expect(manager.results.disabled).toBeInstanceOf(Set);
      expect(manager.results.disabled.size).toBe(0);

      expect(manager.results.uncached).toBeInstanceOf(Set);
      expect(manager.results.uncached.size).toBe(0);
    });
  });

  describe("add()", () => {
    test("should add a valid entry", () => {
      const key = "key";
      const value = 123;

      manager.add(key, value);

      expect(manager.cache.get(key)).toBe(value);
      expect(manager.cache.size).toBe(1);

      expect(manager.results.cached).toContain(key);
    });

    test("should not add a duplicated entry", () => {
      const key = "key";
      const value = 123;

      manager.add(key, value);
      manager.add(key, value + 1);

      expect(manager.cache.get(key)).toBe(value);
      expect(manager.cache.size).toBe(1);

      expect(manager.results.cached).toContain(key);
      expect(manager.results.uncached).toContain(key);

      expect(logMock).toHaveBeenCalledWith(
        manager.scope,
        LogMessagesCodes.CacheManagerDuplicatedEntry,
        key
      );
    });
  });

  describe("delete()", () => {
    test.todo("should delete the entry");
  });
});
