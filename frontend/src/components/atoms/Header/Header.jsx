import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

function Header({ isHomePage, setIsInstructionsOpen }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="mycodebox-header">
      <div className=" header-container">
        <div className="mycodebox-logo" onClick={() => navigate("/")}>
          <img
            src={`/template_logos/codesandbox-logo.png`}
            alt="MyCodebox Logo"
            className="mycodebox-logo"
            width={50}
          />
          <div>MyCodebox</div>
        </div>

        {/* Hamburger Icon */}
        <div
          className={`hamburger ${isOpen ? "active" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Nav Links */}
        <nav className={`mycodebox-nav ${isOpen ? "open" : ""}`}>
          <a href="" onClick={() => navigate("/")}>
            Home
          </a>
          {isHomePage && (
            <>
              <a href="#features" onClick={() => setIsOpen(false)}>
                Features
              </a>
              <a href="#benefits" onClick={() => setIsOpen(false)}>
                About
              </a>
            </>
          )}

          <button
            className="mycodebox-login-button"
            onClick={() => {
              isHomePage ? navigate("/dashboard") : setIsInstructionsOpen(true);
            }}
          >
            {isHomePage ? "Get started" : "Read Me"}
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
