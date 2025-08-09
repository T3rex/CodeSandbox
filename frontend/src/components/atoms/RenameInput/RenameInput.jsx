import React from "react";
import { hasNameCollision } from "../../../utils/TreeUtils";
import useFileContextMenuStore from "../../../store/fileContextMenuStore";
import useTreeStructureStore from "../../../store/treeStructureStore";
import useEditorSocketStore from "../../../store/editorSocketStore";

function RenameInput({ fileFolderData, setCollisionPath }) {
  const { setEditMode } = useFileContextMenuStore();
  const { treeStructure } = useTreeStructureStore();
  const { editorSocket } = useEditorSocketStore();

  const handleFileNameChange = (e, fileFolderData) => {
    e.preventDefault();
    const dirName = fileFolderData.path.split("/").slice(0, -1).join("/");
    const newFileName = e.target.value.trim() || fileFolderData.name;
    const newFilePath = dirName + "/" + newFileName;
    if (newFilePath === fileFolderData.path) {
      setEditMode(false);
      return;
    }
    const collision = hasNameCollision(newFileName, dirName, treeStructure);
    if (collision) {
      setCollisionPath(fileFolderData.path);
      console.log("File name collision detected", collision);
      return;
    }
    setCollisionPath("");
    setEditMode(false);
    editorSocket?.emit("renameFile", {
      oldPath: fileFolderData.path,
      newPath: newFilePath,
    });
  };
  return (
    <input
      className="rename-input"
      type="text"
      defaultValue={fileFolderData.name}
      onBlur={(e) => {
        handleFileNameChange(e, fileFolderData);
      }}
      onChange={(e) => {
        const newFileName = e.target.value.trim();
        if (newFileName === fileFolderData.name) {
          return;
        }
        const collision = hasNameCollision(
          newFileName,
          fileFolderData.path.split("/").slice(0, -1).join("/"),
          treeStructure
        );
        setCollisionPath(collision ? fileFolderData.path : "");
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          handleFileNameChange(e, fileFolderData);
        } else if (e.key === "Escape") {
          setEditMode(false);
        }
      }}
      onFocus={(e) => e.target.select()}
      autoFocus
      spellCheck="false"
    />
  );
}

export default RenameInput;
