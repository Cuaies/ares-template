import { AresClient } from "../../../../lib/classes/client";
import { AresError } from "../../../../lib/classes/error";
import { EVENTS_MANAGER_REQUIRED_DIR } from "../../../../lib/constants";
import * as helpers from "../../../../utils/helpers";
import { AresEventsManager } from "../../manager";
import AresEventsManagerResults from "../../results";
import { join } from "path";

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
    // TODO:
  });
});
