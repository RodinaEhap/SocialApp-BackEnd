import multer from "multer";
import { Request } from "express";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const fileFilter = (req: Request, file: Express.Multer.File, cb: any) => {
  if (
    file.mimetype.startsWith("image/") ||
    file.mimetype.startsWith("video/")
  ) {
    cb(null, true);
  } else {
    cb(
      new Error("Invalid file type! Only images and videos are allowed!!!!!"),
      false,
    );
  }
};
export const uploadCloud = multer({
  storage: multer.memoryStorage(), 
  fileFilter,
  limits: { fileSize: 50 * 1024 * 1024 },
});
export const uploadDisk = multer({
  storage,
  fileFilter,
});
