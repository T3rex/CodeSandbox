{/* prettier-ignore */}
import Editor from "@monaco-editor/react";
import useEditorSocketStore from "../../../store/editorSocketStore";
import useActiveFileTabStore from "../../../store/activeFileTabStore";
import { extensionToFiletype } from "../../../utils/extensionToFiletype";
import { useEffect, useRef } from "react";
function EditorComponent() {
  const handleTheme = (editor, monaco) => {
    import("monaco-themes/themes/Dracula.json").then((data) => {
      monaco.editor.defineTheme("Dracula", data);
      monaco.editor.setTheme("Dracula");
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

  const getValue = () => {
    if (activeFileTab?.path) {
      return activeFileTab?.value;
    }
    return defaultValue;
  };

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
          handleTheme(editor, monaco);
        }}
        onChange={handleChange}
        options={{
          fontSize: 16,
          minimap: {
            autohide: true,
            enabled: true,
            renderCharacters: true,
            showSlider: "mouseover",
            scale: 1.2,
            size: "proportional",
            maxColumn: 120,
          },
          scrollType: 0,
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
          renderWhitespace: "selection",
          renderControlCharacters: true,
          overviewRulerLanes: 3,
          overviewRulerBorder: true,
          overviewRulerColor: "#000000",
          selectionHighlight: true,
          cursorBlinking: "smooth",
          cursorSmoothCaretAnimation: true,
          cursorStyle: "line",
          stickyScroll: { enabled: false },
        }}
      />
    </div>
  );
}

export default EditorComponent;
