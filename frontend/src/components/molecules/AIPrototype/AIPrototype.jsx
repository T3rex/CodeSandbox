import { useState, useRef, useEffect } from "react";
import "./AIPrototype.css";

const placeholders = [
  "An app that creates recipes from photos",
  "An app that generates poems from images",
  "An app that helps me plan my day",
];

const bubbles = [
  "Tipping Calculator",
  "Recipe Generator",
  "ERP Dashboard",
  "Landing Page",
];

export default function AIPrototype() {
  const [value, setValue] = useState("");
  const [index, setIndex] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
    }, 3000); // change every 3s
    return () => clearInterval(interval);
  }, [placeholders.length]);

  const handleKeyDown = (e) => {
    if (e.key === "Tab" && value.trim() === "") {
      e.preventDefault();
      const current = placeholders[index];
      setValue(current);

      setTimeout(() => {
        inputRef.current?.setSelectionRange(current.length, current.length);
      }, 0);
    }
  };

  const handleBubbleClick = (bubble) => {
    setValue(bubble);
    inputRef.current?.focus();
  };

  return (
    <div>
      <h3>Prototype an app with AI</h3>
      <div className="AIPrototype-container">
        <div className="AIPrototype-input-wrapper">
          <textarea
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="AIPrototype-input"
          />
          {!value && (
            <span key={index} className="AIPrototype-placeholder">
              {placeholders[index]}
              <span className="AIPrototype-tab">TAB</span>
            </span>
          )}
        </div>

        {/* Bubbles */}
        <div className="bubble-container">
          {bubbles.map((bubble, idx) => (
            <button
              key={idx}
              onClick={() => handleBubbleClick(bubble)}
              className="bubble"
            >
              {bubble}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
