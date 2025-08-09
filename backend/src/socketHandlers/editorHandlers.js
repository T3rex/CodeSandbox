import fs from "fs/promises";
import path from "path";
import { getContainerPort } from "../container/handleContainerCreate.js";

export const handleEditorSocketEvents = (socket, editorNameSpace) => {
  socket.on("writeFile", async ({ data, pathToFileFolder }) => {
    try {
      await fs.writeFile(pathToFileFolder, data);
      editorNameSpace.emit("writeFileSuccess", {
        path: pathToFileFolder,
        data: "File written successfully",
        success: true,
      });
    } catch (error) {
      console.log("Error writting file" + error);
      socket.emit("writeFileError", {
        data: "Error writing the file",
        success: false,
      });
    }
  });

  socket.on("createFile", async ({ pathToFileFolder, data }) => {
    try {
      await fs.access(pathToFileFolder, fs.constants.F_OK);

      socket.emit("createFileError", {
        success: false,
        data: "File already exist",
      });
    } catch (error) {
      try {
        await fs.writeFile(pathToFileFolder, data || "");
        socket.emit("createFileSuccess", {
          success: true,
          data: "File created successfully",
        });
      } catch (writeErr) {
        console.error("Error writing file:", writeErr);
        socket.emit("createFileError", {
          success: false,
          data: "Failed to write file",
        });
      }
    }
  });

  socket.on("readFile", async ({ pathToFileFolder }) => {
    try {
      const data = await fs.readFile(pathToFileFolder);
      const extension = path.extname(pathToFileFolder);
      socket.emit("readFileSuccess", {
        success: true,
        value: data.toString(),
        path: pathToFileFolder,
        extension,
      });
    } catch (error) {
      console.error("Error writing file:", error);
      socket.emit("readFileError", {
        success: false,
        data: "Failed to read the file",
      });
    }
  });

  socket.on("deleteFile", async ({ pathToFileFolder }) => {
    try {
      await fs.unlink(pathToFileFolder);
      socket.emit("deleteFileSuccess", {
        success: true,
        data: "File deleted successfully",
      });
    } catch (error) {
      console.log("Error deleting the file" + error);
      socket.emit("deleteFileError", {
        success: false,
        data: "Error while deleting the file",
      });
    }
  });

  socket.on("createFolder", async ({ pathToFileFolder }) => {
    try {
      await fs.mkdir(pathToFileFolder);
      socket.emit("createFolderSuccess", {
        success: true,
        data: "Folder created successfully",
      });
    } catch (error) {
      console.log("Error while creating the folder" + error);
      socket.emit("createFolderError", {
        success: false,
        data: "Error while creating the folder ",
      });
    }
  });

  socket.on("deleteFolder", async ({ pathToFileFolder }) => {
    try {
      await fs.rmdir(pathToFileFolder, { recursive: true, force: true });
      socket.emit("deleteFolderSuccess", {
        success: true,
        data: "Folder deleted successfully",
      });
    } catch (error) {
      console.log("Error while deleting the folder" + error);
      socket.emit("deleteFolderError", {
        success: true,
        data: "Error while deleting the folder",
      });
    }
  });

  socket.on("getPort", async ({ containerName }) => {
    const port = await getContainerPort(containerName);
    socket.emit("getPortSuccess", { data: port });
  });

  socket.on("renameFile", async (data) => {
    try {
      const { oldPath, newPath } = data;
      await fs.rename(oldPath, newPath);
      socket.emit("renameFileSuccess", {
        success: true,
        data: {
          oldPath,
          newPath,
        },
      });
    } catch (error) {
      console.error("Error renaming file:", error);
      socket.emit("renameFileError", {
        success: false,
        data: "Error renaming file",
      });
    }
  });
};
