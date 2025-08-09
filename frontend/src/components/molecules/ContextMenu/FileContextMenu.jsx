import { useEffect } from "react";
import useEditorSocketStore from "../../../store/editorSocketStore";
import useFileContextMenuStore from "../../../store/fileContextMenuStore";
import "./FileContextMenu.css";

function FileContextMenu({ x, y, path }) {
  const { editorSocket } = useEditorSocketStore();
  const { setIsOpen, setEditMode } = useFileContextMenuStore();

  const handleFileDelete = () => {
    editorSocket.emit("deleteFile", { pathToFileFolder: path });
  };

  const handleFileRename = () => {
    setEditMode(true);
    setIsOpen(false);
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
      <button onClick={handleFileDelete}>Delete File</button>
      <button onClick={handleFileRename}>Rename File</button>
    </div>
  );
}

export default FileContextMenu;
