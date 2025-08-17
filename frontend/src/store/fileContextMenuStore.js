import { create } from "zustand";

const useFileContextMenuStore = create((set) => ({
  x: null,
  y: null,
  isOpen: false,
  path: null,
  e: null,
  editMode: false,
  isFolder: false,
  setEditMode: (incomingEditMode) => {
    set({ editMode: incomingEditMode });
  },
  setE: (incomingE) => {
    set({ e: incomingE });
  },
  setX: (incomingX) => {
    set({ x: incomingX });
  },
  setY: (incomingY) => {
    set({ y: incomingY });
  },
  setIsOpen: (incomingIsOpen) => {
    set({ isOpen: incomingIsOpen });
  },
  setPath: (incomingFile) => {
    set({ path: incomingFile });
  },
  setIsFolder: (incomingIsFolder) => {
    set({ isFolder: incomingIsFolder });
  },
}));

export default useFileContextMenuStore;
