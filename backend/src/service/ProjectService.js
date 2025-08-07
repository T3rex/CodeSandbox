import uuid4 from "uuid4";
import fs from "fs/promises";
import path from "path";
import { runVite } from "../utils/ViteUtility.js";
import dirTree from "directory-tree";

export const createProjectService = async (projectName, template) => {
  try {
    const projectId = uuid4();
    const projectDir = path.join("./projects", projectId);
    const customConfigPath = path.join("./src/utils", "CustomVite.config.js");
    const projectConfigPath = path.join(
      projectDir,
      projectName,
      "vite.config.js"
    );

    await fs.mkdir(projectDir, { recursive: true });

    await runVite({ cwd: projectDir, projectName, template });
    // Copy the custom Vite config file to the project directory
    await fs.copyFile(customConfigPath, projectConfigPath);

    return projectId;
  } catch (error) {
    throw new Error("Error in service layer: " + error.message);
  }
};

export const getProjectTreeService = async (projectId) => {
  try {
    const tree = dirTree(path.join("./projects", projectId));
    return tree;
  } catch (error) {
    throw new Error("Error generating tree in service layer" + error.message);
  }
};
