import uuid4 from "uuid4";
import fs from "fs/promises";
import path from "path";
import { runVite } from "../utils/ViteUtility.js";
import { createAngularProject } from "../utils/AngularUtility.js";
import dirTree from "directory-tree";

export const createProjectService = async (projectName, template) => {
  const projectId = uuid4();
  const projectDir = path.join("./projects", projectId);
  try {
    const projectConfigPath = path.join(
      projectDir,
      projectName,
      "vite.config.js"
    );

    await fs.mkdir(projectDir, { recursive: true });

    if (template !== "angular") {
      await runVite({ cwd: projectDir, projectName, template });

      let content = await fs.readFile(projectConfigPath, "utf8");

      if (!content.includes("server:")) {
        content = content.replace(
          /(defineConfig\s*\(\s*\{)([\s\S]*)(\}\s*\))/,
          (match, start, inner, end) => {
            return `${start}${inner.trim()}\n  server: { host: true }\n${end}`;
          }
        );
      } else {
        console.log("Server config already exists, skipping.");
      }

      await fs.writeFile(projectConfigPath, content, "utf8");
    } else if (template === "angular") {
      await createAngularProject({ cwd: projectDir, projectName });
    }
    return projectId;
  } catch (error) {
    fs.rmdir(projectDir, { recursive: true });
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
