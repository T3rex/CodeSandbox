import { create } from "zustand";
import useActiveFileTabStore from "./activeFileTabStore";
import useTreeStructureStore from "./treeStructureStore";
import usePortStore from "./PortStore.js";
import useOpenFileTabsStore from "./openFilesTabsStore.js";

const useEditorSocketStore = create((set) => ({
  editorSocket: null,
  setEditorSocket: (incomingSocket) => {
    set({
      editorSocket: incomingSocket,
    });

    const { setActiveFileTab } = useActiveFileTabStore.getState();

    const { setTreeStructure } = useTreeStructureStore.getState();

    const { setPort } = usePortStore.getState();

    const { addFileTab, removeFileTab } = useOpenFileTabsStore.getState();

    incomingSocket.on("createFileSuccess", () => {
      setTreeStructure();
    });

    incomingSocket?.on("readFileSuccess", ({ path, extension, value }) => {
      // const currentActiveTab = activeFileTab?.path;

      // if (currentActiveTab === undefined || path) {
      const cleanExtension = extension?.split(".").pop() ?? "";
      setActiveFileTab(path, value, cleanExtension);
      // }
    });

    incomingSocket.on("writeFileSuccess", ({ data, success }) => {
      incomingSocket.emit("readFile", {
        pathToFileFolder: useActiveFileTabStore.getState().activeFileTab.path,
      });
    });

    incomingSocket.on("deleteFileSuccess", () => {
      setTreeStructure();
    });

    incomingSocket.on("treeStructureUpdate", () => {
      setTreeStructure();
      console.log("Tree structure updated");
    });

    incomingSocket.on("getPortSuccess", ({ data }) => {
      setPort(data);
    });

    incomingSocket.on("renameFileSuccess", ({ data }) => {
      if (data.isFile) {
        removeFileTab({ path: data.oldPath });
        incomingSocket.emit("readFile", {
          pathToFileFolder: data.newPath,
        });
        addFileTab({
          name: data.newPath.split("/").pop(),
          path: data.newPath,
        });
      }
    });
    incomingSocket.on("createFolderSuccess", () => {
      setTreeStructure();
    });

    incomingSocket.on("deleteFolderSuccess", () => {
      setTreeStructure();
    });
  },
}));

export default useEditorSocketStore;
