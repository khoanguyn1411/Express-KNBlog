import { Response } from "express";
import { createReadStream } from "fs";

import { ErrorCode } from "@/configs/app/code.config";
import { googleDriveService } from "@/services/google-drive.service";
import { AppRequest } from "@/utils/types/request";

export namespace FileUploaderController {
  export async function uploadFile(req: AppRequest<File>, res: Response) {
    const file = req.file;
    if (file == null) {
      res.send(file);
      return;
    }
    try {
      await googleDriveService.uploadFile(file.stream, "New image.jpg");
      res.send(file);
    } catch (e) {
      res.status(ErrorCode.InternalServer).send(e);
    }
  }
}
