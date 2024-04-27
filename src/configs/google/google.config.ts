import { connectEnv } from "../connect-env";

connectEnv();

export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string;
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET as string;
export const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY as string;

export const GOOGLE_SERVICE_ACCOUNT_TYPE = process.env.GOOGLE_SERVICE_ACCOUNT_TYPE as string;
export const GOOGLE_SERVICE_ACCOUNT_PROJECT_ID = process.env
  .GOOGLE_SERVICE_ACCOUNT_PROJECT_ID as string;
export const GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY_ID = process.env
  .GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY_ID as string;
export const GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY = (
  process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY as string
)
  .split(String.raw`\n`)
  .join("\n");
export const GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL = process.env
  .GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL as string;
export const GOOGLE_SERVICE_ACCOUNT_CLIENT_ID = process.env
  .GOOGLE_SERVICE_ACCOUNT_CLIENT_ID as string;
export const GOOGLE_SERVICE_ACCOUNT_AUTH_URI = process.env
  .GOOGLE_SERVICE_ACCOUNT_AUTH_URI as string;
export const GOOGLE_SERVICE_ACCOUNT_TOKEN_URI = process.env
  .GOOGLE_SERVICE_ACCOUNT_TOKEN_URI as string;
export const GOOGLE_SERVICE_ACCOUNT_AUTH_PROVIDER_X509_CERT_URL = process.env
  .GOOGLE_SERVICE_ACCOUNT_AUTH_PROVIDER_X509_CERT_URL as string;
export const GOOGLE_SERVICE_ACCOUNT_CLIENT_X509_CERT_URL = process.env
  .GOOGLE_SERVICE_ACCOUNT_CLIENT_X509_CERT_URL as string;
export const GOOGLE_SERVICE_ACCOUNT_UNIVERSE_DOMAIN = process.env
  .GOOGLE_SERVICE_ACCOUNT_UNIVERSE_DOMAIN as string;
