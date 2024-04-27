import { Router } from "express";

import { routePaths } from "../../routes/route-paths";
import { FileUploaderController } from "./controllers/file-uploader.controller";

const router = Router();
router.get(routePaths.upload.url, FileUploaderController.uploadFile);
export const uploadRoutes = router;
