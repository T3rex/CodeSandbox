import useEditorSocketStore from "../../../store/editorSocketStore";
import useFileContextMenuStore from "../../../store/fileContextMenuStore";
import "./FileContextMenu.css";

function FileContextMenu({ x, y, path }) {
  const { editorSocket } = useEditorSocketStore();

  const handleFileDelete = () => {
    editorSocket.emit("deleteFile", { pathToFileFolder: path });
  };

  const { setIsOpen } = useFileContextMenuStore();
  return (
    <div
      className="context-menu"
      style={{
        left: x,
        top: y,
      }}
      onMouseLeave={() => {
        setIsOpen(false);
        console.log("mouseLeave");
      }}
    >
      <button onClick={handleFileDelete}>Delete File</button>
      <button>Rename File</button>
    </div>
  );
}

export default FileContextMenu;
