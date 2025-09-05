import { useEffect, useState } from "react";
import "./LoadingStage.css";

const messages = [
  "Initializing Codebox...",
  "Setting Environment...",
  "Installing Dependencies...",
  "Starting Development Server...",
  "Almost There...",
];

function LoadingStage({ templateName, projectName }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => {
        return (prev + 1) % messages.length;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className="template">
        <img
          width={35}
          src={`/template_logos/${templateName}Logo.png`}
          alt={templateName}
        />

        <div id="templateName" style={{ color: "#61DAFB" }}>
          {templateName}
        </div>
        <div className="projectName">{projectName || "my-codebox"}</div>
      </div>
      <div className="loader-container">
        <span className="loader"></span>
        <div key={index} className="loadingMessage">
          {messages[index]}
        </div>
      </div>
    </div>
  );
}

export default LoadingStage;
