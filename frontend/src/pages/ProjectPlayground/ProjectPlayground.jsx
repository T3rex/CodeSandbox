import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import { BsFillTerminalFill } from "react-icons/bs";
import { Allotment } from "allotment";
import "allotment/dist/style.css";

import EditorComponent from "../../components/molecules/Editor/EditorComponent.jsx";
import EditorButton from "../../components/atoms/EditorButton/EditorButton.jsx";
import TreeStructure from "../../components/organisms/TreeStructure/TreeStructure.jsx";
import BrowserTerminal from "../../components/molecules/BrowserTerminal/BrowserTerminal.jsx";

import useTreeStructureStore from "../../store/treeStructureStore.js";
import useEditorSocketStore from "../../store/editorSocketStore.js";
import useTerminalSocketStore from "../../store/terminalSocketStore.js";
import useOpenFileTabsStore from "../../store/openFilesTabsStore.js";

import "./ProjectPlayground.css";
import Browser from "../../components/organisms/Browser/Browser.jsx";

function ProjectPlayground() {
  const { projectId: projectIdFromUrl } = useParams();
  const { setProjectId, projectId } = useTreeStructureStore();
  const { setEditorSocket, editorSocket } = useEditorSocketStore();
  const { setTerminalSocket } = useTerminalSocketStore();
  // const [terminalResized, setTerminalResized] = useState(0);
  const { openFileTabs } = useOpenFileTabsStore();
  const fitAddonRef = useRef(null);
  const lastFitTime = useRef(0);

  // const timerIdRef = useRef(null);

  // const debouncedTerminalResize = () => {
  //   if (timerIdRef.current) {
  //     clearTimeout(timerIdRef.current);
  //   }
  //   timerIdRef.current = setTimeout(() => {
  //     setTerminalResized((prev) => prev + 1);
  //     console.log("Resized");
  //   }, 100);
  // };

  const onSplitterChange = () => {
    const now = Date.now();
    if (now - lastFitTime.current > 50) {
      fitAddonRef.current?.fit();
      lastFitTime.current = now;
      console.log("fitted");
    }
  };

  useEffect(() => {
    setProjectId(projectIdFromUrl);

    const editorSocketConn = io(`${import.meta.env.VITE_BACKEND_URL}/editor`, {
      query: { projectId: projectIdFromUrl },
    });

    const terminalSocketConn = new WebSocket(
      `${import.meta.env.VITE_WS_URL}/terminal?projectId=${projectIdFromUrl}`
    );

    setEditorSocket(editorSocketConn);
    setTerminalSocket(terminalSocketConn);

    return () => {
      editorSocketConn.disconnect();
      terminalSocketConn.close();
      setEditorSocket(null);
      setTerminalSocket(null);
    };
  }, [setProjectId, projectIdFromUrl, setEditorSocket, setTerminalSocket]);

  useEffect(() => {
    if (editorSocket) {
      editorSocket?.emit("getPort", { containerName: projectId });
    }
  }, [editorSocket]);

  return (
    <div className="project-playground-container">
      <Allotment>
        {/* Left Pane: Tree */}
        <Allotment.Pane preferredSize="20%" snap>
          <div className="tree-structure-wrapper">
            {projectId && <TreeStructure />}
          </div>
        </Allotment.Pane>

        {/* Middle Pane: Editor + Terminal */}
        <Allotment.Pane preferredSize="55%" minSize={200}>
          <div className="right-pane-wrapper">
            <Allotment vertical onChange={onSplitterChange}>
              {/* Editor Section */}
              <Allotment.Pane preferredSize="70%">
                <div className="editor-section">
                  <div className="editor-buttons">
                    {openFileTabs?.map((tab) => (
                      <EditorButton
                        key={tab.path}
                        isActive={tab.isActive}
                        path={tab.path}
                        name={tab.name}
                      />
                    ))}
                  </div>
                  <EditorComponent />
                </div>
              </Allotment.Pane>

              {/* Terminal Section */}
              <Allotment.Pane
                preferredSize="30%"
                minSize={40}
                snap
                visible={true}
              >
                <div className="terminal-wrapper">
                  <h2 className="terminal-header">
                    <BsFillTerminalFill style={{ cursor: "pointer" }} />
                    <span>Terminal</span>
                  </h2>
                  {/* <BrowserTerminal terminalResized={terminalResized} /> */}
                  <BrowserTerminal fitAddonRef={fitAddonRef} />
                </div>
              </Allotment.Pane>
            </Allotment>
          </div>
        </Allotment.Pane>
        {/* Right Pane: Browser */}
        <Allotment.Pane preferredSize="25%" snap>
          <div className="browser-wrapper">
            <Browser />
          </div>
        </Allotment.Pane>
      </Allotment>
    </div>
  );
}

export default ProjectPlayground;
