import "./App.css";
import Router from "./Router.jsx";
import { io } from "socket.io-client";

function App() {
  const socket = io("ws://localhost:3000");

  return <Router />;
}

export default App;
