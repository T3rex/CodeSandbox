import { create } from "zustand";

const useTerminalSocketStore = create((set) => {
  return {
    terminalSocket: null,
    setTerminalSocket: (incomingSocket) => {
      set({ terminalSocket: incomingSocket });
    },
  };
});

export default useTerminalSocketStore;
