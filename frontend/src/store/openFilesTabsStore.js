import { create } from "zustand";

const useOpenFileTabsStore = create((set) => {
  return {
    openFileTabs: [],
    addFileTab: (tab) =>
      set((state) => {
        const tabexists = state.openFileTabs.filter((t) => t.path === tab.path);
        if (tabexists.length > 0) {
          return state;
        }
        return {
          openFileTabs: [...state.openFileTabs, tab],
        };
      }),
    removeFileTab: (tab) => {
      console.log("Removing file tab:", tab);
      set((state) => {
        const newTabs = state.openFileTabs.filter((t) => t.path !== tab.path);
        return { openFileTabs: newTabs };
      });
    },
  };
});

export default useOpenFileTabsStore;
