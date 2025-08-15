import { use, useEffect, useRef } from "react";
import usePortStore from "../../../store/PortStore.js";
import { Input, Row } from "antd";
import { IoMdRefresh } from "react-icons/io";
import useEditorSocketStore from "../../../store/editorSocketStore.js";
import useTerminalSocketStore from "../../../store/terminalSocketStore.js";
import { useParams } from "react-router-dom";

function Browser() {
  const browserRef = useRef(null);
  const { projectId } = useParams();
  const { editorSocket } = useEditorSocketStore();
  const { terminalSocket } = useTerminalSocketStore();

  const { port } = usePortStore();
  const url = `http://localhost:${port}`;

  const handleRefresh = () => {
    if (!port) {
      editorSocket?.emit("getPort", { containerName: projectId });
      return;
    }
    if (browserRef.current) {
      browserRef.current.src = url;
    }
  };

  useEffect(() => {
    if (browserRef.current && port) {
      browserRef.current.src = url;
      browserRef.current.onload = () => {
        console.log("Browser loaded successfully");
      };
      browserRef.current.onerror = () => {
        console.error("Failed to load the browser content");
      };
    }
  }, [port]);

  useEffect(() => {
    if (terminalSocket) {
      editorSocket?.emit("getPort", { containerName: projectId });
    }
  }, [terminalSocket]);

  return (
    <Row
      style={{
        height: "100%",
        width: "100%",
        backgroundColor: "#22212b",
      }}
    >
      <Input
        style={{
          width: "100%",
          height: "40px",
          color: "white",
          fontFamily: "Fira Code",
          backgroundColor: "#343747ff",
          borderRadius: "0px",
          border: "none",
        }}
        value={url}
        prefix={
          <IoMdRefresh
            onClick={handleRefresh}
            size={20}
            style={{ cursor: "pointer" }}
          />
        }
        spellCheck="false"
      />
      <iframe
        ref={browserRef}
        title="Browser"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          backgroundColor: "#282a35",
        }}
      />
    </Row>
  );
}

export default Browser;
