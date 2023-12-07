import { AresChatInputCommand } from "../modules/commands/chatInputCommand";

export type ResultsStatus = { success: boolean; ok: "ok" | "non-ok" };
export type AresApplicationCommandType = AresChatInputCommand;

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
