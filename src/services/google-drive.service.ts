import { drive_v3, google } from "googleapis";
import { PassThrough } from "stream";

import {
  GOOGLE_DRIVE_STORAGE_LOCATION_ID,
  GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL,
  GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY,
} from "@/configs/google/google.config";
import { FileUploadResult } from "@/core/models/file-upload-result";
import { assertNonNull } from "@/utils/funcs/assert-non-null";

const SCOPES: string[] = [
  "https://www.googleapis.com/auth/drive",
  "https://www.googleapis.com/auth/drive.file",
];

class GoogleDriveService {
  private drivePromise: Promise<drive_v3.Drive>;
  constructor() {
    this.drivePromise = this.initDrive();
  }

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

  private async generatePublicUrl(fileId: string) {
    const drive = await this.drivePromise;
    try {
      await drive.permissions.create({
        fileId: fileId,
        requestBody: {
          role: "reader",
          type: "anyone",
        },
      });
      const result = await drive.files.get({
        fileId: fileId,
        fields: "webViewLink, webContentLink",
      });
      return result;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  /**
   * Upload file to google drive folders.
   * @param fileToUpload File.
   * @param fileName File name.
   * @param mimetype Mime type.
   * @returns
   */
  public async uploadFile(fileToUpload: Express.Multer.File): Promise<FileUploadResult> {
    const drive = await this.drivePromise;
    const bufferStream = new PassThrough();
    bufferStream.end(fileToUpload.buffer);

    try {
      const res = drive.files.create({
        requestBody: {
          name: fileToUpload.originalname,
          parents: [GOOGLE_DRIVE_STORAGE_LOCATION_ID],
        },
        media: {
          body: bufferStream,
          mimeType: fileToUpload.mimetype,
        },
        fields: "id",
      });
      const fileId = (await res).data.id;
      assertNonNull(fileId);
      const result = await this.generatePublicUrl(fileId);
      return {
        downloadUrl: result.data.webContentLink as string,
        driveViewUrl: result.data.webViewLink as string,
        viewUrl: `http://drive.google.com/uc?export=view&id=${fileId}`,
      };
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}

export const googleDriveService = new GoogleDriveService();
