"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetController = void 0;
const s3_service_1 = __importDefault(require("../S3/s3.service"));
class AssetController {
    uploadSingle = async (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).json({ message: "No file uploaded!!!!!" });
            }
            const result = await s3_service_1.default.uploadAsset(req.file, "uploads");
            return res.status(201).json({ message: "Success", result });
        }
        catch (error) {
            return res
                .status(400)
                .json({ message: error.message || "Upload failed!!!!!" });
        }
    };
    getPresignedUpload = async (req, res) => {
        try {
            const { fileName, contentType, folder } = req.body;
            if (!fileName || !contentType) {
                return res
                    .status(400)
                    .json({ message: "fileName and contentType are required!!!!!" });
            }
            const result = await s3_service_1.default.getPresignedUploadUrl(fileName, contentType, folder || "uploads");
            return res.status(200).json({ message: "Success", result });
        }
        catch (error) {
            return res
                .status(400)
                .json({ message: error.message || "Something went wrong!" });
        }
    };
    getPresignedDownload = async (req, res) => {
        try {
            const { key } = req.query;
            if (!key) {
                return res.status(400).json({ message: "File key is required!!!!!" });
            }
            const result = await s3_service_1.default.getPresignedDownloadUrl(key);
            return res.status(200).json({ message: "Success", result });
        }
        catch (error) {
            return res
                .status(400)
                .json({ message: error.message || "Something went wrong!" });
        }
    };
    deleteAsset = async (req, res) => {
        try {
            const { key } = req.body;
            if (!key) {
                return res.status(400).json({ message: "File key is required!!!!!" });
            }
            const result = await s3_service_1.default.deleteAsset(key);
            return res.status(200).json({ message: "Success", result });
        }
        catch (error) {
            return res
                .status(400)
                .json({ message: error.message || "Something went wrong!" });
        }
    };
}
exports.AssetController = AssetController;
exports.default = new AssetController();
