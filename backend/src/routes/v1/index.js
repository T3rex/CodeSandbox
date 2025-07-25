import express from "express";
import { pingCheck } from "../../controllers/pingController.js";
import projectsRouter from "./projects.js";

const v1router = express.Router();

v1router.use("/ping", pingCheck);
v1router.use("/projects", projectsRouter);

export default v1router;
