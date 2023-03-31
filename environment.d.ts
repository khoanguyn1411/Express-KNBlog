/* eslint-disable @typescript-eslint/naming-convention */
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly APP_PORT: string;
      readonly DB_URL: string;
    }
  }
}

export {};
