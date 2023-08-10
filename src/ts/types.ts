import { Collection, Snowflake } from "discord.js";
import AresEventHandler from "../modules/events/handler";

export type ResultsStatus = { success: boolean; ok: "ok" | "non-ok" };
export type EventsCollection = Collection<Snowflake, AresEventHandler>;
export type AresApplicationCommandType = any;
export type CommandCollection = Collection<
  Snowflake,
  AresApplicationCommandType
>;
