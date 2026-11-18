import { Router } from "express";
import { authMiddleware, uploadCloud } from "../../middleware";
import assetController from "../asset/asset.controller";
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
