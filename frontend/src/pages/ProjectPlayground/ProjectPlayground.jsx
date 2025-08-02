import { useParams } from "react-router-dom";
import EditorComponent from "../../components/molecules/Editor/EditorComponent.jsx";
import EditorButton from "../../components/atoms/EditorButton/EditorButton.jsx";
import TreeStructure from "../../components/organisms/TreeStructure.jsx";
import { useEffect } from "react";
import useTreeStructureStore from "../../store/treeStructureStore.js";
import useEditorSocketStore from "../../store/editorSocketStore.js";
import { io } from "socket.io-client";
import "./ProjectPlayground.css";
import BrowserTerminal from "../../components/molecules/BrowserTerminal/BrowserTerminal.jsx";

function ProjectPlayground() {
  const { projectId: projectIdFromUrl } = useParams();
  const { setProjectId, projectId } = useTreeStructureStore();
  const { setEditorSocket } = useEditorSocketStore();

  useEffect(() => {
    setProjectId(projectIdFromUrl);
    const editorSocketConn = io(`${import.meta.env.VITE_BACKEND_URL}/editor`, {
      query: { projectId: projectIdFromUrl },
    });
    setEditorSocket(editorSocketConn);
  }, [setProjectId, projectIdFromUrl]);

  return (
    <div className="project-playground-container">
      <div className="tree-structure-wrapper">
        {projectId && <TreeStructure />}
      </div>
      <div className="editor-wrapper">
        <div className="editor-buttons">
          <EditorButton isActive={true} />
          <EditorButton isActive={false} />
          <EditorButton isActive={false} />
          <EditorButton isActive={false} />
        </div>
        <EditorComponent />
        <div className="terminal-wrapper">
          <h2
            style={{
              color: "#ffffff",
              margin: 0,
              padding: "10px",
              backgroundColor: "#353333ff",
            }}
          >
            Terminal
          </h2>
          <BrowserTerminal />
        </div>
      </div>
    </div>
  );
}

export default ProjectPlayground;
