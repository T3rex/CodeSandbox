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
        backgroundColor: "rgb(48, 48, 59)",
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
          paddingTop: "1em",
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
