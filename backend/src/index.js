import express from "express";
import { port } from "./config/serverConfig.js";
import cors from "cors";
import router from "./routes/index.js";
import { createServer } from "node:http";
import { Server } from "socket.io";
import chokidar from "chokidar";
import { handleEditorSocketEvents } from "./socketHandlers/editorHandlers.js";

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
    watcher.on("all", (event, path) => {
      console.log(event, path);
    });
  }

  handleEditorSocketEvents(socket);

  socket.on("disconnect", async () => {
    await watcher.close();
    console.log("editor disconnected");
  });
});

server.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
