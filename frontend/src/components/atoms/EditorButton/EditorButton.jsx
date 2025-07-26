import React from "react";
import "./EditorButton.css";
function EditorButton({ isActive }) {
  return (
    <button
      className={`editor-button`}
      style={{
        color: isActive ? "white" : "#718193ff",
        borderTop: isActive ? "2px solid #646cff" : "none",
        borderRight: isActive ? "2px solid #646cff" : "none",
      }}
    >
      Editor Button
    </button>
  );
}

export default EditorButton;
