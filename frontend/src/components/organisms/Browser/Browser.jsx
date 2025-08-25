import { use, useEffect, useRef } from "react";
import usePortStore from "../../../store/PortStore.js";
import { Input, Row } from "antd";
import { IoMdRefresh } from "react-icons/io";
import useEditorSocketStore from "../../../store/editorSocketStore.js";
import useTerminalSocketStore from "../../../store/terminalSocketStore.js";
import { useParams } from "react-router-dom";
import axios from "axios";

function Browser() {
  const browserRef = useRef(null);
  const timerRef = useRef(null);
  let timeout = 2000;
  const { projectId } = useParams();
  const { editorSocket } = useEditorSocketStore();
  const { terminalSocket } = useTerminalSocketStore();
  const { port } = usePortStore();
  const projectHost = import.meta.env.VITE_BACKEND_URL.replace(/:\d+/, "");

  const url = `${projectHost}:${port}`;

  const handleRefresh = () => {
    if (!port) {
      editorSocket?.emit("getPort", { containerName: projectId });
      return;
    }
    if (browserRef.current) {
      browserRef.current.src = url;
    }
  };

  const loadApp = async () => {
    try {
      const response = await axios.get(url, { timeout: 2000 });
      if (response.status === 200 && browserRef.current) {
        browserRef.current.src = url;
      }
      clearTimeout(timerRef.current);
    } catch (error) {
      timerRef.current = setTimeout(loadApp, timeout);
      timeout = Math.min(timeout * 2, 60000); // Exponential backoff up to 60 seconds
    }
  };

  useEffect(() => {
    if (browserRef.current && port) {
      loadApp();
    }
    return () => {
      clearTimeout(timerRef.current);
    };
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
          // backgroundColor: "#282a35",
        }}
      />
    </Row>
  );
}

export default Browser;
