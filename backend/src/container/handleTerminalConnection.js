export const handleTerminalConnection = async (ws, container) => {
  try {
    const exec = await createExecInstance(container);
    const stream = await startExecInstance(exec);

    // Send Docker output to WebSocket instantly
    stream.on("data", (chunk) => {
      ws.send(chunk); // raw passthrough, no buffering
    });
    // Send WebSocket input to Docker instantly
    ws.on("message", (data) => {
      if (stream.writable) {
        stream.write(data);
      }
    });

    // Cleanup when WebSocket closes
    ws.on("close", () => {
      stream.end();
    });
  } catch (err) {
    console.error("Error handling terminal connection:", err);
  }
};

async function createExecInstance(container) {
  return new Promise((resolve, reject) => {
    container.exec(
      {
        Cmd: ["/bin/bash"],
        AttachStdin: true,
        AttachStdout: true,
        AttachStderr: true,
        Tty: true, // <-- crucial for raw streaming
        User: "sandbox",
      },
      (err, exec) => {
        if (err) return reject(err);
        resolve(exec);
      }
    );
  });
}

async function startExecInstance(exec) {
  return new Promise((resolve, reject) => {
    exec.start({ hijack: true, stdin: true }, (err, stream) => {
      if (err) return reject(err);
      resolve(stream);
    });
  });
}
