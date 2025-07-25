import { Route, Routes } from "react-router-dom";
import CreateProject from "./pages/CreateProject";
import { PingComponent } from "./components/atoms/PingComponent.jsx";
import ProjectPlayground from "./pages/ProjectPlayground.jsx";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<CreateProject />} />
      <Route path="/ping" element={<PingComponent />} />
      <Route path="/project/:projectId" element={<ProjectPlayground />} />
    </Routes>
  );
}

export default Router;
