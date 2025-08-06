import dotenv from "dotenv";

dotenv.config({ debug: true });

export const port = process.env.PORT || 3000;
export const VITE_CREATE_PROJECT_COMMAND =
  process.env.VITE_CREATE_PROJECT_COMMAND || "npm create vite@latest";
export const DOCKER_SOCKET_PATH =
  process.env.DOCKER_SOCKET_PATH || "/home/hp/.docker/desktop/docker.sock";

export const TERMINAL_PORT = process.env.TERMINAL_PORT || 4000;
