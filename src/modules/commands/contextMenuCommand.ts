import { Mixin } from "ts-mixer";
import { AresBaseCommandData } from "./baseCommand";
import {
  Awaitable,
  ContextMenuCommandBuilder,
  ContextMenuCommandInteraction,
} from "discord.js";
import { AresApplicationCommandInterface } from "../../ts/interfaces/command.interface";

/**
 * Represents a chat input application command builder.
 */
export class AresContextMenuCommandBuilder extends Mixin(
  AresBaseCommandData,
  ContextMenuCommandBuilder
) {}

/**
 * Represents a context menu application command.
 */
export class AresContextMenuCommand
  implements AresApplicationCommandInterface<ContextMenuCommandInteraction>
{
  readonly data;
  readonly execute;

  constructor(
    data: AresContextMenuCommandBuilder,
    execute: (interaction: ContextMenuCommandInteraction) => Awaitable<void>
  ) {
    this.data = data;
    this.execute = execute;
  }
}
