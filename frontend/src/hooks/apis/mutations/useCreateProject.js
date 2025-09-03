import { useMutation } from "@tanstack/react-query";
import { createProjectApi } from "../../../apis/projects";

export default function useCreateProject(
  projectName,
  template,
  description,
  apikey
) {
  const { mutateAsync, isPending, isError, isSuccess, error } = useMutation({
    mutationFn: () => {
      return createProjectApi(projectName, template, description, apikey);
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
