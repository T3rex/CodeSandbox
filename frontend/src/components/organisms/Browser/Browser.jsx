import React from "react";
import usePortStore from "../../../store/PortStore.js";

function Browser() {
  const { port } = usePortStore();
  console.log("Port in Browser component:", port);
  return <div>{port}</div>;
}

export default Browser;
