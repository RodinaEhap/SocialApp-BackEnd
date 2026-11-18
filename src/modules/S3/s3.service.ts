import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
const s3Client = new S3Client({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});
const bucketName = process.env.AWS_BUCKET_NAME || "my-app-bucket";
export class S3Service {
  async uploadAsset(file: Express.Multer.File, folder: string = "assets") {
    const key = `${folder}/${Date.now()}-${file.originalname}`;
    const command = new PutObjectCommand({
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
  async getPresignedUploadUrl(
    fileName: string,
    contentType: string,
    folder: string = "assets",
  ) {
    const key = `${folder}/${Date.now()}-${fileName}`;
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      ContentType: contentType,
    });
    const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 300 });
    return { uploadUrl, key };
  }
  async getPresignedDownloadUrl(key: string) {
    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: key,
    });

    const downloadUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 3600,
    });
    return { downloadUrl };
  }
  async deleteAsset(key: string) {
    const command = new DeleteObjectCommand({
      Bucket: bucketName,
      Key: key,
    });

    await s3Client.send(command);
    return { message: "Asset deleted from S3 successfully!" };
  }
}
export default new S3Service();
