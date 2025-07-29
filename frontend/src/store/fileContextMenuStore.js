import { create } from "zustand";

const useFileContextMenuStore = create((set) => ({
  x: null,
  y: null,
  isOpen: false,
  file: null,
  setX: (incomingX) => {
    set({ x: incomingX });
  },
  setY: (incomingY) => {
    set({ y: incomingY });
  },
  setIsOpen: (incomingIsOpen) => {
    set({ isOpen: incomingIsOpen });
  },
  setFile: (incomingFile) => {
    set({ file: incomingFile });
  },
}));

export default useFileContextMenuStore;
