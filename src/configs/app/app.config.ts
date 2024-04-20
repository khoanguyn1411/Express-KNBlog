import { connectEnv } from "../connect-env";

connectEnv();

export const APP_PORT = process.env.APP_PORT;
export const APP_JWT_ACCESS_TOKEN = process.env.APP_JWT_ACCESS_TOKEN as string;
export const APP_JWT_REFRESH_TOKEN = process.env.APP_JWT_REFRESH_TOKEN as string;
