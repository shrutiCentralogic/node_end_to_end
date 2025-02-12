import dotenv from "dotenv";
import connectDB from "./config/dbConfig";
import { ENV } from "./config/envConfig";
import express from "express";
import { UserRoutes } from "./routes/userRoutes";
import { Request, Response, Router } from "express";

dotenv.config()

const app = express()

app.use(express.json())

connectDB()
  .then(() => {
    console.log("Database Connected Successfully");

    
    app.use("/user", new UserRoutes().getRouter());

    app.get("/health-check", (req: Request, res: Response) => { res.send("API Running!") })


    
    app.listen(ENV.PORT, () => {
      console.log(`Server is running on port ${ENV.PORT || 5000}`);
    });

  })
  .catch((err) => {
    console.error("Database Connection Failed", err);
    process.exit(1); // Exit the process if DB fails to connect
  });
