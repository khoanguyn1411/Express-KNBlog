import { connectEnv } from "../connect-env";

connectEnv();

export const APP_PORT = process.env.APP_PORT;
export const JWT_ACCESS_TOKEN = process.env.JWT_ACCESS_TOKEN as string;
export const JWT_REFRESH_TOKEN = process.env.JWT_REFRESH_TOKEN as string;
export const JWT_ACCESS_REFRESH_TIME = process.env.JWT_ACCESS_REFRESH_TIME as string;
export const JWT_ACCESS_TOKEN_TIME = process.env.JWT_ACCESS_TOKEN_TIME as string;
