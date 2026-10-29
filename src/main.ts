import express, { Request, Response } from "express";
import authRouter from "./modules/authentication/authentication.router"; 
import { connectDB } from "./DB/db.service";
import userRouter from "./modules/user/user.router"
import dotenv from "dotenv";
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Server is running successfully!" });
});
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
