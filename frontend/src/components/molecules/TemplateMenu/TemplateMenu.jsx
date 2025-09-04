import React from "react";
import TemplateCard from "../../atoms/TemplateCard/TemplateCard";
import "./TemplateMenu.css";

function TemplateMenu() {
  return (
    <div>
      <h3>Start coding with fresh templates</h3>
      <div className="template-menu">
        <p className="template-heading">Featured Web Boxes</p>
        <div className="template-container">
          <TemplateCard
            logo="/template_logos/reactLogo.png"
            title="React"
            description="Code a new React app in Typescript or JavaScript, built with Vite"
            template="vite-react"
          />
          <TemplateCard
            logo="/template_logos/angularLogo.png"
            title="Angular"
            description="Code a new Angular app in Typescript built with ng-cli"
            template="angular"
          />
          <TemplateCard
            logo="/template_logos/qwikLogo.png"
            title="Qwik"
            description="Code a new Qwik app in TypeScript or JavaScript, built with Vite"
            template="vite-qwik"
          />
          <TemplateCard
            logo="/template_logos/preactLogo.png"
            title="PReact"
            description="Code a new PReact app in Typescript or JavaScript, built with Vite"
            template="vite-preact"
          />
          <TemplateCard
            logo="/template_logos/vueLogo.png"
            title="Vue"
            description="Code a new Vue  app in Typescript or JavaScript, built with Vite"
            template="vite-vue"
          />
          <TemplateCard
            logo="/template_logos/svelteLogo.png"
            title="Svelte"
            description="Code a new Svelte app in Typescript or JavaScript, built with Vite"
            template="vite-svelte"
          />
        </div>
      </div>
    </div>
  );
}

export default TemplateMenu;
