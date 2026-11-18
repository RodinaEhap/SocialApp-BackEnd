import { Request, Response } from "express";
import s3Service from "../S3/s3.service";
export class AssetController {
  uploadSingle = async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded!!!!!" });
      }
      const result = await s3Service.uploadAsset(req.file, "uploads");
      return res.status(201).json({ message: "Success", result });
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message || "Upload failed!!!!!" });
    }
  };
  getPresignedUpload = async (req: Request, res: Response) => {
    try {
      const { fileName, contentType, folder } = req.body;
      if (!fileName || !contentType) {
        return res
          .status(400)
          .json({ message: "fileName and contentType are required!!!!!" });
      }
      const result = await s3Service.getPresignedUploadUrl(
        fileName,
        contentType,
        folder || "uploads",
      );
      return res.status(200).json({ message: "Success", result });
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message || "Something went wrong!" });
    }
  };
  getPresignedDownload = async (req: Request, res: Response) => {
    try {
      const { key } = req.query;
      if (!key) {
        return res.status(400).json({ message: "File key is required!!!!!" });
      }
      const result = await s3Service.getPresignedDownloadUrl(key as string);
      return res.status(200).json({ message: "Success", result });
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message || "Something went wrong!" });
    }
  };
  deleteAsset = async (req: Request, res: Response) => {
    try {
      const { key } = req.body;
      if (!key) {
        return res.status(400).json({ message: "File key is required!!!!!" });
      }
      const result = await s3Service.deleteAsset(key);
      return res.status(200).json({ message: "Success", result });
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message || "Something went wrong!" });
    }
  };
}
export default new AssetController();
