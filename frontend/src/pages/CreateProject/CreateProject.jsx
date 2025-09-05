import { useNavigate, useParams } from "react-router-dom";
import useCreateProject from "../../hooks/apis/mutations/useCreateProject";
import { FaExternalLinkAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./CreateProject.css";
import { useEffect, useState } from "react";
import LoadingStage from "../../components/atoms/LoadingStage/LoadingStage";

const CreateProject = () => {
  let { template } = useParams();
  const [projectName, setProjectName] = useState("");
  const [error, setError] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [showLoading, setShowLoading] = useState(false);
  const { createProjectMutate, isPending, isError } = useCreateProject(
    projectName.split(" ").join("-").toLowerCase() || "my-codebox",
    template
  );
  const navigate = useNavigate();
  const templateName = template.split("-")[1] || template;

  async function handleCreateProject() {
    try {
      if (isPending || showLoading) return;
      if (!projectName.trim()) {
        setError("Project name cannot be empty.");
        return;
      }
      setError(null);

      if (language === "typescript") {
        template = `${template}-ts`;
      }

      setShowLoading(true);
      const response = await createProjectMutate();

      setTimeout(() => {
        setShowLoading(false);
        navigate(`/project/${response.data.projectId}`);
      }, 8000);
    } catch (error) {
      console.error("Error creating project:", error);
      setShowLoading(false); // stop loading if error
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
      {showLoading ? (
        <LoadingStage templateName={templateName} projectName={projectName} />
      ) : (
        <div className="card">
          <h2>New Codebox</h2>
          <p>Template</p>
          <div className="template">
            <img
              width={35}
              src={`/template_logos/${templateName}Logo.png`}
              alt={template}
            />
            <div id="templateName">{templateName}</div>
            <Link to={`/dashboard`} style={{ display: "flex" }}>
              <p>Change</p> <FaExternalLinkAlt className="link" />
            </Link>
          </div>

          <div className="project-name">
            <p>
              Name your project{" "}
              <span style={{ color: "red", fontWeight: "bold" }}> *</span>
            </p>
            <input
              type="text"
              onChange={(e) => setProjectName(e.target.value)}
              value={projectName}
              placeholder={`My ${templateName} app`}
              required
            />
            {
              <p className={{ display: projectName ? "" : "none" }}>
                {projectName.split(" ").join("-").toLowerCase()}
              </p>
            }
            {error && <p className="error">{error}</p>}
            {/* Select language */}
            <div className="language-select">
              <label style={{ marginRight: "10px" }}>
                <input
                  type="radio"
                  name="language"
                  value="javascript"
                  checked={language === "javascript"}
                  onChange={(e) => setLanguage(e.target.value)}
                />{" "}
                JavaScript
              </label>
              <label>
                <input
                  type="radio"
                  name="language"
                  value="typescript"
                  checked={language === "typescript"}
                  onChange={(e) => setLanguage(e.target.value)}
                />{" "}
                TypeScript
              </label>
            </div>
          </div>

          <button
            className="create-project-btn"
            onClick={handleCreateProject}
            disabled={isPending}
          >
            {"Create project"}
          </button>
          {isError && <p>{"Error while creating project."}</p>}
        </div>
      )}
    </div>
  );
};

export default CreateProject;
