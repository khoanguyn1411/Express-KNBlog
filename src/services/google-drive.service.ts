import { ReadStream } from "fs";
import { google } from "googleapis";

import {
  GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL,
  GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY,
} from "@/configs/google/google.config";

const SCOPES: string[] = ["https://www.googleapis.com/auth/drive"];

class GoogleDriveService {
  private async authorize() {
    const jwtClient = new google.auth.JWT(
      GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL,
      undefined,
      GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY,
      SCOPES,
    );
    await jwtClient.authorize();
    return jwtClient;
  }

  private async initDrive() {
    const authClient = await this.authorize();
    return google.drive({ version: "v3", auth: authClient });
  }

  public async uploadFile(stream: ReadStream) {
    const drive = await this.initDrive();
    const fileMetaData = {
      name: "",
      parents: "1Dc697ezr9DjZS6lGRwousPii3xLUDmjy",
    };
    try {
      const res = drive.files.create({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        resource: fileMetaData,
        media: {
          body: stream,
          mimeType: "text/plain",
        },
        fields: "id",
      });
      return res;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}

export const googleDriveService = new GoogleDriveService();
