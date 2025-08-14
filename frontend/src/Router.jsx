import { Route, Routes } from "react-router-dom";
import CreateProject from "./pages/CreateProject/CreateProject.jsx";
import { PingComponent } from "./components/atoms/PingComponent/PingComponent.jsx";
import ProjectPlayground from "./pages/ProjectPlayground/ProjectPlayground.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";

// Router component to define the routes of the application

function Router() {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/template/:template" element={<CreateProject />} />
      <Route path="/ping" element={<PingComponent />} />
      <Route path="/project/:projectId" element={<ProjectPlayground />} />
    </Routes>
  );
}

export default Router;
