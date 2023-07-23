import { AresClient } from "./lib/classes/client";
import { logger } from "./modules/logger/logger";
import config from "config";

const client = new AresClient({
  partials: config.client.partials,
  intents: config.client.intents,
});

(async () => {
  await client
    .init(config.client.token as unknown as string)
    .catch((e: Error) => logger.log(e));
})();