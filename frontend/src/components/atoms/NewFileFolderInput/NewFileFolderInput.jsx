import { useEffect, useState } from "react";
import { IoFolder } from "react-icons/io5";
import { SlArrowRight } from "react-icons/sl";
import useFileContextMenuStore from "../../../store/fileContextMenuStore";
import useEditorSocketStore from "../../../store/editorSocketStore";
import { hasNameCollision } from "../../../utils/TreeUtils";
import { FaFileCode } from "react-icons/fa";

function NewFileFolderInput({ fileFolderData }) {
  const { setEditMode, setAction, action } = useFileContextMenuStore();
  const { editorSocket } = useEditorSocketStore();
  const [collision, setCollision] = useState(false);

  const handleCreateNewFileFolder = (e, fileFolderData) => {
    if (action === "addFolder") {
      editorSocket?.emit("createFolder", {
        name: e.target.value,
        parent: fileFolderData.path,
      });
    } else if (action === "addFile") {
      editorSocket?.emit("createFile", {
        name: e.target.value,
        parent: fileFolderData.path,
      });
    }
    setEditMode(false);
    setAction(null);
  };

  return (
    <div
      className={`new-fileFolder tree-leaf ${
        collision ? "file-collision" : ""
      }`}
    >
      {action === "addFolder" && <SlArrowRight className="tree-icon" />}
      <div>
        {action === "addFolder" && <IoFolder color="#2196f3" size={18} />}
        {action === "addFile" && <FaFileCode size={20} color="#6C757D" />}
      </div>
      <input
        type="text"
        autoFocus
        spellCheck="false"
        onChange={(e) => {
          let newFolder = e.target.value.trim();
          if (
            hasNameCollision(newFolder, fileFolderData.path, fileFolderData)
          ) {
            setCollision(true);
          } else {
            setCollision(false);
          }
        }}
        onBlur={(e) => {
          if (e.target.value.trim() === "") {
            setEditMode(false);
          } else {
            handleCreateNewFileFolder(e, fileFolderData);
          }
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleCreateNewFileFolder(e, fileFolderData);
          } else if (e.key === "Escape") {
            setEditMode(false);
          }
        }}
      />
    </div>
  );
}

export default NewFileFolderInput;
