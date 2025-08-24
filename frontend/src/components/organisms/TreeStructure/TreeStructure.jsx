import { useEffect, useState } from "react";
import useTreeStructureStore from "../../../store/treeStructureStore.js";
import TreeNode from "../../molecules/Tree/TreeNode.jsx";
import useFileContextMenuStore from "../../../store/fileContextMenuStore.js";
import FileContextMenu from "../../molecules/ContextMenu/FileContextMenu.jsx";

function TreeStructure() {
  const { treeStructure, setTreeStructure } = useTreeStructureStore();
  const {
    x: fileContextX,
    y: fileContextY,
    isOpen: isFileContextOpen,
    path,
  } = useFileContextMenuStore();
  useState(false);

  useEffect(() => {
    setTreeStructure();
  }, []);

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "100%",
        height: "100%",
        backgroundColor: "#252526",
        borderRight: "1px solid #ddd",
        display: "flex",
        flexDirection: "column",
        overflowX: "hidden",
        position: "relative",
        top: 0,
      }}
    >
      <div
        style={{
          fontWeight: "bold",
          marginBottom: "5px",
          fontSize: "18px",
          textAlign: "Center",
          boxSizing: "border-box",
          backgroundColor: "#1e1e1e",
          borderBottom: "1px solid #ddd",
          height: "2em",
          lineHeight: "1em",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "105%",
        }}
      >
        Explorer
      </div>
      {treeStructure && <TreeNode fileFolderData={treeStructure} />}
      {isFileContextOpen && fileContextX && fileContextY && (
        <FileContextMenu x={fileContextX} y={fileContextY} path={path} />
      )}
    </div>
  );
}

export default TreeStructure;
// rgb(16 16 27)
