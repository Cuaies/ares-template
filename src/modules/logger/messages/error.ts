import { LogErrorMessagesCodes } from "../../../ts/enums";

const {
  TEST,
  TESTARGS,

  InvalidDirPath,

  ManagerRequiredDir,
  MethodNotImplemented,
} = LogErrorMessagesCodes;

export const logErrorMessages = {
  [TEST]: () => `Test error message`,
  [TESTARGS]: (strArg: string) =>
    `Test error message with args [strArg=${strArg}]`,
  [InvalidDirPath]: (dirPath: string) =>
    `Invalid directory path [dirPath=${dirPath}]`,
  [ManagerRequiredDir]: (dirName: string) =>
    `Manager requires directory in order to function [dirName=${dirName}]`,
  [MethodNotImplemented]: (methodName: string) =>
    `Method not implemented [methodName=${methodName}]`,
} satisfies Record<LogErrorMessagesCodes, (...args: any[]) => string>;
