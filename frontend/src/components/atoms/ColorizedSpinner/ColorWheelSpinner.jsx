// ColorWheelSpinner.jsx
import React from "react";
import "./ColorWheelSpinner.css";

export default function ColorWheelSpinner({
  size = 64, // px
  speed = 1.1, // seconds per spin
  label = "Loading",
}) {
  const style = {
    "--size": `${size}px`,
    "--speed": `${speed}s`,
  };
  return (
    <div
      className="cws-wrap"
      role="status"
      aria-live="polite"
      aria-label={label}
      style={style}
    >
      <div className="cws" />
      <span className="sr-only">{label}</span>
    </div>
  );
}
