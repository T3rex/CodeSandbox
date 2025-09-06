import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

function Header({ isHomePage }) {
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
          {isHomePage && (
            <>
              <a href="#features" onClick={() => setIsOpen(false)}>
                Features
              </a>
              <a href="#benefits" onClick={() => setIsOpen(false)}>
                Benefits
              </a>
            </>
          )}
          <button
            className="mycodebox-login-button"
            onClick={() => {
              isHomePage ? navigate("/dashboard") : navigate("/");
            }}
          >
            {isHomePage ? "Get started" : "Home"}
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
