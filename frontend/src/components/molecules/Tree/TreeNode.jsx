import { useEffect, useState, useMemo } from "react";
import { SlArrowRight, SlArrowDown } from "react-icons/sl";
import "./TreeNode.css";
import useEditorSocketStore from "../../../store/editorSocketStore";
import { getFileIcon } from "../../../utils/FileIconUtil.jsx";
import useFileContextMenuStore from "../../../store/fileContextMenuStore.js";
import useOpenFileTabsStore from "../../../store/openFilesTabsStore.js";
import useActiveFileTabStore from "../../../store/activeFileTabStore.js";

function TreeNode({ fileFolderData }) {
  const [visibility, setVisibility] = useState({});

  const sortedChildren = useMemo(() => {
    if (!fileFolderData.children) return [];
    return [
      ...fileFolderData.children.filter((c) => c.children),
      ...fileFolderData.children.filter((c) => !c.children),
    ];
  }, [fileFolderData.children]);

  const { activeFileTab } = useActiveFileTabStore();

  const { editorSocket } = useEditorSocketStore();
  const {
    setFile: setFileContextMenuFile,
    setX: setFileContextMenuX,
    setY: setFileContextMenuY,
    setIsOpen: setFileContextMenuIsOpen,
    file: fileContextMenu,
    isOpen: isFileContextMenuOpen,
    editMode: fileContextMenuEditMode,
    setEditMode: setFileContextMenuEditMode,
  } = useFileContextMenuStore();

  const { addFileTab } = useOpenFileTabsStore();

  const toggleVisibility = (name) => {
    setVisibility((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const handleFileClick = (fileFolderData) => {
    if (editorSocket) {
      editorSocket?.emit("readFile", {
        pathToFileFolder: fileFolderData?.path,
      });
    }
    addFileTab({
      name: fileFolderData.name,
      path: fileFolderData.path,
    });
  };

  const handleContextMenuForFiles = (e, path) => {
    e.preventDefault();
    setFileContextMenuFile(path);
    setFileContextMenuX(e.clientX);
    setFileContextMenuY(e.clientY);
    setFileContextMenuIsOpen(true);
  };

  const handleFileNameChange = (e, fileFolderData) => {
    e.preventDefault();
    const dirName = fileFolderData.path.split("/").slice(0, -1).join("/");
    const newFileName = e.target.value.trim() || fileFolderData.name;
    const newFilePath = dirName + "/" + newFileName;
    if (newFilePath === fileFolderData.path) {
      setFileContextMenuEditMode(false);
      return;
    }
    editorSocket.emit("renameFile", {
      oldPath: fileFolderData.path,
      newPath: newFilePath,
    });
  };

  return (
    <div className="tree-node">
      {fileFolderData.children ? (
        /** Folder**/
        <button
          className="tree-toggle"
          onClick={() => toggleVisibility(fileFolderData.name)}
        >
          {visibility[fileFolderData.name] ? (
            <SlArrowDown className="tree-icon" />
          ) : (
            <SlArrowRight className="tree-icon" />
          )}
          <span>{fileFolderData.name}</span>
        </button>
      ) : (
        /** File**/
        <div
          className={`tree-leaf ${
            activeFileTab?.path == fileFolderData.path
              ? "active-file-highlight"
              : ""
          }   ${
            (fileContextMenu == fileFolderData.path && isFileContextMenuOpen) ||
            (fileContextMenu == fileFolderData.path && fileContextMenuEditMode)
              ? "file-folder-focus"
              : ""
          }`}
          onClick={() => handleFileClick(fileFolderData)}
          onContextMenu={(e) =>
            handleContextMenuForFiles(e, fileFolderData.path)
          }
        >
          <div>{getFileIcon(fileFolderData.name.split(".").pop())}</div>
          <span>
            {fileContextMenuEditMode &&
            fileContextMenu === fileFolderData.path ? (
              <input
                className="rename-input"
                type="text"
                defaultValue={fileFolderData.name}
                // onChange={(e) => handleFileNameChange(e, fileFolderData)}
                onBlur={(e) => {
                  setFileContextMenuEditMode(false);
                  console.log("blur event triggered");
                  handleFileNameChange(e, fileFolderData);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setFileContextMenuEditMode(false);
                    handleFileNameChange(e, fileFolderData);
                  } else if (e.key === "Escape") {
                    setFileContextMenuEditMode(false);
                  }
                }}
                autoFocus
                onFocus={(e) => e.target.select()}
                spellCheck="false"
              />
            ) : (
              fileFolderData.name
            )}
          </span>
        </div>
      )}

      {visibility[fileFolderData.name] &&
        fileFolderData.children &&
        sortedChildren.map((child) => {
          return (
            <div className="tree-children" key={child.name}>
              <TreeNode fileFolderData={child} />
            </div>
          );
        })}
    </div>
  );
}

export default TreeNode;
