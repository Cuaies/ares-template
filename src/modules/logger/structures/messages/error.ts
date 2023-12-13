import { LogErrorMessagesCodes } from "../../../../ts/enums";

const {
  TEST,
  TESTARGS,

  MethodNotImplemented,

  InvalidDirPath,
} = LogErrorMessagesCodes;

export const logErrorMessages = {
  [TEST]: () => `Test error message`,
  [TESTARGS]: (strArg: string) =>
    `Test error message with args [strArg=${strArg}]`,
  [MethodNotImplemented]: (methodName: string) =>
    `Method not implemented [methodName=${methodName}]`,
  [InvalidDirPath]: (dirPath: string) =>
    `Invalid directory path [dirPath=${dirPath}]`,
} satisfies Record<LogErrorMessagesCodes, (...args: any[]) => string>;
