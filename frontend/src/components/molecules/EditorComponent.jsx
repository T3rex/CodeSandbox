import Editor from "@monaco-editor/react";

function EditorComponent() {
  return (
    <div>
      <Editor
        height="90vh"
        defaultLanguage="javascript"
        defaultValue="// some comment"
        theme="vs-dark"
      />
    </div>
  );
}

export default EditorComponent;
