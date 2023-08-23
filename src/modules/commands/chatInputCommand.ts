import { Mixin } from "ts-mixer";
import { AresBaseCommandData } from "./baseCommand";
import {
  ApplicationCommandType,
  Awaitable,
  CommandInteraction,
  SlashCommandBuilder,
} from "discord.js";

/**
 * Represents a chat input application command builder.
 */
export class AresChatInputCommandBuilder extends Mixin(
  AresBaseCommandData,
  SlashCommandBuilder
) {
  type = ApplicationCommandType.ChatInput;
}

/**
 * Represents a chat input application command.
 */
export class AresChatInputCommand {
  /**
   * Command data.
   */
  readonly data;

  /**
   * Command function meant to execute once an appropriate interaction is received.
   */
  readonly execute;

  constructor(
    data: AresChatInputCommandBuilder,
    execute: (interaction: CommandInteraction) => Awaitable<void>
  ) {
    this.data = data;
    this.execute = execute;
  }
}
