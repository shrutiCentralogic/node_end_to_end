import dotenv from "dotenv";
import connectDB from "./config/dbConfig";
import { ENV } from "./config/envConfig";
import express from "express";
import { UserRoutes } from "./routes/userRoutes";
import { Request, Response, Router } from "express";

// ✅ Load environment variables at the very start
dotenv.config();

// ✅ Initialize Express
const app = express();

// ✅ Middleware
app.use(express.json()); // Important for parsing JSON requests

// ✅ Connect to Database BEFORE starting the server
connectDB()
  .then(() => {
    console.log("Database Connected Successfully");

    // ✅ Register Routes
    app.use("/user", new UserRoutes().getRouter());

    app.get("/health-check", (req: Request, res: Response) => { res.send("API Running!") })


    // ✅ Start Server AFTER successful DB connection
    app.listen(ENV.PORT, () => {
      console.log(`Server is running on port ${ENV.PORT || 5000}`);
    });

  })
  .catch((err) => {
    console.error("Database Connection Failed", err);
    process.exit(1); // Exit the process if DB fails to connect
  });
