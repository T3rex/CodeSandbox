import { Route, Routes } from "react-router-dom";
import CreateProject from "./pages/CreateProject/CreateProject.jsx";
import { PingComponent } from "./components/atoms/PingComponent/PingComponent.jsx";
import ProjectPlayground from "./pages/ProjectPlayground/ProjectPlayground.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import LandingPage from "./pages/LandingPage/LandingPage.jsx";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/template/:template" element={<CreateProject />} />
      <Route path="/ping" element={<PingComponent />} />
      <Route path="/project/:projectId" element={<ProjectPlayground />} />
    </Routes>
  );
}

export default Router;
