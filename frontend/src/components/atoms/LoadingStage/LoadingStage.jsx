import { useEffect, useState } from "react";
import "./LoadingStage.css";

const messages = [
  "Booting up the Codebox...",
  "Configuring your environment...",
  "Installing dependencies...",
  "Warming up the dev server...",
  "Almost ready to launch...",
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
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        className="template"
        style={{ width: "fit-content", marginBottom: "20px" }}
      >
        <img
          width={35}
          src={`/template_logos/${templateName}Logo.png`}
          alt={templateName}
        />

        <div id="templateName">{templateName}</div>
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
