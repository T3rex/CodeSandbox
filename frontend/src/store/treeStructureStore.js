import { create } from "zustand";
import { QueryClient } from "@tanstack/react-query";
import { getProjectTreeApi } from "../apis/projects";

const useTreeStructureStore = create((set, get) => {
  const queryClient = new QueryClient();
  return {
    projectId: null,
    treeStructure: null,
    setTreeStructure: async () => {
      const id = get().projectId;
      const response = await queryClient.fetchQuery({
        queryKey: [`projecttree-${id}`],
        queryFn: () => getProjectTreeApi(id),
      });
      set({
        treeStructure: response.data,
      });
    },
    setProjectId: (projectId) => {
      set({ projectId: projectId });
    },
  };
});

export default useTreeStructureStore;
