import { useParams } from "react-router-dom";
import EditorComponent from "../components/molecules/Editor/EditorComponent.jsx";
import EditorButton from "../components/atoms/EditorButton/EditorButton";
import TreeStructure from "../components/organisms/TreeStructure";
import { useEffect } from "react";
import useTreeStructureStore from "../store/treeStructureStore";

function ProjectPlayground() {
  const { projectId: projectIdFromUrl } = useParams();

  const { setProjectId, projectId } = useTreeStructureStore();

  useEffect(() => {
    setProjectId(projectIdFromUrl);
  }, [, setProjectId, projectIdFromUrl]);
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
