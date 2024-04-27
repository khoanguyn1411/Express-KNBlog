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
      readonly GOOGLE_API_KEY: string;

      readonly GOOGLE_SERVICE_ACCOUNT_TYPE: string;
      readonly GOOGLE_SERVICE_ACCOUNT_PROJECT_ID: string;
      readonly GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY_ID: string;
      readonly GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY: string;
      readonly GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL: string;
      readonly GOOGLE_SERVICE_ACCOUNT_CLIENT_ID: string;
      readonly GOOGLE_SERVICE_ACCOUNT_AUTH_URI: string;
      readonly GOOGLE_SERVICE_ACCOUNT_TOKEN_URI: string;
      readonly GOOGLE_SERVICE_ACCOUNT_AUTH_PROVIDER_X509_CERT_URL: string;
      readonly GOOGLE_SERVICE_ACCOUNT_CLIENT_X509_CERT_URL: string;
      readonly GOOGLE_SERVICE_ACCOUNT_UNIVERSE_DOMAIN: string;

      readonly GOOGLE_DRIVE_STORAGE_LOCATION_ID: string;
    }
  }
}

export {};
