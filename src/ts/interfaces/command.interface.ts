import {
  Awaitable,
  CommandInteraction,
  ContextMenuCommandInteraction,
} from "discord.js";
import { AresApplicationCommandBuilder } from "../types";

export interface AresApplicationCommandInterface<
  Interaction extends ContextMenuCommandInteraction | CommandInteraction
> {
  /**
   * Defines the data of the application command.
   */
  readonly data: AresApplicationCommandBuilder;

  /**
   * Defines the function to execute when the application command is called.
   */
  readonly execute: (interaction: Interaction) => Awaitable<void>;
}
