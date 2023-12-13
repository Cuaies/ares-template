import {
  AresChatInputCommandBuilder,
  AresContextMenuCommandBuilder,
} from "../modules/commands/structures/handlers/builders";
import { AresChatInputCommand } from "../modules/commands/structures/handlers";

export type ResultsStatus = { success: boolean; ok: "ok" | "non-ok" };
export type AresApplicationCommand = AresChatInputCommand;
export type AresApplicationCommandBuilder =
  | AresChatInputCommandBuilder
  | AresContextMenuCommandBuilder;

/**
 * Manager options.
 */
export type AresManagerOptions = {
  /**
   * Loader configuration.
   */
  loader: {
    /**
     * The path to the directory containing manager data.
     */
    dirPath: string;
  };
};
