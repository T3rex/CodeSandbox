import { use, useEffect, useRef } from "react";
import usePortStore from "../../../store/PortStore.js";
import { Input, Row } from "antd";
import { IoMdRefresh } from "react-icons/io";

function Browser() {
  const browserRef = useRef(null);

  const { port } = usePortStore();
  console.log("Port in Browser component:", port);

  const handleRefresh = () => {
    if (browserRef.current) {
      const currentSrc = browserRef.current.src;
      browserRef.current.src = currentSrc;
    }
  };

  useEffect(() => {
    if (browserRef.current && port) {
      browserRef.current.src = `http://localhost:${port}`;
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
        value={`http://localhost:${port}`}
        prefix={
          <IoMdRefresh
            onClick={handleRefresh}
            size={20}
            style={{ cursor: "pointer", paddingLeft: "10px" }}
          />
        }
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
        src={`http://localhost:${port}`}
      />
    </Row>
  );
}

export default Browser;
