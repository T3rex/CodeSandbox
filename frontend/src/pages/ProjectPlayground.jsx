import { useParams } from "react-router-dom";
import EditorComponent from "../components/molecules/EditorComponent";
import EditorButton from "../components/atoms/EditorButton/EditorButton";

function ProjectPlayground() {
  const { projectId } = useParams();
  return (
    <div>
      <EditorButton isActive={false} />
      <EditorButton isActive={true} />
      <EditorComponent />
    </div>
  );
}

export default ProjectPlayground;
