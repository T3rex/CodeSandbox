import Editor from "@monaco-editor/react";
import useEditorSocketStore from "../../../store/editorSocketStore";
import useActiveFileTabStore from "../../../store/activeFileTabStore";
import { data } from "react-router-dom";

function EditorComponent() {
  const handleTheme = (editor, monaco) => {
    import("monaco-themes/themes/Dracula.json").then((data) => {
      monaco.editor.defineTheme("Dracula", data);
      monaco.editor.setTheme("Dracula");
    });
  };
  const { activeFileTab } = useActiveFileTabStore();
  const { editorSocket } = useEditorSocketStore();
  let timer = null;

  //Debounce function to handle changes
  const handleChange = (value) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      const editorContent = value;
      editorSocket.emit("writeFile", {
        data: editorContent,
        pathToFileFolder: activeFileTab?.path,
      });
    }, 2000);
  };

  return (
    <div>
      <Editor
        width="70vw"
        height="100vh"
        defaultLanguage={undefined}
        defaultValue="// Write your code here"
        value={activeFileTab?.value}
        onMount={(editor, monaco) => {
          handleTheme(editor, monaco);
        }}
        onChange={handleChange}
      />
    </div>
  );
}

export default EditorComponent;
