// DummyAIPrototype.jsx
import { useState, useEffect } from "react";
import "./DummyAIP.css";
import { FaArrowRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const placeholders = [
  "Make an app that generates poems from images...",
  "Make an app that helps me plan my day...",
  "Make an app that tracks my expenses...",
  "Make an app that suggests workout routines...",
  "Make an app that generates music playlists...",
];

export default function DummyAIPrototype() {
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [typing, setTyping] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let timeout;

    if (typing) {
      // typing forward
      if (displayText.length < placeholders[index].length) {
        timeout = setTimeout(() => {
          setDisplayText(placeholders[index].slice(0, displayText.length + 1));
        }, 40); // typing speed
      } else {
        // pause before deleting
        timeout = setTimeout(() => setTyping(false), 1500);
      }
    } else {
      // deleting
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(placeholders[index].slice(0, displayText.length - 1));
        }, 20); // deleting speed
      } else {
        // move to next sentence
        setIndex((prev) => (prev + 1) % placeholders.length);
        setTyping(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, typing, index]);

  return (
    <div className="Dummy-AIPrototype-container">
      <div className="Dummy-AIPrototype-input-wrapper">
        <textarea
          className="Dummy-AIPrototype-input"
          value={displayText}
          disabled
        />
      </div>

      <div className="Dummy-bubble-container">
        <button
          className="prototype-button"
          onClick={() => navigate("/dashboard")}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5em" }}>
            <span>Prototype with AI</span>
            <FaArrowRight />
          </div>
        </button>
      </div>
    </div>
  );
}
