import { Router } from "express";
import multer from "multer";

import {
  IMAGE_MIME_TYPES,
  validateFileType,
  validateUploadFileRequestSchema,
} from "@/utils/funcs/validate-file-type";

import { routePaths } from "../../routes/route-paths";
import { FileUploaderController } from "./controllers/file-uploader.controller";

const upload = multer();

const router = Router();
router.post(
  routePaths.upload.url,
  upload.single("file"),
  validateUploadFileRequestSchema,
  FileUploaderController.uploadFile,
);
router.post(
  routePaths.upload.children.image.url,
  upload.single("file"),
  validateUploadFileRequestSchema,
  validateFileType(IMAGE_MIME_TYPES),
  FileUploaderController.uploadFile,
);
export const uploadRoutes = router;
