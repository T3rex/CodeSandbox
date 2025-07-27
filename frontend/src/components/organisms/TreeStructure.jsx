import { useEffect } from "react";
import useTreeStructureStore from "../../store/treeStructureStore";

function TreeStructure() {
  const { treeStructure, setTreeStructure } = useTreeStructureStore();

  useEffect(() => {
    setTreeStructure();
  }, []);

  return <div>TreeStructure</div>;
}

export default TreeStructure;
