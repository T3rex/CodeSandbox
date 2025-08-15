import { promisify } from "node:util";
import child_process from "node:child_process";
import fs from "fs/promises";
import path from "path";

const exec = promisify(child_process.exec);

async function createAngularProject({ cwd, projectName }) {
  try {
    // await exec("npm install -g @angular/cli", { cwd });

    console.log(`Creating Angular project: ${projectName}...`);
    const { stdout, stderr } = await exec(`ng new ${projectName} --defaults`, {
      cwd,
    });
    const projectPackageJsonPath = path.join(cwd, projectName, "package.json");
    const projectPackageJson = await fs.readFile(
      projectPackageJsonPath,
      "utf8"
    );
    const projectPackage = JSON.parse(projectPackageJson);
    projectPackage.scripts.start = "ng serve --host 0.0.0.0 --port 5173";
    await fs.writeFile(
      projectPackageJsonPath,
      JSON.stringify(projectPackage, null, 2)
    );

    if (stdout) console.log(stdout);
    if (stderr) console.error(stderr);

    console.log(`Project '${projectName}' created successfully.`);
  } catch (error) {
    console.error("Error creating Angular project:", error.message);
  }
}

export { createAngularProject };
