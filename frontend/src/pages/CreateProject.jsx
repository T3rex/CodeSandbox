import useCreateProject from "../hooks/apis/mutations/useCreateProject";

const CreateProject = () => {
  const { createProjectMutate, isPending } = useCreateProject(
    "new_project",
    "react"
  );

  async function handleCreateProject() {
    try {
      await createProjectMutate();
    } catch (error) {}
  }

  return (
    <div>
      <h1>{"Create Project"}</h1>
      <button onClick={handleCreateProject}>{"Create Project"}</button>
      {isPending && <p>{"Creating project..."}</p>}
    </div>
  );
};

export default CreateProject;
