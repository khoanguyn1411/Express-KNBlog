import { connectEnv } from "../../utils/funcs/connect-env";

connectEnv();

export const APP_PORT = process.env.APP_PORT;
