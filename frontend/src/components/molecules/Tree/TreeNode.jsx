import "./TreeNode.css";
import { useState, useMemo, useEffect } from "react";
import { SlArrowRight, SlArrowDown } from "react-icons/sl";
import { getFileIcon } from "../../../utils/FileIconUtil.jsx";
import RenameInput from "../../atoms/RenameInput/RenameInput.jsx";
import useEditorSocketStore from "../../../store/editorSocketStore";
import useFileContextMenuStore from "../../../store/fileContextMenuStore.js";
import useOpenFileTabsStore from "../../../store/openFilesTabsStore.js";
import useActiveFileTabStore from "../../../store/activeFileTabStore.js";
import useTreeStructureStore from "../../../store/treeStructureStore.js";
import { IoFolder, IoFolderOpenOutline } from "react-icons/io5";

function TreeNode({ fileFolderData }) {
  const [visibility, setVisibility] = useState({});
  const [collisionPath, setCollisionPath] = useState("");

  const sortedChildren = useMemo(() => {
    if (!fileFolderData.children) return [];
    return [
      ...fileFolderData.children.filter((c) => c.children),
      ...fileFolderData.children.filter((c) => !c.children),
    ];
  }, [fileFolderData.children]);

  const { activeFileTab } = useActiveFileTabStore();

  const { treeStructure, projectId } = useTreeStructureStore();

  const { editorSocket } = useEditorSocketStore();
  const {
    setFile: setFileContextMenuFilePath,
    setX: setFileContextMenuX,
    setY: setFileContextMenuY,
    setIsOpen: setFileContextMenuIsOpen,
    file: contextMenuFilePath,
    isOpen: isFileContextMenuOpen,
    editMode: fileContextMenuEditMode,
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
    setFileContextMenuFilePath(path);
    setFileContextMenuX(e.clientX);
    setFileContextMenuY(e.clientY);
    setFileContextMenuIsOpen(true);
  };

  useEffect(() => {
    if (fileFolderData.name === projectId) {
      setVisibility((prev) => ({ ...prev, [fileFolderData.name]: true }));
    }
  }, []);

  return (
    <div className="tree-node">
      {fileFolderData.children ? (
        /** Folder**/
        <button
          className="tree-toggle"
          onClick={() => toggleVisibility(fileFolderData.name)}
        >
          {visibility[fileFolderData.name] ? (
            <span className="folder-icon">
              <SlArrowDown className="tree-icon" />
              {fileFolderData.name !== projectId && (
                <IoFolderOpenOutline color="#2196f3" size={18} />
              )}
            </span>
          ) : (
            <span>
              <SlArrowRight className="tree-icon" />
              {fileFolderData.name !== projectId && (
                <IoFolder color="#2196f3" size={18} />
              )}
            </span>
          )}
          <span className="folder-name">{fileFolderData.name}</span>
        </button>
      ) : (
        /** File**/
        <div
          className={`tree-leaf ${
            activeFileTab?.path == fileFolderData.path
              ? "active-file-highlight"
              : ""
          }   ${
            (contextMenuFilePath == fileFolderData.path &&
              isFileContextMenuOpen) ||
            (contextMenuFilePath == fileFolderData.path &&
              fileContextMenuEditMode)
              ? "file-folder-focus"
              : ""
          } ${
            collisionPath == fileFolderData.path && fileContextMenuEditMode
              ? "file-collision"
              : ""
          }  `}
          onClick={() => handleFileClick(fileFolderData)}
          onContextMenu={(e) =>
            handleContextMenuForFiles(e, fileFolderData.path)
          }
        >
          <div className="leaf-icon">
            {getFileIcon(fileFolderData.name.split(".").pop())}
          </div>
          <span>
            {fileContextMenuEditMode &&
            contextMenuFilePath === fileFolderData.path ? (
              <RenameInput
                fileFolderData={fileFolderData}
                treeStructure={treeStructure}
                setCollisionPath={setCollisionPath}
              />
            ) : (
              <span>{fileFolderData.name}</span>
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
