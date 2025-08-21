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
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import NewFileFolderInput from "../../atoms/NewFileFolderInput/NewFileFolderInput.jsx";
import { LuFilePlus2 } from "react-icons/lu";
import { BsFolderPlus } from "react-icons/bs";

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
    setPath: setFileContextMenuFilePath,
    setX: setFileContextMenuX,
    setY: setFileContextMenuY,
    setIsOpen: setFileContextMenuIsOpen,
    path: contextMenuFilePath,
    isOpen: isFileContextMenuOpen,
    editMode: fileContextMenuEditMode,
    setEditMode: setFileContextMenuEditMode,
    action: contextMenuAction,
    setAction: setFileContextMenuAction,
    setIsFolder,
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
    setIsFolder(false);
  };

  const handleContextMenuForFolders = (e, path) => {
    e.preventDefault();
    setFileContextMenuFilePath(path);
    setFileContextMenuX(e.clientX);
    setFileContextMenuY(e.clientY);
    setFileContextMenuIsOpen(true);
    setIsFolder(true);
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
        <>
          <button
            className="tree-toggle"
            onClick={() => toggleVisibility(fileFolderData.name)}
            onContextMenu={(e) => {
              handleContextMenuForFolders(e, fileFolderData.path);
              console.log(fileFolderData.children);
            }}
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
            <span>
              {fileContextMenuEditMode &&
              contextMenuAction === "renameFolder" &&
              contextMenuFilePath === fileFolderData.path ? (
                <RenameInput
                  fileFolderData={fileFolderData}
                  treeStructure={treeStructure}
                  setCollisionPath={setCollisionPath}
                />
              ) : (
                <span className="folder-name">{fileFolderData.name}</span>
              )}
            </span>
            {!fileContextMenuEditMode && (
              <div
                className="folder-actions"
                // style={{ padding: "0 4px", marginRight: " 4px" }}
              >
                <LuFilePlus2
                  size={15}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setFileContextMenuFilePath(fileFolderData.path);
                    setFileContextMenuEditMode(true);
                    setFileContextMenuAction("addFile");
                    setVisibility((prev) => ({
                      ...prev,
                      [fileFolderData.name]: !prev[fileFolderData.name],
                    }));
                  }}
                />
                <BsFolderPlus
                  size={15}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setFileContextMenuFilePath(fileFolderData.path);
                    setFileContextMenuEditMode(true);
                    setFileContextMenuAction("addFolder");
                    setVisibility((prev) => ({
                      ...prev,
                      [fileFolderData.name]: !prev[fileFolderData.name],
                    }));
                  }}
                />
              </div>
            )}
          </button>
          {fileContextMenuEditMode &&
            contextMenuAction !== "renameFolder" &&
            contextMenuFilePath === fileFolderData.path && (
              <div
                className={`${
                  contextMenuAction === "addFolder" ? "tree-children" : ""
                }`}
              >
                <NewFileFolderInput fileFolderData={fileFolderData} />
              </div>
            )}
        </>
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
          {!fileContextMenuEditMode && (
            <div
              className="file-actions"
              style={{ padding: "0 4px", marginRight: "0 4px" }}
            >
              <FaRegEdit
                size={15}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setFileContextMenuFilePath(fileFolderData.path);
                  setFileContextMenuEditMode(true);
                }}
              />
              <RiDeleteBin5Line
                size={15}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  const response = confirm(
                    "File will be permanently deleted. Click cancel to abort."
                  );
                  if (response) {
                    editorSocket?.emit("deleteFile", {
                      pathToFileFolder: fileFolderData.path,
                    });
                  }
                }}
              />
            </div>
          )}
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
