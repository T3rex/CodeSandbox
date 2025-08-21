import { useEffect } from "react";
import useEditorSocketStore from "../../../store/editorSocketStore";
import useFileContextMenuStore from "../../../store/fileContextMenuStore";
import "./FileContextMenu.css";

function FileContextMenu({ x, y, path }) {
  const { editorSocket } = useEditorSocketStore();
  const { setIsOpen, setEditMode, isFolder, setAction } =
    useFileContextMenuStore();

  const handleFileDelete = () => {
    if (isFolder) {
      const response = confirm(
        "Folder will be permanently deleted. Click cancel to abort."
      );
      if (response) {
        editorSocket?.emit("deleteFolder", { pathToFileFolder: path });
      }
    } else {
      const response = confirm(
        "File will be permanently deleted. Click cancel to abort."
      );
      if (response) {
        editorSocket?.emit("deleteFile", { pathToFileFolder: path });
      }
    }
    setIsOpen(false);
  };

  const handleFileRename = () => {
    setEditMode(true);
    setIsOpen(false);
    const action = isFolder ? "renameFolder" : "renameFile";
    setAction(action);
  };

  const handleNewFolder = () => {
    setEditMode(true);
    setIsOpen(false);
    setAction("addFolder");
  };

  const handleNewFile = () => {
    setEditMode(true);
    setIsOpen(false);
    setAction("addFile");
  };

  return (
    <div
      className="context-menu"
      style={{
        left: x,
        top: y,
      }}
      onMouseLeave={() => setIsOpen(false)}
    >
      {isFolder && (
        <div>
          <button onClick={handleNewFolder}>New Folder</button>
          <button onClick={handleNewFile}>New File</button>
        </div>
      )}
      <button onClick={handleFileRename}>
        {isFolder ? "Rename Folder" : "Rename File"}
      </button>
      <button onClick={handleFileDelete} style={{ color: "red" }}>
        {isFolder ? "Delete Folder" : "Delete File"}
      </button>
    </div>
  );
}

export default FileContextMenu;
