import { Collection, Snowflake } from "discord.js";
import AresEventHandler from "../modules/events/handler";

export type ResultsStatus = { success: boolean; ok: "ok" | "non-ok" };
export type EventsCollection = Collection<Snowflake, AresEventHandler>;
