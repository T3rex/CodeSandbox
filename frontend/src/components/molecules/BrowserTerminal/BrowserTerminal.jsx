import { Terminal } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import "@xterm/xterm/css/xterm.css";
import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";

function BrowserTerminal() {
  const terminalRef = useRef();
  const socket = useRef();
  const { projectId: projectIdFromUrl } = useParams();

  useEffect(() => {
    const terminal = new Terminal({
      cursorBlink: true,
      convertEol: true,
      cursorStyle: "bar",
      cursorWidth: 5,
      drawBoldTextInBrightColors: true,
      fontFamily: "monospace",
      fontSize: 14,
      theme: {
        background: "#1e1e1e",
        foreground: "#d4d4d4",
        cursor: "#d4d4d4",
        selection: "#264f78",
      },
    });
    terminal.open(terminalRef.current);
    const fitAddon = new FitAddon();
    terminal.loadAddon(fitAddon);
    fitAddon.fit();

    socket.current = io(`${import.meta.env.VITE_BACKEND_URL}/terminal`, {
      query: { projectId: projectIdFromUrl },
    });

    socket.current.on("shellOutput", (data) => {
      terminal.write(data);
    });

    terminal.onData((data) => {
      console.log(data);
      socket.current.emit("shellInput", data);
    });

    return () => {
      terminal.dispose();
      if (socket.current) {
        socket.current.disconnect();
      }
      terminalRef.current = null;
      socket.current = null;
    };
  }, []);

  return (
    <div
      ref={terminalRef}
      style={{ width: "100%", height: "29vh", overflow: "auto" }}
    ></div>
  );
}

export default BrowserTerminal;
