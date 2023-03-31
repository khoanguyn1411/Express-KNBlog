import { connectEnv } from "./connect-env";

connectEnv();

export const APP_PORT = process.env.APP_PORT;
