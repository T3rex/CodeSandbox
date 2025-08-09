import { use, useEffect, useRef } from "react";
import usePortStore from "../../../store/PortStore.js";
import { Input, Row } from "antd";
import { IoMdRefresh } from "react-icons/io";

function Browser() {
  const browserRef = useRef(null);

  const { port } = usePortStore();
  const url = `http://localhost:${port}`;

  const handleRefresh = () => {
    if (browserRef.current) {
      browserRef.current.src = url; // Refresh the iframe by resetting its src
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

  return !port ? (
    <div>Loading...</div>
  ) : (
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
