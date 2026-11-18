import { Router } from "express";
import assetController from "./asset.controller";
import { authMiddleware, uploadCloud } from "../../middleware";
const router = Router();
router.post(
  "/upload",
  authMiddleware,
  uploadCloud.single("file"),
  assetController.uploadSingle,
);
router.post(
  "/presigned-upload",
  authMiddleware,
  assetController.getPresignedUpload,
);
router.get(
  "/presigned-download",
  authMiddleware,
  assetController.getPresignedDownload,
);
router.delete("/", authMiddleware, assetController.deleteAsset);
export default router;
