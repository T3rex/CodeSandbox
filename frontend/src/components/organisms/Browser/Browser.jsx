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
    <div>
      <Row
        style={{
          height: "100%",
          backgroundColor: "#22212b",
        }}
      >
        <Input
          style={{
            width: "100%",
            height: "40px",
            color: "white",
            fontFamily: "Fira Code",
            backgroundColor: "#282a35",
          }}
          value={`http://localhost:${port}`}
          prefix={
            <IoMdRefresh
              onClick={handleRefresh}
              size={20}
              style={{ cursor: "pointer" }}
            />
          }
        />
        <iframe
          ref={browserRef}
          title="Browser"
          style={{
            width: "100%",
            height: "400px",
            border: "none",
            backgroundColor: "#282a35",
          }}
          src={`http://localhost:${port}`}
        />
      </Row>
    </div>
  );
}

export default Browser;
