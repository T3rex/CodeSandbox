import { create } from "zustand";
import useActiveFileTabStore from "./activeFileTabStore";

const useEditorSocketStore = create((set) => ({
  editorSocket: null,
  setEditorSocket: (incomingSocket) => {
    const activeFileTabSetter =
      useActiveFileTabStore.getState().setActiveFileTab;

    incomingSocket?.on(
      "readFileSuccess",
      ({ path, extension, value, success }) => {
        console.log("File content:", value);
        if (success) {
          extension = extension.split(".").at(-1);
          activeFileTabSetter(path, value, extension);
        } else {
          console.error("Failed to read file:", value);
        }
      }
    );
    set({
      editorSocket: incomingSocket,
    });
  },
}));

export default useEditorSocketStore;
