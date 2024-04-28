import { Response } from "express";

import { ErrorCode, SuccessCode } from "@/configs/app/code.config";
import { RequestPasswordDto } from "@/core/dtos/request-password.dto";
import { googleDriveService } from "@/services/google-drive.service";
import { passwordService } from "@/services/password.service";
import { assertNonNull } from "@/utils/funcs/assert-non-null";
import { AppRequest } from "@/utils/types/request";

export namespace FileUploaderController {
  export async function uploadFile(req: AppRequest, res: Response) {
    const file = req.file;
    assertNonNull(file);
    try {
      const result = await googleDriveService.uploadFile(file);
      res.status(SuccessCode.OK).send(result);
    } catch (e) {
      res.status(ErrorCode.BadData).send(e);
    }
  }

  /**
   * Internal usage, for clearing data after test.
   * @param req App request.
   * @param res Response.
   */
  export async function removeAllFiles(req: AppRequest<RequestPasswordDto>, res: Response) {
    const password = req.body.password;
    const encryptedPassword = "$2b$10$/kPplrXT3GigF/4OlDZXVuTMNyhQh2aHIrYrszsv2THG483RwxH46";
    const isValidPassword = await passwordService.verifyPassword(password, encryptedPassword);
    if (isValidPassword) {
      try {
        const result = await googleDriveService.removeAllFiles();
        res.status(SuccessCode.OK).send(result);
      } catch (e) {
        res.status(ErrorCode.BadData).send(e);
      }
      return;
    }
    res.sendStatus(500);
  }
}
