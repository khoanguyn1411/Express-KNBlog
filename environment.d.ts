/* eslint-disable @typescript-eslint/naming-convention */
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly APP_PORT: number;
      readonly APP_JWT_ACCESS_TOKEN: string;
      readonly APP_JWT_REFRESH_TOKEN: string;

      readonly DB_URL: string;

      readonly GOOGLE_CLIENT_ID: string;
      readonly GOOGLE_CLIENT_SECRET: string;
    }
  }
}

export {};
