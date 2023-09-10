import {
  ApplicationCommandType,
  Awaitable,
  ContextMenuCommandInteraction,
} from "discord.js";
import {
  AresContextMenuCommand,
  AresContextMenuCommandBuilder,
} from "./contextMenuCommand";

export class AresUserCommand extends AresContextMenuCommand {
  constructor(
    data: AresContextMenuCommandBuilder,
    execute: (interaction: ContextMenuCommandInteraction) => Awaitable<void>
  ) {
    super(data, execute);
    this.data.setType(ApplicationCommandType.User);
  }
}
