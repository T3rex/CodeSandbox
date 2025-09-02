import TemplateMenu from "../../components/molecules/TemplateMenu/TemplateMenu";
import AIPrototype from "../../components/molecules/AIPrototype/AIPrototype";
import "./Dashboard.css";
function Dashboard() {
  return (
    <div className="dashboard-container ">
      <AIPrototype />
      <TemplateMenu />
    </div>
  );
}

export default Dashboard;
