import "./App.css";
import { Route, Routes } from "react-router-dom";
import CreateProject from "./pages/CreateProject";
import { useState } from "react";
import { PingComponent } from "./components/atoms/PingComponent.jsx";

function App() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <Routes>
      <Route path="/" element={<CreateProject />} />
      <Route
        path="/ping"
        element={
          <div>
            <button onClick={() => setIsVisible(!isVisible)}>toggle</button>
            {isVisible && <PingComponent />}
          </div>
        }
      />
    </Routes>
  );
}

export default App;
