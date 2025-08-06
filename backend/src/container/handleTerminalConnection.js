export const handleTerminalConnection = async (ws, container) => {
  await container.exec(
    {
      Cmd: ["/bin/bash"],
      AttachStdin: true,
      AttachStdout: true,
      AttachStderr: true,
      Tty: true,
      User: "sandbox",
    },
    async (err, exec) => {
      if (err) {
        console.error("Error creating exec instance:", err);
        return;
      }

      await exec.start({ hijack: true, stdin: true }, (err, stream) => {
        if (err) {
          console.error("Error starting exec instance:", err);
          return;
        }
        processStreamOutput(stream, ws);
        ws.on("message", (data) => {
          console.log("Received data from client:", data);
          stream.write(data);
        });
      });
    }
  );
};

const processStreamOutput = (stream, ws) => {
  let nextDataType = null; //Stores the type of the next data chunk
  let nextDataLength = null; //Stores the length of the next data chunk
  let buffer = Buffer.from("");

  function processStreamData(data) {
    if (data) {
      buffer = Buffer.concat([buffer, data]);
    }
    if (!nextDataType) {
      if (buffer.length >= 8) {
        const header = bufferSlicer(8);
        nextDataType = header.readUInt32BE(0);
        nextDataLength = header.readUInt32BE(4);
        processStreamData();
      }
    } else {
      if (buffer.length >= nextDataLength) {
        const content = bufferSlicer(nextDataLength);
        ws.send(content);
        nextDataLength = null;
        nextDataType = null;
        processStreamData();
      }
    }
  }

  function bufferSlicer(end) {
    const output = buffer.subarray(0, end);
    buffer = Buffer.from(buffer.subarray(end, buffer.length));
    return output;
  }

  stream.on("data", processStreamData);
};
