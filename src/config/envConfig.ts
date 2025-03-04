import dotenv from "dotenv";
dotenv.config(); // Load environment variables at the start

interface EnvConfig {
    readonly DB_CONNECTION_STRING: string
    readonly PORT: any
    readonly USER_COLLECTION: any
}

export const ENV: EnvConfig = {
    DB_CONNECTION_STRING: process.env.CONNECTION_URL || "",
    PORT: process.env.PORT,
    USER_COLLECTION: process.env.USER_COLLECTION

} 