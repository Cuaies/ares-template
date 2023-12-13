import { ApplicationCommandType, SlashCommandBuilder } from "discord.js";
import { AresBaseApplicationCommandData } from "../base";
import { Mixin } from "ts-mixer";

export class AresChatInputCommandBuilder extends Mixin(
  AresBaseApplicationCommandData,
  SlashCommandBuilder
) {
  type = ApplicationCommandType.ChatInput;
}
