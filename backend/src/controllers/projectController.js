import util from "util";
import child_process from "child_process";
import uuid4 from "uuid4";
import fs from "fs/promises";

const execPromisified = util.promisify(child_process.exec);

export const createProject = async (req, res) => {
  try {
    const projectId = uuid4();
    await fs.mkdir(`./projects/${projectId}`);
    const { stdout, stderr } = await execPromisified(
      "npm create vite@latest my-react-app -- --template react",
      {
        cwd: `./projects/${projectId}`,
      }
    );
    if (stderr) {
      return res.status(500).json({ error: stderr });
    }
    return res
      .status(200)
      .json({ message: "Project created successfully", data: projectId });
  } catch (error) {
    console.error("Error creating project:", error);
    return res.status(500).json({ error: "Failed to create project" });
  }
};
