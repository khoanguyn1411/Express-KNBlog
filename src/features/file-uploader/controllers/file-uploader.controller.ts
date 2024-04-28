import { Response } from "express";

import { ErrorCode, SuccessCode } from "@/configs/app/code.config";
import { googleDriveService } from "@/services/google-drive.service";
import { assertNonNull } from "@/utils/funcs/assert-non-null";
import { AppRequest } from "@/utils/types/request";

export namespace FileUploaderController {
  export async function uploadFile(req: AppRequest<File>, res: Response) {
    const file = req.file;
    assertNonNull(file);
    try {
      const result = await googleDriveService.uploadFile(file);
      res.status(SuccessCode.OK).send(result);
    } catch (e) {
      res.sendStatus(ErrorCode.BadData).send(e);
    }
  }
}
