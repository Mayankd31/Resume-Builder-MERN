import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://mayankd3107:uxVpMU8iMwjK5uwU@cluster0.m6pzcdo.mongodb.net/",
      {
        dbName: "RESUME",
      }
    );
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB Connection Failed:", error.message);
  }
};
