import "@xterm/xterm/css/xterm.css";
import { Terminal } from "@xterm/xterm";
import { useEffect, useRef } from "react";
import { FitAddon } from "@xterm/addon-fit";
import { AttachAddon } from "@xterm/addon-attach";
import useTerminalSocketStore from "../../../store/terminalSocketStore";

function BrowserTerminal() {
  const terminalRef = useRef(null);
  const { terminalSocket } = useTerminalSocketStore();

  useEffect(() => {
    const terminal = new Terminal({
      cursorBlink: true,
      convertEol: true,
      cursorStyle: "block",
      cursorWidth: 2,
      drawBoldTextInBrightColors: false,
      fontFamily: "'Fira Code', monospace",
      fontSize: 18,
      lineHeight: 1.5,
      letterSpacing: 0.3,
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

    const fitAddon = new FitAddon();
    terminal.loadAddon(fitAddon);

    // Open terminal and fit it
    if (terminalRef.current) {
      terminal.open(terminalRef.current);
      setTimeout(() => {
        fitAddon.fit();
      }, 1000);
    }

    // Attach WebSocket if ready, else wait for it to open
    let socketOpenHandler = null;
    if (terminalSocket) {
      if (terminalSocket.readyState === WebSocket.OPEN) {
        const attachAddon = new AttachAddon(terminalSocket);
        terminal.loadAddon(attachAddon);
      } else {
        socketOpenHandler = () => {
          const attachAddon = new AttachAddon(terminalSocket);
          terminal.loadAddon(attachAddon);
        };
        terminalSocket.onopen = socketOpenHandler;
      }
    }

    //Refit terminal on window resize
    const handleResize = () => {
      fitAddon.fit();
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      terminal.dispose();
      if (terminalSocket && socketOpenHandler) {
        terminalSocket.onopen = null;
      }
      window.removeEventListener("resize", handleResize);
    };
  }, [terminalSocket]);

  return (
    <div
      ref={terminalRef}
      style={{
        // // width: "99%",
        // // height: "300px",
        // overflow: "none",
        paddingLeft: "10px",
        // paddingBottom: "50px",
      }}
    ></div>
  );
}

export default BrowserTerminal;
