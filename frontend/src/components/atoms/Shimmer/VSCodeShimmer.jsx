import React from "react";
import "./VSCodeShimmer.css";

const VSCodeShimmer = () => {
  return (
    <div className="vscode-layout">
      {/* Sidebar */}
      <div className="sidebar">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="sidebar-icon shimmer"></div>
        ))}
      </div>

      {/* File Explorer */}
      <div className="explorer">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="explorer-item shimmer"></div>
        ))}
      </div>

      {/* Main Workspace (Editor + Preview stacked vertically) */}
      <div className="workspace">
        <div className="main-panels">
          {/* Editor */}
          <div className="editor">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="editor-line shimmer"></div>
            ))}
          </div>

          {/* Preview */}
          <div className="preview">
            <div className="preview-box shimmer"></div>
          </div>
        </div>

        {/* Terminal at bottom */}
        <div className="terminal">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="terminal-line shimmer"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VSCodeShimmer;
