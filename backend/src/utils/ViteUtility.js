import { promisify } from "node:util";
import child_process from "node:child_process";
import { VITE_CREATE_PROJECT_COMMAND } from "../config/serverConfig.js";

async function runVite({ cwd, projectName, template }) {
  const exec = promisify(child_process.exec);
  const command = VITE_CREATE_PROJECT_COMMAND;
  const fullCommand = `${command} ${projectName} -- --template ${template} --config backend/src/utils/CustomVite.config.js`;

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

export { runVite };
