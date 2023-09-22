import { AresChatInputCommandBuilder } from "../../modules/commands/chatInputCommand";
import { AresContextMenuCommandBuilder } from "../../modules/commands/contextMenuCommand";
import {
  Awaitable,
  CommandInteraction,
  ContextMenuCommandInteraction,
} from "discord.js";

export interface AresApplicationCommandInterface<
  Interaction extends ContextMenuCommandInteraction | CommandInteraction
> {
  /**
   * Defines the data of the application command.
   */
  readonly data: AresChatInputCommandBuilder | AresContextMenuCommandBuilder;

  /**
   * Command function meant to execute once an appropriate interaction is received.
   */
  readonly execute: (interaction: Interaction) => Awaitable<void>;
}
