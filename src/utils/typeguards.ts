import {
  LogErrorMessagesCodes,
  LogMessagesCodes,
  LogScopes,
} from "../ts/enums";
import { AresApplicationCommandType } from "../ts/types";
import { AresChatInputCommand } from "../modules/commands/chatInputCommand";
import AresEventHandler from "../modules/events/handler";
import { Locale } from "discord.js";

export const isLogScope = (str: unknown): str is LogScopes =>
  Object.values(LogScopes).some((enumValue) => enumValue === str);

export const isLogMessageCode = (str: unknown): str is LogMessagesCodes =>
  Object.values(LogMessagesCodes).some((enumValue) => enumValue === str);

export const isErrorLogMessageCode = (
  str: unknown
): str is LogErrorMessagesCodes =>
  Object.values(LogErrorMessagesCodes).some((enumValue) => enumValue === str);

export const isAresEventHandler = (
  event: unknown
): event is AresEventHandler => {
  if (!event || event.constructor === Array) return false;
  if (event instanceof AresEventHandler) return true;
  return false;
};

export const isAresApplicationCommandType = (
  command: unknown
): command is AresApplicationCommandType => {
  if (!command || command.constructor === Array) return false;
  if (command instanceof AresChatInputCommand) return true;
  return false;
};

export const isLocale = (str: unknown): str is Locale =>
  Object.values(Locale).some((enumValue) => enumValue === str);
