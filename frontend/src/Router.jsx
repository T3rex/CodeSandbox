import { Route, Routes } from "react-router-dom";
import CreateProject from "./pages/CreateProject";
import { PingComponent } from "./components/atoms/PingComponent.jsx";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<CreateProject />} />
      <Route path="/ping" element={<PingComponent />} />
    </Routes>
  );
}

export default Router;
