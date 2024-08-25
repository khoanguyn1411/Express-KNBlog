import { randomUUID } from "crypto";
import googleConfigJson from "google-service-config.json";
import { drive_v3, google } from "googleapis";
import { PassThrough } from "stream";

import { GOOGLE_DRIVE_STORAGE_LOCATION_ID } from "@/configs/google/google.config";
import { FileUploadResult } from "@/core/models/file-upload-result";
import { assertNonNull } from "@/utils/funcs/assert-non-null";
import { mapMimeTypeToExtension, MimeType, mimeTypes } from "@/utils/funcs/validate-file-type";

const SCOPES: string[] = ["https://www.googleapis.com/auth/drive"];

class GoogleDriveService {
  private drivePromise: Promise<drive_v3.Drive>;
  constructor() {
    this.drivePromise = this.initDrive();
  }

  private async authorize() {
    const jwtClient = new google.auth.JWT(
      googleConfigJson.client_email,
      undefined,
      googleConfigJson.private_key,
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

  /** Remove all files, from the trash also. */
  public async removeAllFiles() {
    const drive = await this.drivePromise;
    const res = await drive.files.list();
    assertNonNull(res.data.files);
    const deleteRequests = res.data.files
      .filter((item) => mimeTypes.includes(item.mimeType as MimeType))
      .map((item) => {
        assertNonNull(item.id);
        return drive.files.delete({ fileId: item.id });
      });
    await Promise.all(deleteRequests);
    const newList = await drive.files.list();
    return newList.data;
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
      // Step 1: Create file with temporary name.
      const res = await drive.files.create({
        requestBody: {
          name: randomUUID(),
          parents: [GOOGLE_DRIVE_STORAGE_LOCATION_ID],
        },
        media: {
          body: bufferStream,
          mimeType: fileToUpload.mimetype,
        },
        fields: "id",
      });
      const fileId = res.data.id;
      assertNonNull(fileId);

      // Step 2: Update the file name with the ID included, will be easier to migrate later.
      await drive.files.update({
        fileId: fileId,
        requestBody: {
          name: `${fileId}.${mapMimeTypeToExtension(fileToUpload.mimetype as MimeType)}`,
        },
        fields: "id, name",
      });

      const result = await this.generatePublicUrl(fileId);
      return {
        downloadUrl: result.data.webContentLink as string,
        driveViewUrl: result.data.webViewLink as string,

        // Replace this URL https://drive.google.com/uc?export=view&id=${fileId} with below URL because the issues:
        // - https://issuetracker.google.com/issues/319531488?pli=1,
        // - https://stackoverflow.com/questions/77803187/having-trouble-displaying-an-image-from-google-drive

        viewUrl: `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`,
      };
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}

export const googleDriveService = new GoogleDriveService();
