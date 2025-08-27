import { promisify } from "node:util";
import child_process from "node:child_process";
import fs from "fs/promises";
import path from "path";

const exec = promisify(child_process.exec);

async function createAngularProject({ cwd, projectName }) {
  try {
    console.log(`Creating Angular project: ${projectName}...`);
    const { stdout, stderr } = await exec(`ng new ${projectName} --defaults`, {
      cwd,
    });
    //Setting package.json for angular project
    // const projectPackageJsonFilePath = path.join(
    //   cwd,
    //   projectName,
    //   "package.json"
    // );
    // const projectPackageJson = await fs.readFile(
    //   projectPackageJsonFilePath,
    //   "utf8"
    // );
    // const projectPackage = JSON.parse(projectPackageJson);
    // projectPackage.scripts.start = "ng serve";
    // await fs.writeFile(
    //   projectPackageJsonPath,
    //   JSON.stringify(projectPackage, null, 2)
    // );

    // if (stdout) console.log(stdout);
    // if (stderr) console.error(stderr);

    const projectAngularJsonFilePath = path.join(
      cwd,
      projectName,
      "angular.json"
    );
    const projectAngularJson = await fs.readFile(
      projectAngularJsonFilePath,
      "utf8"
    );

    const angularConfig = JSON.parse(projectAngularJson);

    if (!angularConfig["cli"]) {
      angularConfig["cli"] = {};
    }
    //Setting analytics off
    angularConfig["cli"] = { ...angularConfig["cli"], analytics: false };

    if (!angularConfig.projects[projectName].architect["serve"]) {
      angularConfig.projects[projectName].architect["serve"] = {};
    }
    //Setting server options in angular config
    angularConfig.projects[projectName].architect["serve"]["options"] = {
      ...(angularConfig.projects[projectName].architect["serve"]["options"] ||
        {}),
      allowedHosts: true,
      port: 5173,
      host: "0.0.0.0",
    };

    await fs.writeFile(
      projectAngularJsonFilePath,
      JSON.stringify(angularConfig, null, 2)
    );
    if (stdout) console.log(stdout);
    if (stderr) console.error(stderr);

    console.log(`Project '${projectName}' created successfully.`);
  } catch (error) {
    console.error("Error creating Angular project:", error.message);
  }
}

export { createAngularProject };
