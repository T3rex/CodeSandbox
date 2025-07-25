import dotenv from "dotenv";

dotenv.config({ debug: true });

export const port = process.env.PORT || 3000;
export const VITE_CREATE_PROJECT_COMMAND =
  process.env.VITE_CREATE_PROJECT_COMMAND || "npm create vite@latest";
