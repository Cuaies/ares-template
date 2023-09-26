import { format } from "winston";
const { combine } = format;

/**
 * Logger format desired to be used on `*.log` file transport(s).
 */
export default combine();
