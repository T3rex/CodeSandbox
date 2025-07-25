import uuid4 from "uuid4";
import fs from "fs/promises";
import path from "path";
import { promisify } from "node:util";
import child_process from "node:child_process";

const exec = promisify(child_process.exec);

async function runVite({ cwd, projectName, template }) {
  const command =
    process.env.VITE_PROJECT_CREATE_COMMAND || "npm create vite@latest";
  const fullCommand = `${command} ${projectName} -- --template ${template}`;

  try {
    const { stdout, stderr } = await exec(fullCommand, { cwd });
    if (stderr) {
      console.error("Error output:", stderr);
    }
    return stdout;
  } catch (error) {
    console.error("Command execution failed:", error);
    throw error;
  }
}

export const createProject = async (req, res) => {
  try {
    const { projectName, template } = req.body;
    const projectId = uuid4();
    const projectDir = path.join("./projects", projectId);

    await fs.mkdir(projectDir, { recursive: true });

    const output = await runVite({ cwd: projectDir, projectName, template });

    console.log("Project created:\n", output);

    return res
      .status(200)
      .json({ message: "Project created successfully", projectId });
  } catch (error) {
    console.error("Error creating project:", error.message);
    return res.status(500).json({
      error: "Vite project creation failed",
      message: error.message,
    });
  }
};
