import React from "react";
import "./LandingPage.css";
import { useNavigate } from "react-router-dom";
import Header from "../../components/atoms/Header/Header";
import DummyAIPrototype from "../../components/atoms/DummyAIPrototype/DummyAIP";
// SVG Icons for features - defined as components for reusability
const AiIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3z" />
    <path d="M5 3v4" />
    <path d="M19 17v4" />
    <path d="M3 5h4" />
    <path d="M17 19h4" />
  </svg>
);

const SandboxIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <path d="m3.3 7 8.7 5 8.7-5" />
    <path d="M12 22V12" />
  </svg>
);
const PreviewIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);
const SyncIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
    <path d="M3 21v-5h5" />
    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
    <path d="M21 3v5h-5" />
  </svg>
);
const TerminalIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Rounded square background */}
    <rect x="2" y="2" width="20" height="20" rx="4" ry="4" />

    {/* Terminal caret + command line */}
    <polyline points="6 15 10 11 6 7" />
    <line x1="12" y1="17" x2="18" y2="17" />
  </svg>
);

const TabsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 10H7a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2Z" />
    <path d="M3 17V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2" />
  </svg>
);
const FileTreeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
  </svg>
);
const ThemeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 18a6 6 0 0 0 0-12v12z" />
  </svg>
);
const features = [
  {
    icon: <AiIcon />,
    title: "AI Prototyping",
    description: "Prototype your idea into a working application using AI.",
  },
  {
    icon: <img src={`/template_logos/zero-input-icon.png`} width={50} />,
    title: "Zero-Setup",
    description: "Start coding immediately in the browser. No installs.",
  },
  {
    icon: <SandboxIcon />,
    title: "Sandboxed Sessions",
    description: "Isolated, safe coding environments for every project.",
  },
  {
    icon: <PreviewIcon />,
    title: "Live App Preview",
    description: "Preview your app live with an inbuilt browser.",
  },
  {
    icon: <SyncIcon />,
    title: "Real-Time Sync",
    description: "Auto-save and collaborate via WebSockets.",
  },
  {
    icon: <TerminalIcon />,
    title: "Interactive Terminal",
    description: "Execute commands in a live, integrated terminal.",
  },
  {
    icon: <TabsIcon />,
    title: "Multi-File Tabs",
    description: "Edit multiple files at once just like your local editor.",
  },
  {
    icon: <FileTreeIcon />,
    title: "File Tree View",
    description: "Easily browse and organize your project files.",
  },
  {
    icon: <ThemeIcon />,
    title: "Theming Support",
    description: "Choose from Dark, Light, or Dracula themes.",
  },
];

function LandingPage() {
  const navigate = useNavigate();

  return (
    <>
      <div className="mycodebox-landing">
        <main>
          {/* Hero Section */}
          <section className="mycodebox-hero">
            <h1>
              From <span className="mycodebox-gradient-text">Idea</span> to Live
              App. With
              <div>
                <span className="mycodebox-gradient-text">Instant</span>{" "}
                <span className="mycodebox-gradient-text">Development</span>{" "}
                <span className="mycodebox-gradient-text">Environment</span>
              </div>
            </h1>
            <p>
              MyCodebox is an AI-powered online code editor that runs in your
              browser. Zero setup. Zero installation. Just pure coding.
            </p>
            <button
              className="mycodebox-cta-button"
              onClick={() => navigate("/dashboard")}
            >
              Launch Your Codebox for Free
            </button>
          </section>

          {/* Features Section */}
          <section
            id="features"
            className="mycodebox-features mycodebox-container"
          >
            <h2 className="section-title">Your Personal Coding Playground</h2>
            <div className="mycodebox-features-grid">
              {features.map((feature, index) => (
                <div className="mycodebox-feature-card" key={index}>
                  <div className="icon">{feature.icon}</div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Benefits Section */}
          <section
            id="benefits"
            className="mycodebox-benefits mycodebox-container"
          >
            <div className="mycodebox-benefit-item">
              <div className="mycodebox-benefit-text">
                <h2 className="mycodebox-gradient-text">
                  AI-Powered Prototyping
                </h2>
                <p>
                  Describe your idea in plain English and watch our AI build a
                  functional prototype in seconds. Iterate faster than ever
                  before and bring your vision to life with unprecedented speed.
                </p>
              </div>
              <div className="mycodebox-benefit-visual">
                <div style={{ width: "100%", height: "100%" }}>
                  <DummyAIPrototype />
                </div>
              </div>
            </div>
            <div className="mycodebox-benefit-item">
              <div className="mycodebox-benefit-text">
                <h2 className="mycodebox-gradient-text">
                  Instant Development Environments
                </h2>
                <p>
                  Forget `npm install`. Every Codebox is a pre-configured,
                  sandboxed environment. Start coding in any language or
                  framework the moment inspiration strikes.
                </p>
              </div>
              <div
                className="mycodebox-benefit-visual"
                style={{
                  background:
                    "linear-gradient(90deg, #5a3ebf 0%, #4b2c8a 100%)",
                }}
              >
                <img
                  src={"/template_logos/instant-dev.gif"}
                  style={{
                    width: "100%",
                    // height: "100%",
                    borderRadius: "8px",
                    objectFit: "fill",
                    transform: "scaleX(-1)",
                  }}
                />
              </div>
            </div>
            <div className="mycodebox-benefit-item">
              <div className="mycodebox-benefit-text">
                <h2 className="mycodebox-gradient-text">
                  Share and Preview with a Click
                </h2>
                <p>
                  Showcase your work with a shareable URL. Get instant feedback
                  on a live, running version of your app. Collaboration has
                  never been this easy.
                </p>
              </div>
              <div className="mycodebox-benefit-visual">
                <img
                  src={
                    "https://raw.githubusercontent.com/microsoft/vscode-livepreview/main/img/live-refresh.gif"
                  }
                  style={{ borderRadius: "8px", width: "100%", height: "100%" }}
                />
              </div>
            </div>
          </section>

          {/* Final CTA Section */}
          <section className="mycodebox-container">
            <div className="mycodebox-final-cta">
              <h2>Ready to Build Your Next Big Idea?</h2>
              <p>No downloads. No configuration. Just code.</p>
              <button
                className="mycodebox-cta-button"
                onClick={() => navigate("/dashboard")}
              >
                Start Building Now
              </button>
            </div>
          </section>
        </main>

        <footer className="mycodebox-footer">
          <p>
            &copy; {new Date().getFullYear()} MyCodebox. All Rights Reserved.
          </p>
        </footer>
      </div>
    </>
  );
}

// Default export for the App
export default function App() {
  return (
    <>
      <Header isHomePage={true} />
      <LandingPage />
    </>
  );
}
