import "dotenv/config";
import express, { Request, Response } from "express";
import authRouter from "./modules/authentication/authentication.router";
import { connectDB } from "./DB/db.service";
import userRouter from "./modules/user/user.router";
import notificationRouter from "./modules/notification/notification.router";
import { globalErrorHandler } from "./middleware";
import assetsRouter from "./modules/asset/asset.router";
import postRouter from "./modules/post/post.router";
import commentRouter from "./modules/comment/comment.router";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/notifications", notificationRouter);
app.use("/api/assets", assetsRouter);
app.use("/api/posts", postRouter);
app.use("/api/posts", commentRouter);
app.use("/api/comments", commentRouter);

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Server is running successfully!" });
});

app.use(globalErrorHandler);

const bootstrap = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

bootstrap();
