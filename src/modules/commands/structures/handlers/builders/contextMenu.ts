import { ContextMenuCommandBuilder } from "discord.js";
import { AresBaseApplicationCommandData } from "../base";
import { Mixin } from "ts-mixer";

export class AresContextMenuCommandBuilder extends Mixin(
  AresBaseApplicationCommandData,
  ContextMenuCommandBuilder
) {}
