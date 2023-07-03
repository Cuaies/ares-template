import { format } from "winston";
const { combine, timestamp, errors, printf } = format;

/**
 * Logger format desired to be used on `*.log` file transport(s).
 */
export default combine(
  timestamp(),
  errors({ stack: true }),
  printf(({ level, message, timestamp, stack, ...args }) => {
    return `${timestamp} ${level} -> ${stack || message} ${
      Object.getOwnPropertyNames(args).length
        ? JSON.stringify((({ service, ...args }) => ({ ...args }))(args))
        : ""
    }`;
  })
);
