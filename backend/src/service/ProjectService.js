import uuid4 from "uuid4";
import fs from "fs/promises";
import path from "path";
import { runVite } from "../utils/ViteUtility.js";
import { createAngularProject } from "../utils/AngularUtility.js";
import { createAIProject } from "../utils/AIUtility.js";
import dirTree from "directory-tree";
import { createFiles } from "../utils/createFiles.js";

export const createProjectService = async (
  projectName,
  template,
  description
) => {
  const projectId = uuid4();
  let projectStructure = {};
  const projectDir = path.join("./projects", projectId);
  try {
    // Create project directory
    await fs.mkdir(projectDir, { recursive: true });

    if (template.includes("vite")) {
      template = template.substring(5, template.length);
      await runVite({ cwd: projectDir, projectName, template });
      const projectConfigPath = path.join(
        projectDir,
        projectName,
        "vite.config.js"
      );

      let content = await fs.readFile(projectConfigPath, "utf8");
      if (!content.includes("server:")) {
        content = content.replace(
          /(defineConfig\s*\(\s*\{)([\s\S]*)(\}\s*\))/,
          (match, start, inner, end) => {
            return `${start}${inner.trim()}\n  server: { host: true, allowedHosts: true, cors:true, strictPort: true, port: 5173 } \n${end}`;
          }
        );
      } else {
        console.log("Server config already exists, skipping.");
      }

      await fs.writeFile(projectConfigPath, content, "utf8");
    } else if (template === "angular") {
      await createAngularProject({ cwd: projectDir, projectName });
    } else if (template === "ai-generated") {
      projectStructure = await createAIProject({
        cwd: projectDir,
        description,
      });

      const files = JSON.parse(projectStructure).files;
      await fs.mkdir(path.join(projectDir, projectName), { recursive: true });
      const root = path.join(projectDir, projectName);
      await createFiles(files, root);
    }
    return { projectId, projectStructure };
  } catch (error) {
    await fs.rm(projectDir, { recursive: true });
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
