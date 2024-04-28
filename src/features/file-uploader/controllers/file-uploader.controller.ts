import { Response } from "express";

import { ErrorCode, SuccessCode } from "@/configs/app/code.config";
import { FileUploadResult } from "@/core/models/file-upload-result";
import { googleDriveService } from "@/services/google-drive.service";
import { assertNonNull } from "@/utils/funcs/assert-non-null";
import { AppRequest } from "@/utils/types/request";

export namespace FileUploaderController {
  export async function uploadFile(req: AppRequest<File>, res: Response) {
    const file = req.file;
    assertNonNull(file);
    try {
      const result = await googleDriveService.uploadFile(file);
      const fileUploadResult: FileUploadResult = {
        downloadUrl: result.data.webContentLink as string,
        viewUrl: result.data.webViewLink as string,
      };
      res.status(SuccessCode.OK).send(fileUploadResult);
    } catch (e) {
      res.sendStatus(ErrorCode.BadData).send(e);
    }
  }
}
