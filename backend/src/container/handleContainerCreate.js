import Docker from "dockerode";
import { DOCKER_SOCKET_PATH } from "../config/serverConfig.js";
import path from "path";

const docker = new Docker({
  socketPath: DOCKER_SOCKET_PATH,
});

export const handleContainerCreate = async (projectId) => {
  try {
    const existingContainers = await docker.listContainers({
      all: true,
      filters: {
        name: [projectId],
      },
    });
    if (existingContainers.length > 0) {
      await docker
        .getContainer(existingContainers[0].Id)
        .remove({ force: true });
      console.log("Existing container removed:", existingContainers[0].Id);
    }

    const container = await docker.createContainer({
      Image: "sandbox",
      AttachStdin: true,
      AttachStdout: true,
      AttachStderr: true,
      Cmd: ["/bin/bash"],
      name: projectId,
      Tty: true,
      User: "sandbox",
      ExposedPorts: { "5173/tcp": {} },
      Env: ["HOST=0.0.0.0"],
      HostConfig: {
        // Mounts the project directory into the container
        Binds: [`${process.cwd()}/../projects/${projectId}:/home/sandbox/app`],
        PortBindings: { "5173/tcp": [{ HostPort: "0" }] },
      },
    });
    console.log(path.resolve(`${process.cwd()}/../projects/${projectId}`));
    console.log("Container created:", container.id);
    await container.start();
    console.log("Container started:", container.id);

    return container;
  } catch (error) {
    console.error("Error creating container:", error);
  }
};
