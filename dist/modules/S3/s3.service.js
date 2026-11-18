"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3Service = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const s3Client = new client_s3_1.S3Client({
    region: process.env.AWS_REGION || "us-east-1",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
    },
});
const bucketName = process.env.AWS_BUCKET_NAME || "my-app-bucket";
class S3Service {
    async uploadAsset(file, folder = "assets") {
        const key = `${folder}/${Date.now()}-${file.originalname}`;
        const command = new client_s3_1.PutObjectCommand({
            Bucket: bucketName,
            Key: key,
            Body: file.buffer,
            ContentType: file.mimetype,
        });
        await s3Client.send(command);
        return {
            key,
            url: `https://${bucketName}.s3.${process.env.AWS_REGION || "us-east-1"}.amazonaws.com/${key}`,
        };
    }
    async getPresignedUploadUrl(fileName, contentType, folder = "assets") {
        const key = `${folder}/${Date.now()}-${fileName}`;
        const command = new client_s3_1.PutObjectCommand({
            Bucket: bucketName,
            Key: key,
            ContentType: contentType,
        });
        const uploadUrl = await (0, s3_request_presigner_1.getSignedUrl)(s3Client, command, { expiresIn: 300 });
        return { uploadUrl, key };
    }
    async getPresignedDownloadUrl(key) {
        const command = new client_s3_1.GetObjectCommand({
            Bucket: bucketName,
            Key: key,
        });
        const downloadUrl = await (0, s3_request_presigner_1.getSignedUrl)(s3Client, command, {
            expiresIn: 3600,
        });
        return { downloadUrl };
    }
    async deleteAsset(key) {
        const command = new client_s3_1.DeleteObjectCommand({
            Bucket: bucketName,
            Key: key,
        });
        await s3Client.send(command);
        return { message: "Asset deleted from S3 successfully!" };
    }
}
exports.S3Service = S3Service;
exports.default = new S3Service();
