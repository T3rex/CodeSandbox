import { useEffect, useState } from "react";
import useTreeStructureStore from "../../store/treeStructureStore";
import TreeNode from "../molecules/Tree/TreeNode";
import useFileContextMenuStore from "../../store/fileContextMenuStore.js";
import FileContextMenu from "../molecules/ContextMenu/FileContextMenu";

function TreeStructure() {
  const { treeStructure, setTreeStructure } = useTreeStructureStore();
  const {
    x: fileContextX,
    y: fileContextY,
    isOpen: isFileContextOpen,
    file,
  } = useFileContextMenuStore();
  useState(false);

  useEffect(() => {
    setTreeStructure();
  }, []);

  return (
    <div
      style={{
        width: "20vw",
        maxWidth: "100%",
        height: "100vh",
        backgroundColor: "rgb(48, 48, 59)",
        padding: "10px",
        boxSizing: "border-box",
        borderRight: "1px solid #ddd",
        display: "flex",
        flexDirection: "column",
        overflowX: "hidden",
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
      {isFileContextOpen && fileContextX && fileContextY && (
        <FileContextMenu x={fileContextX} y={fileContextY} path={file} />
      )}
    </div>
  );
}

export default TreeStructure;
