import React from "react";
import TemplateMenu from "../../components/molecules/TemplateMenu/TemplateMenu";
import DashboardSidebar from "../../components/molecules/DashboardSidebar/DashboardSidebar";
import "./Dashboard.css";
function Dashboard() {
  return (
    <div className="dashboard-container ">
      <DashboardSidebar />
      <TemplateMenu />
    </div>
  );
}

export default Dashboard;
