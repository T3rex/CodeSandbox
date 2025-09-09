import TemplateMenu from "../../components/molecules/TemplateMenu/TemplateMenu";
import AIPrototype from "../../components/molecules/AIPrototype/AIPrototype";
import "./Dashboard.css";
import Header from "../../components/atoms/Header/Header";
import { useEffect, useState } from "react";
import InstructionsModal from "../../components/atoms/InstructionModal/InstructionsModal";
function Dashboard() {
  const [isInstructionsOpen, setIsInstructionsOpen] = useState(false);

  useEffect(() => {
    console.log(isInstructionsOpen);
  }, [isInstructionsOpen]);
  return (
    <>
      <Header
        isHomePage={false}
        setIsInstructionsOpen={setIsInstructionsOpen}
      />
      <div className="dashboard-container ">
        <AIPrototype />

        <InstructionsModal
          isInstructionsOpen={isInstructionsOpen}
          setIsInstructionsOpen={setIsInstructionsOpen}
        />

        <TemplateMenu />
      </div>
    </>
  );
}

export default Dashboard;
