import { LogEntry } from "winston";
import { LogMessagesCodes } from "../../../ts/enums";

const { TEST, TESTARGS } = LogMessagesCodes;

export const logMessages = {
  [TEST]: (): LogEntry => {
    return {
      level: "silly",
      message: `Test message`,
    };
  },
  [TESTARGS]: (strArg: string): LogEntry => {
    return {
      level: "silly",
      message: `Test message with args [strArg=${strArg}]`,
    };
  },
};
