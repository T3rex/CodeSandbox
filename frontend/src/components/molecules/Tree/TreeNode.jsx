import { useEffect, useState, useMemo } from "react";
import { SlArrowRight, SlArrowDown } from "react-icons/sl";
import "./TreeNode.css";
import useEditorSocketStore from "../../../store/editorSocketStore";
import { setFileIcon } from "../../../utils/FileIconUtil.jsx";
import useFileContextMenuStore from "../../../store/fileContextMenuStore.js";

function TreeNode({ fileFolderData }) {
  const [visibility, setVisibility] = useState({});
  const sortedChildren = useMemo(() => {
    if (!fileFolderData.children) return [];
    return [
      ...fileFolderData.children.filter((c) => c.children),
      ...fileFolderData.children.filter((c) => !c.children),
    ];
  }, [fileFolderData.children]);

  const { editorSocket } = useEditorSocketStore();
  const {
    setFile,
    setX: setFileContextMenuX,
    setY: setFileContextMenuY,
    setIsOpen: setFileContextMenuIsOpen,
  } = useFileContextMenuStore();

  const toggleVisibility = (name) => {
    setVisibility((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const handleFileClick = (fileFolderData) => {
    if (editorSocket) {
      editorSocket?.emit("readFile", {
        pathToFileFolder: fileFolderData?.path,
      });
    }
  };

  const handleContextMenuForFiles = (e, path) => {
    e.preventDefault();
    console.log("Context menu for file:", path);
    setFile(path);
    setFileContextMenuX(e.clientX);
    setFileContextMenuY(e.clientY);
    setFileContextMenuIsOpen(true);
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
          className="tree-leaf"
          onClick={() => handleFileClick(fileFolderData)}
          onContextMenu={(e) =>
            handleContextMenuForFiles(e, fileFolderData.path)
          }
        >
          <div>{setFileIcon(fileFolderData.name.split(".").at(-1))}</div>
          {fileFolderData.name}
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
