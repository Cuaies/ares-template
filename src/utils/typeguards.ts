import {
  LogErrorMessagesCodes,
  LogMessagesCodes,
  LogScopes,
} from "../ts/enums";
import { AresChatInputCommand } from "../modules/commands/structures/handlers";
import { AresApplicationCommand } from "../ts/types";
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
): command is AresApplicationCommand => {
  if (!command || command.constructor === Array) return false;
  if (!(command instanceof AresChatInputCommand)) return false;
  return true;
};

export const isLocale = (str: unknown): str is Locale =>
  Object.values(Locale).some((enumValue) => enumValue === str);
