import mongoose from "mongoose";
import { getRequiredEnv } from "../common/utlis/environment";
export const connectDB = async () => {
  try {
    await mongoose.connect(
      getRequiredEnv("DB_URI"),
    );
    console.log("Database Connected Successfully");
  } catch (error) {
    console.error("Database Connection Failed", error);
    process.exit(1);
  }
};
