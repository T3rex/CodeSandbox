import { create } from "zustand";

const useEditorSocketStore = create((set) => ({
  editorSocket: null,
  setEditorSocket: (incomingSocket) => {
    set({
      editorSocket: incomingSocket,
    });
  },
}));

export default useEditorSocketStore;
