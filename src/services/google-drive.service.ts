import { ReadStream } from "fs";
import { google } from "googleapis";

import {
  GOOGLE_DRIVE_STORAGE_LOCATION_ID,
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

  /**
   * Upload file to google drive folders.
   * @param fileToUpload File.
   * @param fileName File name.
   * @param mimetype Mime type.
   * @returns
   */
  public async uploadFile(fileToUpload: ReadStream, fileName: string, mimetype = "text/plain") {
    const drive = await this.initDrive();
    const fileMetaData = {
      name: fileName,
      parents: [GOOGLE_DRIVE_STORAGE_LOCATION_ID],
    };
    try {
      const res = drive.files.create({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        resource: fileMetaData,
        media: {
          body: fileToUpload,
          mimeType: mimetype,
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
