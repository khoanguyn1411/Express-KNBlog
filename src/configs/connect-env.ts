import { config } from "dotenv";

const customConfig = config({ path: `.env.${process.env.NODE_ENV}` });

export const connectEnv = () => customConfig;
