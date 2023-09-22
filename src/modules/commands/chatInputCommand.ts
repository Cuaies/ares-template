import { Mixin } from "ts-mixer";
import { AresBaseCommandData } from "./baseCommand";
import { AresApplicationCommandInterface } from "../../ts/interfaces/command.interface";
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
export class AresChatInputCommand
  implements AresApplicationCommandInterface<CommandInteraction>
{
  readonly data;
  readonly execute;

  constructor(
    data: AresChatInputCommandBuilder,
    execute: (interaction: CommandInteraction) => Awaitable<void>
  ) {
    this.data = data;
    this.execute = execute;
  }
}
