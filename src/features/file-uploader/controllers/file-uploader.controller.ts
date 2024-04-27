import { createReadStream } from "fs";

import { googleDriveService } from "@/services/google-drive.service";

export namespace FileUploaderController {
  export function uploadFile() {
    const test = "test.txt";
    const stream = createReadStream(test);
    googleDriveService.uploadFile(stream);
  }
}
