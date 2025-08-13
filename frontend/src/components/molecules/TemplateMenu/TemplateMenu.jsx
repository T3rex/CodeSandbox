import React from "react";
import TemplateCard from "../../atoms/TemplateCard/TemplateCard";
import "./TemplateMenu.css";

function TemplateMenu() {
  return (
    <div className="template-menu">
      <p className="template-heading">Featured Web Template</p>
      <div className="template-container">
        <TemplateCard
          logo="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
          title="React"
          description="Code a new React app in Typescript or JavaScript, built with Vite"
        />
        <TemplateCard
          logo="https://images.seeklogo.com/logo-png/50/2/angular-icon-logo-png_seeklogo-507324.png"
          title="Angular"
          description="Code a new Angular app in Typescript built with ng-cli"
        />
        <TemplateCard
          logo="https://images.seeklogo.com/logo-png/44/2/qwik-logo-png_seeklogo-443207.png"
          title="Qwik"
          description="Code a new Qwik app in TypeScript or JavaScript, built with Vite"
        />
        <TemplateCard
          logo="https://avatars.githubusercontent.com/u/26872990?v=4"
          title="PReact"
          description="Code a new PReact app in Typescript or JavaScript, built with Vite"
        />
        <TemplateCard
          logo="https://img.icons8.com/nolan/512/vue-js.png"
          title="Vue"
          description="Code a new Vue  app in Typescript or JavaScript, built with Vite"
        />
        <TemplateCard
          logo="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Svelte_Logo.svg/1200px-Svelte_Logo.svg.png"
          title="Svelte"
          description="Code a new Svelte app in Typescript or JavaScript, built with Vite"
        />
      </div>
    </div>
  );
}

export default TemplateMenu;
