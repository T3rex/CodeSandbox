import { useNavigate } from "react-router-dom";
import useCreateProject from "../../hooks/apis/mutations/useCreateProject";
import { getFileIcon } from "../../utils/FileIconUtil";
import { FaExternalLinkAlt } from "react-icons/fa";

import "./CreateProject.css";
import { useEffect, useState } from "react";

const CreateProject = ({ template = "react" }) => {
  const [projectName, setProjectName] = useState("");
  const [error, setError] = useState("");
  const { createProjectMutate, isPending, isError } = useCreateProject(
    projectName.split(" ").join("-").toLowerCase() || "my-app",
    template
  );

  const navigate = useNavigate();

  async function handleCreateProject() {
    try {
      if (!projectName.trim()) {
        setError("Project name cannot be empty.");
        return;
      }
      setError(null);

      const response = await createProjectMutate();
      navigate(`/project/${response.data.projectId}`);
    } catch (error) {
      console.error("Error creating project:", error);
      if (error.response && error.response.data) {
        setError(error.response.data.message || "Failed to create project.");
      } else {
        setError("An unexpected error occurred.");
      }
    }
  }

  useEffect(() => {
    let timer;
    if (error) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        setError("");
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [error]);

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
          <p>
            Name your workspace{" "}
            <span style={{ color: "red", fontWeight: "bold" }}> *</span>
          </p>
          <input
            type="text"
            onChange={(e) => setProjectName(e.target.value)}
            value={projectName}
            placeholder={`My ${template} app`}
            required
          />
          {error && <p className="error">{error}</p>}
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
