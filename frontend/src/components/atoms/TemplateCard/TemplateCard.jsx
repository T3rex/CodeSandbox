import React from "react";
import "./TemplateCard.css";

function TemplateCard({ logo, title, description }) {
  return (
    <div className="template-card">
      {logo && <img src={logo} alt={title} height={50} />}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default TemplateCard;
