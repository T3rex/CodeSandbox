import { create } from "zustand";

const usePortStore = create((set, get) => ({
  port: null,
  setPort: (incomingPort) => {
    set({ port: incomingPort });
  },
}));

export default usePortStore;
