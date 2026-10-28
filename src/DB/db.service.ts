import mongoose from "mongoose";
export const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.DB_URI || "mongodb://localhost:27017/myDB",
    );
    console.log("Database Connected Successfully");
  } catch (error) {
    console.error("Database Connection Failed", error);
    process.exit(1);
  }
};
