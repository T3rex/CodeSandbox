import "@xterm/xterm/css/xterm.css";
import { Terminal } from "@xterm/xterm";
import { useEffect, useRef } from "react";
import { FitAddon } from "@xterm/addon-fit";
import { useParams } from "react-router-dom";
import { AttachAddon } from "@xterm/addon-attach";

function BrowserTerminal() {
  const terminalRef = useRef();
  const socket = useRef();
  const { projectId: projectIdFromUrl } = useParams();

  useEffect(() => {
    const terminal = new Terminal({
      cursorBlink: false,
      convertEol: true,
      cursorStyle: "block",
      cursorWidth: 2,
      drawBoldTextInBrightColors: false,
      fontFamily: "'Fira Code', monospace",
      fontSize: 15,
      lineHeight: 1.5,
      letterSpacing: 0.5,
      disableStdin: false,
      allowTransparency: true,
      rendererType: "canvas",
      scrollback: 1000,
      theme: {
        background: "#1e1e1e",
        foreground: "#d4d4d4",
        cursor: "#ffffff",
        selection: "#264f78",
        black: "#000000",
        red: "#cd3131",
        green: "#0dbc79",
        yellow: "#e5e510",
        blue: "#2472c8",
        magenta: "#bc3fbc",
        cyan: "#11a8cd",
        white: "#e5e5e5",
        brightBlack: "#666666",
        brightRed: "#f14c4c",
        brightGreen: "#23d18b",
        brightYellow: "#f5f543",
        brightBlue: "#3b8eea",
        brightMagenta: "#d670d6",
        brightCyan: "#29b8db",
        brightWhite: "#e5e5e5",
      },
    });
    terminal.open(terminalRef.current);
    const fitAddon = new FitAddon();
    terminal.loadAddon(fitAddon);
    fitAddon.fit();

    // socket.current = io(`${import.meta.env.VITE_BACKEND_URL}/terminal`, {
    //   query: { projectId: projectIdFromUrl },
    // });

    socket.current = new WebSocket(
      `ws://localhost:3000/terminal?projectId=${projectIdFromUrl}`
    );

    socket.current.onopen = () => {
      const attachAddon = new AttachAddon(socket.current);
      terminal.loadAddon(attachAddon);
    };

    return () => {
      terminal.dispose();
      terminalRef.current = null;
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
