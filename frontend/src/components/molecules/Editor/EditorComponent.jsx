{/* prettier-ignore */}
import Editor from "@monaco-editor/react";
import useEditorSocketStore from "../../../store/editorSocketStore";
import useActiveFileTabStore from "../../../store/activeFileTabStore";
import { extensionToFiletype } from "../../../utils/extensionToFiletype";
import { useEffect, useRef } from "react";

// Removed invalid and unused 'default' variable declaration
const defaultValue = String.raw`
       /\\\\\\\\\                        /\\\   /\\\\\\\\\\\\\\\           
      /\\\////////                       \/\\\  \/\\\///////////      
     /\\\/                                \/\\\  \/\\\      
     /\\\                 /\\\\\           \/\\\  \/\\\\\\\\\\\      /\\\    /\\\      
     \/\\\               /\\\///\\\    /\\\\\\\\\  \/\\\///////      \///\\\/\\\/    
      \//\\\             /\\\  \//\\\  /\\\////\\\  \/\\\               \///\\\/   
        \///\\\          \//\\\  /\\\  \/\\\  \/\\\  \/\\\                /\\\/\\\  
           \////\\\\\\\\\  \///\\\\\/   \//\\\\\\\/\\ \/\\\\\\\\\\\\\\\  /\\\/\///\\\ 
               \/////////     \/////      \///////\//  \///////////////  \///    \///

    +-------------------------------------------------------------------------------+
    |                                                                               |
    |                  Welcome to CodEx — Code Without Limits                       |
    |                                                                               |
    |  # CodEx is a powerful online code editor that offers a seamless coding       |
    |    experience — no local setup required.                                      |
    |                                                                               |
    |  # It's a cloud-based tool for developers who want to code, test, and share   |
    |    instantly. Think of it as your personal coding playground — no install.    |
    |                                                                               |
    |          🚀 Start building your ideas right from the browser!                 |
    |                                                                               |
    |                              Key Features                                     |
    |                                                                               |
    |    👌  Zero-Setup           → Start coding immediately in the browser         |
    |    📦  Sandboxed Sessions   → Isolated, safe coding environments              |
    |    ▶️  Live App Preview     → Preview your app live with inbuilt browser      |  
    |    🔗  Real-Time Sync       → Auto-save and collaborate via WebSockets        |
    |    🖥️  Interactive Terminal → Execute commands in a live terminal             |
    |    📝  Multi-File Tabs      → Edit multiple files simultaneously              |
    |    📂  File Tree View       → Easily browse and organize project files        |
    |    🌙  Theming Support      → Dark/Light/Dracula themes via Monaco            |
    |                                                                               |
    |                                                                               |
    +-------------------------------------------------------------------------------+

        `;

function EditorComponent() {
  const handleTheme = (editor, monaco) => {
    import("monaco-themes/themes/Kuroir Theme.json").then((data) => {
      monaco.editor.defineTheme("kuroir-theme", data);
      monaco.editor.setTheme("kuroir-theme");
    });
  };

  const { activeFileTab } = useActiveFileTabStore();
  const { editorSocket } = useEditorSocketStore();
  const timer = useRef(null);

  //Debounce function to handle changes
  const handleChange = (value) => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      const editorContent = value;
      editorSocket.emit("writeFile", {
        data: editorContent,
        pathToFileFolder: activeFileTab?.path,
      });
    }, 2000);
  };

  const getValue = () => {
    if (activeFileTab?.path) {
      return activeFileTab?.value;
    }
    return defaultValue;
  };

  useEffect(() => {
    getValue();
  }, [activeFileTab]);

  return (
    <div
      className="editor-pane"
      style={{
        minHeight: "92%",
        width: "100%",
        flex: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Editor
        width="100%"
        height="100%"
        language={extensionToFiletype(activeFileTab?.extension) || "plaintext"}
        defaultValue={defaultValue}
        value={getValue()}
        onMount={(editor, monaco) => {
          // handleTheme(editor, monaco);
        }}
        theme="vs-dark"
        onChange={handleChange}
        options={{
          fontSize: 14,
          fontFamily: "Fira Code, monospace",
          fontLigatures: true,
          minimap: { enabled: activeFileTab?.extension ? true : false },
          automaticLayout: true,
          wordWrap: "off",
          lineNumbers: activeFileTab?.extension ? "on" : "off",
          renderLineHighlight: "line",
          cursorBlinking: "blink",
          cursorStyle: "line",
          glyphMargin: true,
          folding: activeFileTab?.extension ? true : false,
          smoothScrolling: true,
          cursorBlinking: "smooth",
          cursorSmoothCaretAnimation: true,
          renderWhitespace: "selection",
          renderControlCharacters: true,
          overviewRulerLanes: 3,
          overviewRulerBorder: true,
          overviewRulerColor: "#000000",
          scrollbar: {
            verticalScrollbarSize: 14,
            horizontalScrollbarSize: 14,
          },
        }}
      />
    </div>
  );
}

export default EditorComponent;
