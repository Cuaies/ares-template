import { Awaitable, CommandInteraction } from "discord.js";
import { AresChatInputCommandBuilder } from "./builders";
import { AresApplicationCommandInterface } from "../../../../ts/interfaces/command.interface";

export class AresChatInputCommand
  implements AresApplicationCommandInterface<CommandInteraction>
{
  constructor(
    readonly data: AresChatInputCommandBuilder,
    readonly execute: (interaction: CommandInteraction) => Awaitable<void>
  ) {}
}
