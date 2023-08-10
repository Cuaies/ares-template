import { Events } from "discord.js";
import {
  LogErrorMessagesCodes,
  LogMessagesCodes,
  LogScopes,
} from "../ts/enums";
import { AresApplicationCommandType } from "../ts/types";
import { AresChatInputCommand } from "../modules/commands/chatInputCommand";

export const isLogScope = (str: unknown): str is LogScopes =>
  Object.values(LogScopes).some((enumValue) => enumValue === str);

export const isLogMessageCode = (str: unknown): str is LogMessagesCodes =>
  Object.values(LogMessagesCodes).some((enumValue) => enumValue === str);

export const isErrorLogMessageCode = (
  str: unknown
): str is LogErrorMessagesCodes =>
  Object.values(LogErrorMessagesCodes).some((enumValue) => enumValue === str);

export const isEvents = (str: unknown): str is keyof typeof Events => {
  return Object.values(Events).some((enumValue) => enumValue === str);
};

export const isAresCommand = (
  command: unknown
): command is AresApplicationCommandType => {
  if (!command || command.constructor === Array) return false;
  if (command instanceof AresChatInputCommand) return true;
  return false;
};
