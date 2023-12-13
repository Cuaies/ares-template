import { AresClient } from "../../../../lib/classes";
import { LogMessagesCodes, LogScopes } from "../../../../ts/enums";
import { logger } from "../../../logger/module";
import AresEventHandler from "../../handler";
import { AresEventsManager } from "../../manager";

jest.mock("../../../../utils/helpers", () => ({
  isProduction: jest.fn(() => true),
  getDirContent: jest.fn(() => {
    return {
      handlers: {
        validDir: true,
        files: [],
      },
    };
  }),
}));

describe("AresEventsManager", () => {
  let client: AresClient;
  let manager: AresEventsManager;
  const logMock = jest.spyOn(logger, "log");

  // TODO: fix typings
  const VALID_HANDLER = new AresEventHandler("debug", false, false, (_) => {
    return;
  }) as AresEventHandler;

  const VALID_DISABLED_HANDLER = new AresEventHandler(
    "debug",
    false,
    true,
    (_) => {
      return;
    }
  ) as AresEventHandler;

  const INVALID_HANDLER = { name: "invalid" } as unknown as AresEventHandler;

  beforeEach(() => {
    client = new AresClient({ intents: [] });
    manager = new AresEventsManager(client);
  });

  test("should add listeners", async () => {
    manager.add(VALID_HANDLER.name, VALID_HANDLER);
    await manager.init({ loader: { dirPath: "handlers/" } });

    expect(client.listenerCount(VALID_HANDLER.name)).toBe(1);
  });

  test("should not add listeners to disabled handlers in prod", async () => {
    manager.add(VALID_DISABLED_HANDLER.name, VALID_DISABLED_HANDLER);
    await manager.init({ loader: { dirPath: "handlers/" } });

    expect(client.listenerCount(VALID_DISABLED_HANDLER.name)).toBe(0);
  });

  describe("add()", () => {
    test("should cache valid event handlers", () => {
      manager.add(VALID_HANDLER.name, VALID_HANDLER);

      expect(manager.cache.size).toBe(1);
      expect(manager.cache.get(VALID_HANDLER.name)).toBe(VALID_HANDLER);
    });

    test("should not cache invalid event handlers", () => {
      manager.add(INVALID_HANDLER.name, INVALID_HANDLER);

      expect(manager.cache.size).toBe(0);
      expect(logMock).toBeCalledWith(
        LogScopes.EventsManager,
        LogMessagesCodes.CacheManagerInvalidEntry,
        INVALID_HANDLER.name
      );
    });
  });
});
