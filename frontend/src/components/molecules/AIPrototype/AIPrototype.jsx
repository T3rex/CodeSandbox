import "./AIPrototype.css";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { TfiMicrophone } from "react-icons/tfi";
import { FaArrowRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import useCreateProject from "../../../hooks/apis/mutations/useCreateProject";

const placeholders = [
  "An app that generates poems from images",
  "An app that helps me plan my day",
  "An app that tracks my expenses",
  "An app that suggests workout routines",
  "An app that generates music playlists",
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
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const { createProjectMutate, isPending, isError } = useCreateProject(
    "my-app",
    "ai-generated",
    value
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
  }, [placeholders.length]);

  useEffect(() => {
    if (transcript) {
      setValue(transcript);
    }
  }, [transcript]);

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
      resetTranscript();
    }
  };

  const handleMicClick = () => {
    if (listening) {
      SpeechRecognition.stopListening();
      resetTranscript();
    } else {
      SpeechRecognition.startListening({ language: "en-IN", continuous: true });
    }
  };

  const handleBubbleClick = (bubble) => {
    setValue(bubbles[bubble]);
    inputRef.current?.focus();
  };

  async function handleCreateProject() {
    try {
      const response = await createProjectMutate();
      navigate(`/project/${response.data.projectId}`);
    } catch (error) {
      console.log("Error creating project:", error);
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

        {/* Bubbles */}
        <div className="bubble-container">
          <div
            style={{
              marginRight: "auto",
              cursor: "pointer",
            }}
            onClick={handleMicClick}
          >
            <TfiMicrophone
              color="grey"
              size={25}
              fill={listening ? "white" : "grey"}
            />
          </div>
          {value.length > 15 ? (
            <button className="prototype-button" onClick={handleCreateProject}>
              Prototype with AI <FaArrowRight />
            </button>
          ) : (
            Object.keys(bubbles).map((bubble, idx) => (
              <button
                key={idx}
                onClick={() => handleBubbleClick(bubble)}
                className="bubble"
              >
                {bubble}
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
