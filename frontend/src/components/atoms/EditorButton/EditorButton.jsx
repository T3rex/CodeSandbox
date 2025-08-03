import "./EditorButton.css";
import useEditorSocketStore from "../../../store/editorSocketStore";
import useActiveFileTabStore from "../../../store/activeFileTabStore";
import { IoMdClose } from "react-icons/io";
import useOpenFileTabsStore from "../../../store/openFilesTabsStore";
import { useCallback, useState } from "react";

function EditorButton({ path, name }) {
  const [isHovered, setIsHovered] = useState(false);
  const { editorSocket } = useEditorSocketStore();
  const { activeFileTab, setActiveFileTab } = useActiveFileTabStore();
  const { removeFileTab, openFileTabs } = useOpenFileTabsStore();

  const isActive = path === activeFileTab?.path;

  const handleOnClick = () => {
    if (editorSocket) {
      editorSocket?.emit("readFile", {
        pathToFileFolder: path,
      });
    }
  };

  const handleClose = useCallback(
    (e) => {
      e.stopPropagation();

      // 1. Snapshot current list and index BEFORE removal
      const tabsBefore = [...openFileTabs];
      const closingIndex = tabsBefore.findIndex((t) => t.path === path);

      // 2. Remove the tab from the store
      removeFileTab({ name, path });

      // 3. If the closed tab wasn’t active, we’re done
      if (path !== activeFileTab?.path) return;

      // 4. Decide the next tab *after* removal
      const remainingTabs = tabsBefore.filter((t) => t.path !== path);

      if (remainingTabs.length) {
        // Prefer the tab to the right; fallback to the one to the left
        const nextTab =
          remainingTabs[closingIndex] ||
          remainingTabs[closingIndex - 1] ||
          remainingTabs[0];

        setActiveFileTab(nextTab);
        editorSocket?.emit("readFile", {
          pathToFileFolder: nextTab.path,
        });
      } else {
        // No tabs left – clear the editor state
        setActiveFileTab(null);
      }
    },
    [
      activeFileTab?.path,
      editorSocket,
      name,
      openFileTabs,
      path,
      removeFileTab,
      setActiveFileTab,
    ]
  );

  return (
    <button
      className={`editor-button`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        color: isActive || isHovered ? "white" : "#718193ff",
        borderTop: isActive ? "2px solid #646cff" : "none",
        borderRight: isActive ? "2px solid #646cff" : "none",
      }}
      onClick={handleOnClick}
    >
      <span>{name}</span>
      {(isActive || isHovered) && <IoMdClose onClick={handleClose} />}
    </button>
  );
}

export default EditorButton;
