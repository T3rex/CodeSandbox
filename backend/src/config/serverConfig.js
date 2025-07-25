import dotenv from "dotenv";

dotenv.config({ debug: true });

export const port = process.env.PORT || 3000;
