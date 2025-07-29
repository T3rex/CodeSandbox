import { create } from "zustand";
import useActiveFileTabStore from "./activeFileTabStore";
import useTreeStructureStore from "./treeStructureStore";

const useEditorSocketStore = create((set) => ({
  editorSocket: null,
  setEditorSocket: (incomingSocket) => {
    const { activeFileTab, setActiveFileTab } =
      useActiveFileTabStore.getState();

    const { setTreeStructure } = useTreeStructureStore.getState();

    incomingSocket?.on("readFileSuccess", ({ path, extension, value }) => {
      const currentActiveTab = activeFileTab?.path;

      if (currentActiveTab === undefined || path) {
        const cleanExtension = extension?.split(".").pop() ?? "";
        setActiveFileTab(path, value, cleanExtension);
      }
    });

    incomingSocket.on("writeFileSuccess", ({ data, success }) => {
      incomingSocket.emit("readFile", {
        pathToFileFolder: useActiveFileTabStore.getState().activeFileTab.path,
      });
    });

    incomingSocket.on("deleteFileSuccess", () => {
      setTreeStructure();
    });
    set({
      editorSocket: incomingSocket,
    });
  },
}));

export default useEditorSocketStore;
