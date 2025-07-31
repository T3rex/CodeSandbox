import express from "express";
import { port } from "./config/serverConfig.js";
import cors from "cors";
import router from "./routes/index.js";
import { createServer } from "node:http";
import { Server } from "socket.io";
import chokidar from "chokidar";
import { handleEditorSocketEvents } from "./socketHandlers/editorHandlers.js";
import { handleContainerCreate } from "./container/handleContainerCreate.js";

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
const terminalNameSpace = io.of("/terminal");

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
    watcher.on("all", (event, path) => {
      console.log(event, path);
    });
  }
  handleEditorSocketEvents(socket, editorNameSpace);

  terminalNameSpace.on("connection", (socket) => {
    console.log("Terminal connected");
    let projectId = socket.handshake.query.projectId;

    socket.on("shellInput", (data) => {
      console.log("Received shell input:", data);
      socket.emit("shellOutput", data);
    });

    socket.on("disconnect", () => {
      console.log("Terminal disconnected");
    });
    handleContainerCreate(projectId, socket);
  });

  socket.on("disconnect", async () => {
    await watcher.close();
    console.log("Editor disconnected");
  });
});

server.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
