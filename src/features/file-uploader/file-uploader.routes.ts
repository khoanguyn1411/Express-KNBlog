import { Router } from "express";
import multer from "multer";

import { routePaths } from "../../routes/route-paths";
import { FileUploaderController } from "./controllers/file-uploader.controller";

const upload = multer();

const router = Router();
router.post(routePaths.upload.url, upload.single("file"), FileUploaderController.uploadFile);
export const uploadRoutes = router;
