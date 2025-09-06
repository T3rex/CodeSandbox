import TemplateMenu from "../../components/molecules/TemplateMenu/TemplateMenu";
import AIPrototype from "../../components/molecules/AIPrototype/AIPrototype";
import "./Dashboard.css";
import Header from "../../components/atoms/Header/Header";
function Dashboard() {
  return (
    <>
      <Header />
      <div className="dashboard-container ">
        <AIPrototype />
        <TemplateMenu />
      </div>
    </>
  );
}

export default Dashboard;
