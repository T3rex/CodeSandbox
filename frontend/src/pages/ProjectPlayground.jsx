import { useParams } from "react-router-dom";
import EditorComponent from "../components/molecules/Editor/EditorComponent.jsx";
import EditorButton from "../components/atoms/EditorButton/EditorButton";
import TreeStructure from "../components/organisms/TreeStructure";
import { useEffect } from "react";
import useTreeStructureStore from "../store/treeStructureStore";
import useEditorSocketStore from "../store/editorSocketStore.js";
import { io } from "socket.io-client";

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
    <div>
      <div style={{ display: "flex" }}>
        {projectId && <TreeStructure />}
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "start",
              marginLeft: "",
              backgroundColor: "#39354dff",
              marginBottom: "5px",
            }}
          >
            <EditorButton isActive={true} />
            <EditorButton isActive={false} />
            <EditorButton isActive={false} />
            <EditorButton isActive={false} />
          </div>
          <EditorComponent />
        </div>
      </div>
    </div>
  );
}

export default ProjectPlayground;
