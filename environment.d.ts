/* eslint-disable @typescript-eslint/naming-convention */
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly APP_PORT: number;

      readonly JWT_ACCESS_TOKEN: string;
      readonly JWT_REFRESH_TOKEN: string;
      readonly JWT_ACCESS_REFRESH_TIME: string;
      readonly JWT_ACCESS_TOKEN_TIME: string;

      readonly DB_URL: string;

      readonly GOOGLE_CLIENT_ID: string;
      readonly GOOGLE_CLIENT_SECRET: string;
    }
  }
}

export {};
