import mongoose from "mongoose";
import { ENV } from "./envConfig";

const connectDB = async (): Promise<void> => {
    try {
        const uri: string | undefined = ENV.DB_CONNECTION_STRING

        if (!uri) {
            throw new Error("Missing MongoDB connection URL in environment variables");
        }

        await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 5000,
        })

        console.log("✅ MongoDB Connected Successfully!");
    } catch (error) {
        if (error instanceof Error) {
            console.error("❌ MongoDB Connection Error:", error.message);
        } else {
            console.error("❌ Unknown MongoDB Connection Error:", error)
        }
        process.exit(1)
    }
};




export default connectDB;