import express from "express";
import { port } from "./config/serverConfig.js";
import cors from "cors";
import router from "./routes/index.js";
import { createServer } from "node:http";
import { Server } from "socket.io";
import chokidar from "chokidar";
import { handleEditorSocketEvents } from "./socketHandlers/editorHandlers.js";
import { handleContainerCreate } from "./container/handleContainerCreate.js";
import { WebSocketServer } from "ws";
import { handleTerminalConnection } from "./container/handleTerminalConnection.js";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api", router);

const editorNameSpace = io.of("/editor");

editorNameSpace.on("connection", (socket) => {
  console.log("Editor connected");
  let projectId = socket.handshake.query.projectId;

  if (projectId) {
    var watcher = chokidar.watch(`./projects/${projectId}`, {
      ignored: (path) => path.includes("node_modules"),
      persistent: true,
      awaitWriteFinish: {
        stabilityThreshold: 2000,
        pollInterval: 100,
      },
      ignoreInitial: true,
    });
    watcher.on("all", (event) => {
      if (event !== "change") {
        socket.emit("treeStructureUpdate");
      }
    });
  }
  socket.on("getPort", () => {
    console.log("Get port request received");
  });

  handleEditorSocketEvents(socket, editorNameSpace);

  socket.on("disconnect", async () => {
    await watcher.close();
    console.log("Editor disconnected");
  });
});

server.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

const webSocketForTerminal = new WebSocketServer({
  noServer: true,
});

server.on("upgrade", (req, tcp, head) => {
  const isTerminal = req.url.includes("/terminal");
  if (isTerminal) {
    const projectId = req.url.split("=")[1];
    console.log("WebSocket upgrade for terminal with projectId:", projectId);
    handleContainerCreate(projectId, webSocketForTerminal, req, tcp, head);
  }
});

webSocketForTerminal.on("connection", (ws, req, container) => {
  handleTerminalConnection(ws, container);
  ws.on("close", async () => {
    try {
      await container.stop();
      await container.remove();
      console.log("Container stopped and removed successfully");
    } catch (error) {
      console.error("Error stopping or removing container:", error);
    }
  });
});
