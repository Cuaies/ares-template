import { LogErrorMessagesCodes } from "../../../ts/enums";

const { TEST, TESTARGS, ManagerRequiredDir } = LogErrorMessagesCodes;

export const logErrorMessages = {
  [TEST]: () => `Test error message`,
  [TESTARGS]: (strArg: string) =>
    `Test error message with args [strArg=${strArg}]`,
  [ManagerRequiredDir]: (dirName: string) =>
    `Manager requires directory in order to function [dirName=${dirName}]`,
} satisfies Record<LogErrorMessagesCodes, (...args: any[]) => string>;
