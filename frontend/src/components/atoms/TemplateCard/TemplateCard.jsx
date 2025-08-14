import React from "react";
import "./TemplateCard.css";
import { useNavigate } from "react-router-dom";

function TemplateCard({ logo, title, description, template }) {
  const navigate = useNavigate();

  return (
    <div
      className="template-card"
      onClick={() => navigate(`/template/${template}`)}
    >
      {logo && <img src={logo} alt={title} height={50} />}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default TemplateCard;
