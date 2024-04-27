import { Response } from "express";
import { createReadStream } from "fs";
import path from "path";

import { ErrorCode } from "@/configs/app/code.config";
import { googleDriveService } from "@/services/google-drive.service";
import { AppRequest } from "@/utils/types/request";

export namespace FileUploaderController {
  export async function uploadFile(req: AppRequest, res: Response) {
    const test = "test.txt";
    const filePath = path.join(__dirname, test);
    const stream = createReadStream(filePath);
    try {
      await googleDriveService.uploadFile(stream);
      res.sendStatus(200);
    } catch (e) {
      res.status(ErrorCode.InternalServer).send(e);
    }
  }
}
