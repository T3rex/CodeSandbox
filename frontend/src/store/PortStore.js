import { create } from "zustand";

const usePortStore = create((set, get) => ({
  port: null,
  setPort: (incomingPort) => {
    set({ port: incomingPort });
    console.log("Port set in store:", get().port);
  },
}));

export default usePortStore;
