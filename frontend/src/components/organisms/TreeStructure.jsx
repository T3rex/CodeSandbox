import { useEffect } from "react";
import useTreeStructureStore from "../../store/treeStructureStore";
import TreeNode from "../molecules/Tree/TreeNode";

function TreeStructure() {
  const { treeStructure, setTreeStructure } = useTreeStructureStore();

  useEffect(() => {
    setTreeStructure();
  }, []);

  return (
    <div style={{ width: "300px", maxWidth: "100%", overflowX: "auto" }}>
      TreeStructure
      {treeStructure && <TreeNode fileFolderData={treeStructure} />}
    </div>
  );
}

export default TreeStructure;
