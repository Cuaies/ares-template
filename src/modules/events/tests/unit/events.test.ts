import { ClientEvents } from "discord.js";
import { AresClient } from "../../../../lib/classes";
import { LogMessagesCodes, LogScopes } from "../../../../ts/enums";
import { logger } from "../../../logger/logger";
import AresEventHandler from "../../handler";
import { AresEventsManager } from "../../manager";

jest.mock("../../../../utils/helpers", () => ({
  isProduction: jest.fn(() => false),
}));

describe("AresEventsManager", () => {
  let client: AresClient;
  let manager: AresEventsManager;
  const logMock = jest.spyOn(logger, "log");

  beforeEach(() => {
    client = new AresClient({ intents: [] });
    manager = new AresEventsManager(client);
  });

  test.todo("should add listeners");

  test.todo("should not add listeners to disabled handlers in prod");

  describe("add()", () => {
    test("should cache valid event handlers", () => {
      const handler = new AresEventHandler("debug", false, false, (data) => {});

      // TODO: fix typing
      manager.add(handler.name, handler as AresEventHandler);

      expect(manager.cache.size).toBe(1);
      expect(manager.cache.get(handler.name)).toBe(handler);
    });

    test("should not cache duplicated event handlers", () => {
      const handler = new AresEventHandler("debug", false, false, (data) => {});

      manager.add(handler.name, handler as AresEventHandler);
      manager.add(handler.name, handler as AresEventHandler);

      expect(manager.cache.size).toBe(1);
      expect(logMock).toHaveBeenCalledWith(
        LogScopes.EventsManager,
        LogMessagesCodes.CacheManagerDuplicatedEntry,
        handler.name
      );
    });

    test("should not cache invalid event handlers", () => {
      manager.add("invalidKey" as keyof ClientEvents, {} as AresEventHandler);

      expect(manager.cache.size).toBe(0);
      expect(logMock).toBeCalledWith(
        LogScopes.EventsManager,
        LogMessagesCodes.EventsManagerInvalidHandler,
        expect.anything()
      );
    });
  });

  describe("delete()", () => {
    test.todo("should delete a cached event handler");
  });

  // it("should register event handlers with the client", async () => {
  // const handler: AresEventHandler = {
  //   name: "testEvent",
  //   execute: jest.fn(),
  //   isDisabled: false,
  //   isOnce: false,
  // };
  // manager.add("testEvent", handler);
  // await manager.setup({ loader: { dirPath: "/path/to/handlers" } });
  // expect(client.on).toHaveBeenCalledWith("testEvent", expect.any(Function));
  // });

  // it("should log an error if an invalid event handler is added", () => {
  //   const invalidHandler: any = {
  //     name: "invalidEvent",
  //     execute: jest.fn(),
  //     isDisabled: false,
  //     isOnce: false,
  //   };

  //   manager.add("invalidEvent", invalidHandler);

  //   expect(logger.log).toHaveBeenCalledWith(
  //     LogScopes.EventsManager,
  //     LogMessagesCodes.EventsManagerInvalidHandler,
  //     "invalidEvent"
  //   );
  // });

  // Add more test cases as needed
});
