import { LogEntryFormatter } from "../../modules/logger/formatter";
import { logErrorMessages } from "../../modules/logger/messages";
import { LogErrorMessagesCodes, LogScopes } from "../../ts/enums";

/**
 * Represents an error that is thrown by the client.
 */
export class AresError<
  Code extends LogErrorMessagesCodes = LogErrorMessagesCodes
> extends Error {
  readonly code: keyof typeof LogErrorMessagesCodes;

  constructor(
    scope: LogScopes | null,
    code: Code,
    ...args: Parameters<(typeof logErrorMessages)[Code]>
  ) {
    const { message } = LogEntryFormatter.prepareEntry<LogErrorMessagesCodes>(
      scope ?? null,
      code,
      ...args
    );
    super(message);
    this.code = LogErrorMessagesCodes[
      code
    ] as keyof typeof LogErrorMessagesCodes;
    Error.captureStackTrace?.(this, AresError);
  }
}