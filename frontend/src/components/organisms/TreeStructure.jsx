import { useEffect } from "react";
import useTreeStructureStore from "../../store/treeStructureStore";
import TreeNode from "../molecules/Tree/TreeNode";

function TreeStructure() {
  const { treeStructure, setTreeStructure } = useTreeStructureStore();

  useEffect(() => {
    setTreeStructure();
  }, []);

  return (
    <div
      style={{
        width: "300px",
        maxWidth: "100%",
        overflowX: "hidden",
        height: "100vh",
        backgroundColor: "rgb(48, 48, 59)",
        padding: "10px",
        boxSizing: "border-box",
        borderRight: "1px solid #ddd",
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
        position: "sticky",
        top: 0,
      }}
    >
      <div
        style={{
          fontWeight: "bold",
          marginBottom: "5px",
          fontSize: "18px",
          textAlign: "Center",
        }}
      >
        Explorer
      </div>
      {treeStructure && <TreeNode fileFolderData={treeStructure} />}
    </div>
  );
}

export default TreeStructure;
