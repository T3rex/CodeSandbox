import { useMutation } from "@tanstack/react-query";
import { createProjectApi } from "../../../apis/projects";

export default function useCreateProject(projectName, template) {
  const { mutateAsync, isPending, isError, isSuccess, error } = useMutation({
    mutationFn: () => {
      return createProjectApi(projectName, template);
    },
    onError: (error) => {
      console.error("Error creating project:", error);
    },
    onSuccess: (data) => {
      console.log("Project created successfully:", data);
    },
  });
  return {
    createProjectMutate: mutateAsync,
    isPending,
    isError,
    isSuccess,
    error,
  };
}
