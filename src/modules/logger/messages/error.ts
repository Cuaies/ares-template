import { LogErrorMessagesCodes } from "../../../ts/enums";

const { TEST, TESTARGS } = LogErrorMessagesCodes;

export const logErrorMessages = {
  [TEST]: () => `Test error message`,
  [TESTARGS]: (strArg: string) =>
    `Test error message with args [strArg=${strArg}]`,
};
