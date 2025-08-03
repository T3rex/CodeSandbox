import React from "react";
import "./EditorButton.css";
import useEditorSocketStore from "../../../store/editorSocketStore";
import useActiveFileTabStore from "../../../store/activeFileTabStore";
function EditorButton({ path, name }) {
  const { editorSocket } = useEditorSocketStore();
  const { activeFileTab } = useActiveFileTabStore();
  const handleOnClick = () => {
    if (editorSocket) {
      editorSocket?.emit("readFile", {
        pathToFileFolder: path,
      });
    }
  };

  return (
    <button
      className={`editor-button`}
      style={{
        color: path === activeFileTab?.path ? "white" : "#718193ff",
        borderTop: path === activeFileTab?.path ? "2px solid #646cff" : "none",
        borderRight:
          path === activeFileTab?.path ? "2px solid #646cff" : "none",
      }}
      onClick={handleOnClick}
    >
      {name}
    </button>
  );
}

export default EditorButton;
