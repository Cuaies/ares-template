import * as c from "config";
import * as DefaultConfig from "../config/default";

type AresConfig = typeof DefaultConfig;

declare module "config" {
  export interface IConfig extends c.IConfig, AresConfig {
    // TODO: *Properly Override `get()` to only accept `AresConfig` keys.
    get<T>(setting: keyof AresConfig): T;
  }
}
