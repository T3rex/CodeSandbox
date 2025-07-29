import Editor from "@monaco-editor/react";
import useEditorSocketStore from "../../../store/editorSocketStore";
import { useEffect } from "react";
import useActiveFileTabStore from "../../../store/activeFileTabStore";

function EditorComponent() {
  const handleTheme = (editor, monaco) => {
    import("monaco-themes/themes/Dracula.json").then((data) => {
      monaco.editor.defineTheme("Dracula", data);
      monaco.editor.setTheme("Dracula");
    });
  };

  const { editorSocket } = useEditorSocketStore();
  const { activeFileTab, setActiveFileTab } = useActiveFileTabStore();

  useEffect(() => {
    editorSocket?.on(
      "readFileSuccess",
      ({ path, extension, value, success }) => {
        if (success) {
          extension = extension.split(".").at(-1);
          setActiveFileTab(path, value, extension);
        }
      }
    );
    return () => {
      editorSocket?.off("readFileSuccess");
    };
  }, [editorSocket]);

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
      />
    </div>
  );
}

export default EditorComponent;
