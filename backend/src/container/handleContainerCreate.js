import Docker from "dockerode";
import { DOCKER_SOCKET_PATH } from "../config/serverConfig.js";

const docker = new Docker({
  socketPath: DOCKER_SOCKET_PATH,
});

export const handleContainerCreate = async (projectId, socket) => {
  console.log("Creating container for project:", projectId);
  try {
    const container = await docker.createContainer({
      Image: "sandbox",
      AttachStdin: true,
      AttachStdout: true,
      AttachStderr: true,
      Cmd: ["/bin/bash"],
      Tty: true,
      User: "sandbox",
      HostConfig: {
        // Mounts the project directory into the container
        Binds: [`${process.cwd()}/projects/${projectId}:/home/sandbox/app`],
        PortBindings: { "5173/tcp": [{ HostPort: "0" }] },
        ExposedPorts: { "5173/tcp": {} },
        Env: ["HOST=0.0.0.0"],
      },
    });
    console.log("Container created:", container.id);
    await container.start();
    console.log("Container started:", container.id);
  } catch (error) {
    console.error("Error creating container:", error);
  }
};
