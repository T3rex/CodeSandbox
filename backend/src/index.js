import express from "express";
import { port } from "./config/serverConfig.js";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/ping", (req, res) => {
  res.status(200).json({ message: "pong" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
