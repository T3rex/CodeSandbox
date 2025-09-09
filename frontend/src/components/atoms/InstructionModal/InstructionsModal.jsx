import { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import "./InstructionsModal.css";

export default function InstructionsModal({
  isInstructionsOpen,
  setIsInstructionsOpen,
}) {
  return (
    <div>
      {/* Button to open modal */}

      <AnimatePresence>
        {isInstructionsOpen && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* Close button */}
              <button
                onClick={() => setIsInstructionsOpen(false)}
                className="close-btn"
              >
                <IoCloseSharp color="white" />
              </button>

              {/* Modal Content */}
              <h2>How to Use MyCodeBox</h2>
              <h3>Creating a New Project</h3>
              <ul>
                <li>
                  Start a new project either with AI Prototyping or by launching
                  a codebox template (React, Vue, Qwik, Angular, etc.).
                </li>
                <li>
                  AI-generated projects may take a few minutes to initialize,
                  while common templates (React, Vue, Qwik) usually load within
                  seconds.
                </li>
                <li>
                  Initialization commands may vary depending on AI output, check
                  the generated package.json or README.md for details.
                </li>
                <li>
                  Project intializing commands may differ based on AI output
                  please refer to generated package.json or README.md files.
                </li>
                <li>
                  Dependencies are installed automatically, but you can use the
                  terminal if any are missing.
                </li>
              </ul>

              <h3>Limitations and Considerations</h3>
              <ul>
                <li>
                  MyCodebox uses the <strong>Gemini 2.5 free tier</strong> ,
                  which has limited quota. You can add your own Gemini API key
                  via the key icon if needed.
                </li>
                <li>
                  AI-prototyped projects may contain errors—use the terminal
                  output to debug and adjust the generated code.
                </li>
                <li>
                  Prototyping complex projects may not always work as expected.
                </li>
                <li>
                  Projects are temporary and will be deleted after 1–2 days.
                </li>
                <li>
                  This is a solo-developer project, so some features may be
                  limited.
                </li>
              </ul>

              <div className="footer">
                <button
                  onClick={() => setIsInstructionsOpen(false)}
                  className="confirm-btn"
                >
                  Got it
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
