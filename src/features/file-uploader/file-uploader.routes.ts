import { Router } from "express";
import multer from "multer";

import { requestPasswordDtoSchema } from "@/core/dtos/request-password.dto";
import { requireAuthorizationMiddleware } from "@/middlewares/require-authorization.middleware";
import {
  IMAGE_MIME_TYPES,
  validateFileType,
  validateUploadFileRequestSchema,
} from "@/utils/funcs/validate-file-type";
import { validateRequestBodyWithSchema } from "@/utils/funcs/validate-request";

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

/** Backend internal usage, for clearing data after in google drive test. */
router.delete(
  routePaths.upload.url,
  validateRequestBodyWithSchema(requestPasswordDtoSchema),
  FileUploaderController.removeAllFiles,
);

export const uploadRoutes = router.all("*", requireAuthorizationMiddleware);
