import { Collection, Snowflake } from "discord.js";
import AresEventHandler from "../modules/events/handler";
import { AresChatInputCommand } from "../modules/commands/chatInputCommand";

export type ResultsStatus = { success: boolean; ok: "ok" | "non-ok" };
export type EventsCollection = Collection<Snowflake, AresEventHandler>;
export type AresApplicationCommandType = AresChatInputCommand;
export type CommandCollection = Collection<
  Snowflake,
  AresApplicationCommandType
>;
