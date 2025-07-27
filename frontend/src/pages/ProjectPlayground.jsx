import { useParams } from "react-router-dom";
import EditorComponent from "../components/molecules/EditorComponent";
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
      <EditorButton isActive={true} />
      <EditorButton isActive={true} />
      <EditorComponent />
      {projectId && <TreeStructure />}
    </div>
  );
}

export default ProjectPlayground;
