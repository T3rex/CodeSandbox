import { getProjectTreeApi } from "../../../apis/projects";

export const useProjectTree = (projectId) => {
  const { isLoading, isError, data, error } = useQuery({
    queryFn: () => getProjectTreeApi(projectId),
  });
  return { isLoading, isError, data, error };
};
