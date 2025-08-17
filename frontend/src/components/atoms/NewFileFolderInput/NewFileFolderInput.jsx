import React from "react";
import { IoFolder } from "react-icons/io5";
import { SlArrowRight } from "react-icons/sl";
import useFileContextMenuStore from "../../../store/fileContextMenuStore";
import useEditorSocketStore from "../../../store/editorSocketStore";

function NewFileFolderInput({ fileFolderData }) {
  const { setEditMode, setIsOpen } = useFileContextMenuStore();
  const { editorSocket } = useEditorSocketStore();

  const handleCreateNewFileFolder = (e, fileFolderData) => {
    editorSocket?.emit("createFolder", {
      name: e.target.value,
      parent: fileFolderData.path,
    });
    setEditMode(false);
  };

  return (
    <div className="new-fileFolder tree-leaf">
      <SlArrowRight className="tree-icon" />
      <IoFolder color="#2196f3" size={22} />
      <input
        type="text"
        autoFocus
        spellCheck="false"
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
