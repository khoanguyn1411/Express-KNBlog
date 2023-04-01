import { connectEnv } from "../../utils/funcs/connect-env";

connectEnv();

export const APP_PORT = process.env.APP_PORT;
export const APP_JWT_ACCESS_TOKEN = process.env.APP_JWT_ACCESS_TOKEN;
export const APP_JWT_REFRESH_TOKEN = process.env.APP_JWT_REFRESH_TOKEN;
