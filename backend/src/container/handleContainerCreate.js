import Docker from "dockerode";
import { DOCKER_SOCKET_PATH } from "../config/serverConfig.js";

const docker = new Docker({
  socketPath: DOCKER_SOCKET_PATH,
});

export const handleContainerCreate = async (
  projectId,
  webSocketForTerminal,
  req,
  tcp,
  head
) => {
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
      ExposedPorts: { "5173/tcp": {} },
      Env: ["HOST=0.0.0.0"],
      HostConfig: {
        // Mounts the project directory into the container
        Binds: [`${process.cwd()}/projects/${projectId}:/home/sandbox/app`],
        PortBindings: { "5173/tcp": [{ HostPort: "0" }] },
      },
    });
    console.log("Container created:", container.id);
    await container.start();
    console.log("Container started:", container.id);

    // Upgrade the HTTP connection to a WebSocket connection
    webSocketForTerminal.handleUpgrade(req, tcp, head, (establishedWSConn) => {
      console.log("WebSocket connection established for terminal");
      webSocketForTerminal.emit(
        "connection",
        establishedWSConn,
        req,
        container
      );
    });
  } catch (error) {
    console.error("Error creating container:", error);
  }
};
