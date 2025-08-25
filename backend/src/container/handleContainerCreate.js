import Docker from "dockerode";
import {
  DOCKER_SOCKET_PATH,
  LOCAL_PROJECTS_DIRECTORY_PATH,
} from "../config/serverConfig.js";

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
        Binds: [
          `${LOCAL_PROJECTS_DIRECTORY_PATH}/${projectId}:/home/sandbox/app`,
        ],
        PortBindings: { "5173/tcp": [{ HostPort: "0" }] },
      },
    });
    console.log("Container created:", container.id);
    await container.start();
    console.log("Container started:", container.id);

    return container;
  } catch (error) {
    console.error("Error creating container:", error);
  }
};

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Get port using backoff delay
export async function getContainerPort(containerName) {
  let retryInterval = 2000;
  const maxInterval = 10000;

  while (true) {
    try {
      const containerList = await docker.listContainers({
        all: true,
        filters: {
          name: [containerName],
        },
      });

      if (containerList.length > 0) {
        const container = await docker
          .getContainer(containerList[0].Id)
          .inspect();
        const hostPort =
          container?.NetworkSettings?.Ports["5173/tcp"]?.[0]?.HostPort;

        if (hostPort) {
          return hostPort;
        }
      }
    } catch (error) {
      console.error("Error retrieving container port:", error);
    }

    console.log(`Port not found yet, retrying in ${retryInterval / 1000}s...`);
    await delay(retryInterval);

    retryInterval = Math.min(retryInterval * 2, maxInterval);
  }
}
