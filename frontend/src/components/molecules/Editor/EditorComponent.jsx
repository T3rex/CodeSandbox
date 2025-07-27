import Editor from "@monaco-editor/react";

function EditorComponent() {
  const handleTheme = (editor, monaco) => {
    import("monaco-themes/themes/Dracula.json").then((data) => {
      monaco.editor.defineTheme("Dracula", data);
      monaco.editor.setTheme("Dracula");
    });
  };

  return (
    <div>
      <Editor
        width="100vw"
        height="100vh"
        defaultLanguage="javascript"
        defaultValue="// some comment"
        onMount={(editor, monaco) => {
          handleTheme(editor, monaco);
        }}
      />
    </div>
  );
}

export default EditorComponent;
