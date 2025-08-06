import express from "express";
import { TERMINAL_PORT } from "./config/serverConfig.js";
import cors from "cors";
import router from "./routes/index.js";
import { createServer } from "node:http";
import { handleContainerCreate } from "./container/handleContainerCreate.js";
import { WebSocketServer } from "ws";
import { handleTerminalConnection } from "./container/handleTerminalConnection.js";

const app = express();
const server = createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api", router);

server.listen(TERMINAL_PORT, () => {
  console.log(`App listening on port ${TERMINAL_PORT}`);
});

const webSocketForTerminal = new WebSocketServer({
  server,
});

webSocketForTerminal.on("connection", async (ws, req) => {
  const isTerminal = req.url.includes("/terminal");
  if (isTerminal) {
    const projectId = req.url.split("=")[1];
    const container = await handleContainerCreate(
      projectId,
      webSocketForTerminal
    );
    if (container) {
      handleTerminalConnection(ws, container);
    }
  }
  // ws.on("close", async () => {
  //   try {
  //     await container.remove({ force: true });
  //     console.log("Container removed:" + container.id);
  //   } catch (error) {
  //     console.error("Error stopping or removing container:", error);
  //   }
  // });
});
