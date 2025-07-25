import express from "express";
import v1router from "./v1/index.js";
import projectsRouter from "./v1/projects.js";

const router = express.Router();

router.use("/v1", v1router);

export default router;
