import Editor from "@monaco-editor/react";
import useEditorSocketStore from "../../../store/editorSocketStore";
import useActiveFileTabStore from "../../../store/activeFileTabStore";
import { data } from "react-router-dom";
import { extensionToFiletype } from "../../../utils/extensionToFiletype";

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
        width="100%"
        height="100vh"
        defaultLanguage={undefined}
        language={extensionToFiletype(activeFileTab?.extension)}
        defaultValue="// Write your code here"
        value={activeFileTab?.value}
        onMount={(editor, monaco) => {
          handleTheme(editor, monaco);
        }}
        onChange={handleChange}
        options={{
          fontSize: 16,
          minimap: {
            enabled: true,
            showSlider: "mouseover",
            side: "right",
            scale: 1.2,
            size: "proportional",
            renderCharacters: true,
            showOverflow: true,
            maxColumn: 120,
            alwaysShowScrollbar: false,
            scrollbar: {
              useShadows: true,
              verticalHasArrows: false,
              horizontalHasArrows: false,
              arrowSize: 11,
              vertical: "visible",
              horizontal: "visible",
            },
          },
          scrollBeyondLastLine: true,
          automaticLayout: true,
          wordWrap: "on",
          lineNumbersMinChars: 4,
          renderLineHighlight: "all",
          contextmenu: true,
          tabSize: 2,
          formatOnType: true,
          formatOnPaste: true,
          fontFamily: "Fira Code, monospace",
          fontLigatures: true,
          lineDecorationsWidth: 10,
          lineNumbers: "on",
          glyphMargin: true,
          folding: true,
          foldingStrategy: "auto",
          renderWhitespace: "all",
          renderControlCharacters: true,
          overviewRulerLanes: 3,
          overviewRulerBorder: true,
          overviewRulerColor: "#000000",
          selectionHighlight: true,
          cursorBlinking: "smooth",
          cursorSmoothCaretAnimation: true,
          cursorStyle: "line",
        }}
      />
    </div>
  );
}

export default EditorComponent;
