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
        width="70vw"
        height="100vh"
        defaultLanguage="javascript"
        defaultValue="// Write your code here"
        onMount={(editor, monaco) => {
          handleTheme(editor, monaco);
        }}
      />
    </div>
  );
}

export default EditorComponent;
