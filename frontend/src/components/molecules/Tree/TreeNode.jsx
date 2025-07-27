import { useEffect, useState, useMemo } from "react";
import { SlArrowRight, SlArrowDown } from "react-icons/sl";
import "./TreeNode.css";

function TreeNode({ fileFolderData }) {
  const [visibility, setVisibility] = useState({});
  const sortedChildren = useMemo(() => {
    if (!fileFolderData.children) return [];
    return [
      ...fileFolderData.children.filter((c) => c.children),
      ...fileFolderData.children.filter((c) => !c.children),
    ];
  }, [fileFolderData.children]);

  const toggleVisibility = (name) => {
    setVisibility((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <div className="tree-node">
      {fileFolderData.children ? (
        <button
          className="tree-toggle"
          onClick={() => toggleVisibility(fileFolderData.name)}
        >
          {visibility[fileFolderData.name] ? (
            <SlArrowDown className="tree-icon" />
          ) : (
            <SlArrowRight className="tree-icon" />
          )}
          {fileFolderData.name}
        </button>
      ) : (
        <div className="tree-leaf">{fileFolderData.name}</div>
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
