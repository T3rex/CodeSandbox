import uuid4 from "uuid4";
import fs from "fs/promises";
import path from "path";
import { runVite } from "../utils/ViteUtility.js";

export const createProjectService = async (projectName, template) => {
  try {
    const projectId = uuid4();
    const projectDir = path.join("./projects", projectId);

    await fs.mkdir(projectDir, { recursive: true });

    const output = await runVite({ cwd: projectDir, projectName, template });

    console.log("Project created:\n", output);

    return projectId;
  } catch (error) {
    throw new Error("Error in service layer: " + error.message);
  }
};
