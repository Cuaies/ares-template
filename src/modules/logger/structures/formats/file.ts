import { format } from "winston";
const { combine, timestamp } = format;

/**
 * Logger format desired to be used on `*.log` file transport(s).
 */
export default combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss" }));
