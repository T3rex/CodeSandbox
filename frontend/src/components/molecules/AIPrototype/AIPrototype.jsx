import "./AIPrototype.css";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { FaKey } from "react-icons/fa6";
import { FaMicrophoneAlt } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import ColorWheelSpinner from "../../atoms/ColorizedSpinner/ColorWheelSpinner";
import useCreateProject from "../../../hooks/apis/mutations/useCreateProject";

const placeholders = [
  "An app that generates poems from images",
  "An app that helps me plan my day",
  "An app that tracks my expenses",
  "An app that suggests workout routines",
  "An app that generates music playlists",
];

const loadingMessage = [
  "Crafting your project files...",
  "Booting up the Codebox...",
  "Configuring your environment...",
  "Installing dependencies...",
  "Warming up the dev server...",
  "Optimizing code structure...",
  "Almost ready to launch...",
];

const bubbles = {
  "Tipping Calculator":
    "A user-friendly tipping calculator app designed to easily calculate tips and split bills among friends. Key features include inputting the total bill, selecting a tip percentage, specifying the number of people, and displaying each person's share and the total with tip. Use a vibrant pink and purple colour scheme.",
  "Recipe Generator":
    "A minimalist recipe generator app to create meals from ingredients in your fridge. Key features include adding available ingredients, generating recipe suggestions, viewing detailed cooking instructions, and saving favorite recipes. Utilise a fresh green and white colour scheme for a clean interface.",
  "ERP Dashboard":
    "A foundational ERP application for small businesses, featuring an interactive dashboard to visualise revenue, expenses, and profit, an integrated calendar for appointment management, a customer contact module, and a simple invoicing tool. Use a green and white colour scheme for a professional aesthetic.",
  "Landing Page": `Build a landing page for a cloud provider. The page should have a compelling headline and sub headline that highlight the value proposition for enterprise businesses. Include sections for top products with pricing, customer testimonials with logos, and a clear call-to-action to "Request a Consultation". The design should be clean, modern, and mobile-responsive.`,
};

export default function AIPrototype() {
  const [value, setValue] = useState("");
  const [index, setIndex] = useState(0);
  const [apiKey, setApiKey] = useState("");
  const [error, setError] = useState("");
  const [showLoading, setShowLoading] = useState(true);
  const [loadingIndex, setLoadingIndex] = useState(0);
  const [showApiKeyInput, setShowApiKeyInput] = useState("");

  const inputRef = useRef(null);
  const navigate = useNavigate();
  const { createProjectMutate, isPending } = useCreateProject(
    "my-codebox",
    "ai-generated",
    value,
    apiKey
  );

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  if (!browserSupportsSpeechRecognition) {
    return alert("Your browser does not support speech recognition.");
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const prevTranscriptRef = useRef("");

  useEffect(() => {
    if (transcript.length > prevTranscriptRef.current.length) {
      const newPart = transcript.slice(prevTranscriptRef.current.length).trim();
      if (newPart) {
        setValue((prev) => (prev + " " + newPart).replace(/\s+/g, " ").trim());
      }
      prevTranscriptRef.current = transcript;
    }
  }, [transcript]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingIndex((prev) => {
        return (prev + 1) % loadingMessage.length;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [showLoading]);

  const handleKeyDown = (e) => {
    if (e.key === "Tab" && value.trim() === "") {
      e.preventDefault();
      const current = placeholders[index];
      setValue(current);

      setTimeout(() => {
        inputRef.current?.setSelectionRange(current.length, current.length);
      }, 0);
    } else if (e.key === "Escape") {
      setValue("");
      setError("");
      resetTranscript();
    }
  };

  const handleMicClick = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      inputRef.current?.focus();
      resetTranscript();
      SpeechRecognition.startListening({ continuous: true });
    }
  };

  const handleBubbleClick = (bubble) => {
    setValue(bubbles[bubble]);
    inputRef.current?.focus();
  };

  async function handleCreateProject() {
    try {
      if (value.trim().length < 15) {
        setError("Please provide a more detailed description.");
        return;
      }
      setError(null);
      setShowLoading(true);
      const response = await createProjectMutate();
      setTimeout(() => {
        setShowLoading(false);
        navigate(`/project/${response.data.projectId}`);
      }, 8000);
    } catch (error) {
      console.log("Error creating project:", error);
      if (error.response && error.response.data) {
        setError(error.response.data.message || "Failed to create project.");
      } else {
        setError("An unexpected error occurred: " + error.message);
      }
    } finally {
      setShowLoading(false);
    }
  }

  return (
    <div>
      <h3>Prototype an app with AI</h3>
      <div className="AIPrototype-container">
        <div className="AIPrototype-input-wrapper">
          <textarea
            ref={inputRef}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            onKeyDown={handleKeyDown}
            className="AIPrototype-input"
            autoFocus
          />

          {!value && (
            <span key={index} className="AIPrototype-placeholder">
              {placeholders[index]}
              <span className="AIPrototype-tab">TAB</span>
            </span>
          )}
        </div>

        {/* Bubble Container */}
        <div className="bubble-container">
          <div className="actions">
            {/* Microphone */}

            <div
              style={{
                cursor: "pointer",
                alignContent: "baseline",
                marginTop: "auto",
              }}
              onClick={handleMicClick}
            >
              <FaMicrophoneAlt
                color="grey"
                size={25}
                fill={listening ? "white" : "grey"}
              />
            </div>

            {/* Key Icon with dropdown */}
            <div className="key-container">
              <FaKey
                color="grey"
                size={25}
                style={{ cursor: "pointer" }}
                onClick={() => setShowApiKeyInput((prev) => !prev)}
              />

              {/* API Key Input */}
              {showApiKeyInput && (
                <div className="API-key-dropdown">
                  <input
                    type="text"
                    value={apiKey}
                    onChange={(e) => {
                      e.stopPropagation();
                      setApiKey(e.target.value);
                    }}
                    onBlur={() => setShowApiKeyInput(false)}
                    placeholder="GEMINI API Key"
                    className="API-key-input"
                    autoFocus
                  />
                </div>
              )}
            </div>
          </div>
          {/* Error display */}
          {error && <div className="error">{error}</div>}
          {/* Loading message */}
          {showLoading && (
            <div className="loading-container">
              <div className="spinner-box">
                <ColorWheelSpinner size={30} speed={0.9} />
              </div>
              <div className="loading-text-box">
                <div className="loadingMessage" key={loadingIndex}>
                  {loadingMessage[loadingIndex]}
                </div>
              </div>
            </div>
          )}

          {/* Conditional Buttons */}
          {value.length > 15 ? (
            <button
              className={`prototype-button`}
              onClick={handleCreateProject}
              disabled={showLoading || isPending}
            >
              {showLoading ? (
                "Prototyping..."
              ) : (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5em",
                  }}
                >
                  <span>Prototype with AI</span>
                  <FaArrowRight />
                </div>
              )}
            </button>
          ) : (
            <div className="bubble-wrapper">
              {Object.keys(bubbles).map((bubble, idx) => (
                <button
                  key={idx}
                  onClick={() => handleBubbleClick(bubble)}
                  className="bubble"
                >
                  {bubble}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
