import { useParams } from "react-router-dom";
import { useEffect } from "react";
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

  const { openFileTabs } = useOpenFileTabsStore();

  const fetchPort = () => {
    console.log("Fetching port for project:", projectId);
    editorSocket?.emit("getPort", { containerName: projectId });
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
            <Allotment vertical>
              {/* Editor Section */}
              <Allotment.Pane preferredSize="80%">
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
                preferredSize="20%"
                minSize={40}
                snap
                visible={true}
              >
                <div className="terminal-wrapper">
                  <h2 className="terminal-header">
                    <BsFillTerminalFill
                      onClick={fetchPort}
                      style={{ cursor: "pointer" }}
                    />
                    <span>Terminal</span>
                  </h2>
                  <BrowserTerminal />
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
