import { useNavigate } from "react-router-dom";
import useCreateProject from "../../hooks/apis/mutations/useCreateProject";
import { getFileIcon } from "../../utils/FileIconUtil";
import { FaExternalLinkAlt } from "react-icons/fa";

import "./CreateProject.css";

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
    <div className="container">
      <div className="card">
        <h2>New Workspace</h2>
        <p>Template</p>
        <div className="template">
          <div>{getFileIcon("react")}</div>
          <div id="templateName"> React</div>
          <p>Change</p> <FaExternalLinkAlt className="link" />
        </div>

        <div className="project-name">
          <p>Name your workspace</p>
          <input type="text" />
        </div>

        <button
          className="create-project-btn"
          onClick={handleCreateProject}
          disabled={isPending}
        >
          {"Create Project"}
        </button>
        {isPending && <p>{"Creating project..."}</p>}
        {isError && <p>{"Error while creating project."}</p>}
      </div>
    </div>
  );
};

export default CreateProject;
