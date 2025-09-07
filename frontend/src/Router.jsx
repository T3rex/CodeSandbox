import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

import CreateProject from "./pages/CreateProject/CreateProject.jsx";
import { PingComponent } from "./components/atoms/PingComponent/PingComponent.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import LandingPage from "./pages/LandingPage/LandingPage.jsx";
import VSCodeShimmer from "./components/atoms/Shimmer/VSCodeShimmer.jsx";
// Lazy load only ProjectPlayground
const ProjectPlayground = lazy(() =>
  import("./pages/ProjectPlayground/ProjectPlayground.jsx")
);

function Router() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/template/:template" element={<CreateProject />} />
      <Route path="/ping" element={<PingComponent />} />
      <Route
        path="/project/:projectId"
        element={
          <Suspense fallback={<VSCodeShimmer />}>
            <ProjectPlayground />
          </Suspense>
        }
      />
    </Routes>
  );
}

export default Router;
