import { useNavigate } from "react-router-dom";
import useCreateProject from "../../hooks/apis/mutations/useCreateProject";

const CreateProject = () => {
  const { createProjectMutate, isPending, isError } = useCreateProject(
    "new_project",
    "react"
  );

  const navigate = useNavigate();

  async function handleCreateProject() {
    try {
      const response = await createProjectMutate();
      navigate(`/project/${response.data.projectId}`);
    } catch (error) {}
  }

  return (
    <div>
      <h1>{"Create Project"}</h1>
      <button onClick={handleCreateProject} disabled={isPending}>
        {"Create Project"}
      </button>
      {isPending && <p>{"Creating project..."}</p>}
      {isError && <p>{"Error creating project."}</p>}
    </div>
  );
};

export default CreateProject;
