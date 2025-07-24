import express from "express";
import { port } from "./config/serverConfig.js";
import cors from "cors";
import router from "./routes/index.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api", router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
