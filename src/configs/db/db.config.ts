import { connectEnv } from "../connect-env";

connectEnv();

/**
 * For some reason, ts still detect process.env.DB_URL as type `string | undefined` even such variable has been declared globally.
 * That is the reason for string type assertion.
 */
export const DB_URL = process.env.DB_URL as string;
