import { randomUUID } from "crypto";
import { google } from "googleapis";
import { PassThrough } from "stream";

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
  public async uploadFile(fileToUpload: Express.Multer.File) {
    const drive = await this.initDrive();
    const bufferStream = new PassThrough();
    bufferStream.end(fileToUpload.buffer);

    try {
      const res = drive.files.create({
        requestBody: {
          name: `${fileToUpload.originalname}-${randomUUID()}`,
          parents: [GOOGLE_DRIVE_STORAGE_LOCATION_ID],
        },
        media: {
          body: bufferStream,
          mimeType: fileToUpload.mimetype,
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
