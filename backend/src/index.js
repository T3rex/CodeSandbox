import express from "express";
import { port } from "./config/serverConfig.js";
import cors from "cors";
import router from "./routes/index.js";
import { createServer } from "node:http";
import { Server } from "socket.io";

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

io.on("connection", (socket) => {
  console.log("Client connected via ws");
});

server.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
