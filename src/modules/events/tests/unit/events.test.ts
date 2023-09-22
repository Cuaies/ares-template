import { ClientEvents, Events } from "discord.js";
import { AresClient } from "../../../../lib/classes/client";
import { AresError } from "../../../../lib/classes/error";
import { EVENTS_MANAGER_REQUIRED_DIR } from "../../../../lib/constants";
import * as helpers from "../../../../utils/helpers";
import AresEventHandler from "../../handler";
import { AresEventsManager } from "../../manager";
import AresEventsManagerResults from "../../results";
import { join } from "path";
import { logger } from "../../../logger/logger";

let manager: AresEventsManager;
const path = join(__dirname, "mocks", EVENTS_MANAGER_REQUIRED_DIR);

beforeEach(() => {
  const client = new AresClient({ intents: [] });
  manager = new AresEventsManager(client);
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("AresEventsManager", () => {
  describe("initialization", () => {
    test("should properly initialize", () => {
      expect(manager).toBeInstanceOf(AresEventsManager);
    });

    test("should properly initialize the results property", () => {
      expect(manager.results).toBeInstanceOf(AresEventsManagerResults);
    });

    describe("init()", () => {
      test("should load the event handlers", async () => {
        const mockLoad = jest.spyOn(manager, "load");
        await manager.init();
        expect(mockLoad).toHaveBeenCalledTimes(1);
      });

      test("should register the event handlers", async () => {
        const mockRegister = jest.spyOn(manager, "registerEventHandlers");
        await manager.init();
        expect(mockRegister).toHaveBeenCalledTimes(1);
      });

      test("should display the results", async () => {
        const mockDisplay = jest.spyOn(manager.results, "displayResults");
        await manager.init();
        expect(mockDisplay).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe("caching", () => {
    describe("load()", () => {
      test("should properly load the handler files", async () => {
        await expect(manager.load(path)).resolves.toBeUndefined();
        expect(manager.cache.size).toBe(2);
      });

      test("should throw if the provided path is invalid", async () => {
        const mockGetDirContent = jest.spyOn(helpers, "getDirContent");
        mockGetDirContent.mockResolvedValueOnce({
          [EVENTS_MANAGER_REQUIRED_DIR]: {
            validDir: false,
            baseDirPath: path,
            files: [],
            subDirs: {},
          },
        });
        await expect(manager.load(path)).rejects.toThrowError(AresError);
      });
    });
  });

  describe("registering", () => {
    describe("registerEventHandlers()", () => {
      test("should be able to properly register the event handlers", async () => {
        await manager.load(path);
        await expect(manager.registerEventHandlers()).resolves.toBeUndefined();

        expect(manager.client.eventNames()).toEqual(
          expect.arrayContaining(["ready", "warn"])
        );
      });

      test("should register the handlers based on their state", async () => {
        process.env.NODE_ENV = "production";
        manager = new AresEventsManager(new AresClient({ intents: [] }));

        await manager.load(path);
        await manager.registerEventHandlers();

        expect(manager.client.eventNames()).not.toContain("warn");
        process.env.NODE_ENV = "test";
      });

      test("should run the handler only as many times as configured", async () => {
        const mockOnceHandler = jest.fn();
        const mockOnHandler = jest.fn();

        const onceEventName = Events.ClientReady;
        const onceAresEventHandler = new AresEventHandler(
          onceEventName,
          true,
          false,
          mockOnceHandler
        );
        // TODO: fix type
        manager.cache.set(
          onceEventName,
          onceAresEventHandler as AresEventHandler
        );

        const onEventName = Events.Debug;
        const onAresEventHandler = new AresEventHandler(
          onceEventName,
          false,
          false,
          mockOnHandler
        );
        // TODO: fix type
        manager.cache.set(onEventName, onAresEventHandler as AresEventHandler);

        await manager.registerEventHandlers();

        const emitEvent = (eventName: keyof ClientEvents, emitNumber = 2) => {
          for (let i = 0; i < emitNumber; i++) {
            manager.client.emit(eventName);
          }
        };

        emitEvent(onceEventName);
        emitEvent(onEventName);

        expect(mockOnceHandler).toHaveBeenCalledTimes(1);
        expect(mockOnHandler).toHaveBeenCalledTimes(2);
      });

      test("should throw if any error occurs while registering", async () => {
        const logMock = jest.spyOn(logger, "log");
        manager.client.once = jest.fn(() => {
          throw new Error("An error occurred");
        });

        const onceEventName = Events.ClientReady;
        const onceAresEventHandler = new AresEventHandler(
          onceEventName,
          true,
          false,
          jest.fn()
        );
        // TODO: fix type
        manager.cache.set(
          onceEventName,
          onceAresEventHandler as AresEventHandler
        );

        await manager.registerEventHandlers();
        expect(logMock).toHaveBeenCalled();
      });
    });
  });
});
