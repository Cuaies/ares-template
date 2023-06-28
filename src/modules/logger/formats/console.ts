import { format } from "winston";
import { consoleFormat } from "winston-console-format";
const { combine, colorize, padLevels } = format;

/**
 * Logger format desired to be used on console transport(s).
 */
export default combine(
  colorize({ all: true }),
  padLevels(),
  consoleFormat({
    showMeta: true,
    metaStrip: ["timestamp", "service"],
    inspectOptions: {
      depth: Infinity,
      colors: true,
      maxArrayLength: Infinity,
      breakLength: 120,
      compact: Infinity,
    },
  })
);
