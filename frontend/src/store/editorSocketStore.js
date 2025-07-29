import { create } from "zustand";
import useActiveFileTabStore from "./activeFileTabStore";

const useEditorSocketStore = create((set) => ({
  editorSocket: null,
  setEditorSocket: (incomingSocket) => {
    const { activeFileTab, setActiveFileTab } =
      useActiveFileTabStore.getState();
    /*listens for  readFileSuccessevents AND updates the active file tab 
    IF the current active tab is undefined or the path matches */
    incomingSocket?.on("readFileSuccess", ({ path, extension, value }) => {
      const currentActiveTab = activeFileTab?.path;

      if (currentActiveTab === undefined || path) {
        const cleanExtension = extension?.split(".").at(-1) ?? "";
        setActiveFileTab(path, value, cleanExtension);
      }
    });

    incomingSocket.on("writeFileSuccess", ({ data, success }) => {
      incomingSocket.emit("readFile", {
        pathToFileFolder: useActiveFileTabStore.getState().activeFileTab.path,
      });
    });
    set({
      editorSocket: incomingSocket,
    });
  },
}));

export default useEditorSocketStore;
