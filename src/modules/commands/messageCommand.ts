import {
  ApplicationCommandType,
  Awaitable,
  ContextMenuCommandInteraction,
} from "discord.js";
import {
  AresContextMenuCommand,
  AresContextMenuCommandBuilder,
} from "./contextMenuCommand";

export class AresMessageCommand extends AresContextMenuCommand {
  constructor(
    data: AresContextMenuCommandBuilder,
    execute: (interaction: ContextMenuCommandInteraction) => Awaitable<void>
  ) {
    super(data, execute);
    this.data.setType(ApplicationCommandType.Message);
  }
}
