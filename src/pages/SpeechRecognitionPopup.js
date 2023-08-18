/* eslint-disable react-hooks/exhaustive-deps */
/* The SpeechRecognitionPopup component enables voice-based search using the browser's SpeechRecognition API and converts speech into text */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { faMicrophoneLines } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGridContext } from "../utils/GridContext";

const SpeechRecognitionPopup = (props) => {
  const { popupContentStyle, micHandlerForSearch } = props
  const { showPopup, setShowPopup } = useGridContext();
  const [isListening, setIsListening] = useState(false);

  /** Mic Handler */
  const micHandler = (transcript) => {
    setShowPopup(false);
    micHandlerForSearch(transcript);
  }
  useEffect(() => {
    const recognition = new (window["webkitSpeechRecognition"] ||
      window["webkitSpeechRecognitionEvent"] ||
      window["SpeechRecognition"])();
    if (!isListening) {
      // Start listening
      setIsListening(true);
      recognition.start();
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.trim();
        micHandler(transcript);
        setIsListening(false);
      };
    } else {
      // Stop listening
      setIsListening(false);
      recognition.stop();
    }
  }, []);

  if (!showPopup) {
    // Don't render anything if the show prop is false
    return null;
  }

  return (
    <div className={popupContentStyle}>
      {showPopup && (
        <FontAwesomeIcon icon={faMicrophoneLines} beatFade size="2xl" />
      )}
    </div>
  );
};
export default SpeechRecognitionPopup;

SpeechRecognitionPopup.propTypes = {
  popupContentStyle: PropTypes.any,
};
