import { AresClient } from "../../../../lib/classes";
import { AresCommandsManager } from "../../manager";

jest.mock("../../../../utils/helpers", () => ({
  isProduction: jest.fn(() => false),
}));

describe("AresCommandsManager", () => {
  let client: AresClient;
  let manager: AresCommandsManager;

  beforeEach(() => {
    client = new AresClient({ intents: [] });
    manager = new AresCommandsManager(client);
  });

  describe("add()", () => {
    test.todo("should cache valid command handlers");

    test.todo("should not cache invalid command handlers");
  });
});
