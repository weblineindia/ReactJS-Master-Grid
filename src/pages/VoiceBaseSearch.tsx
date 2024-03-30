/* The VoiceBaseSearch component enables voice-based search using the browser's SpeechRecognition API */
import { useGridContext } from "../utils/GridContext.tsx";
import SpeechRecognitionPopup from "./SpeechRecognitionPopup.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMicrophone } from "@fortawesome/free-solid-svg-icons"
import React, { useEffect } from 'react';
import { VoiceBaseSearchProps } from '../utils/interface.tsx';
 
interface CustomWindow extends Window {
    SpeechRecognition?: any;
    webkitSpeechRecognition?: any;
  }
const VoiceBaseSearch: React.FC<VoiceBaseSearchProps> = (props) => {
    const { micIconStyle, popupContentStyle, micHandlerForSearch } = props
    const {
        onMicBtn,
        showPopup
    } = useGridContext();
    const [supported, setSupported] = React.useState(false)
 
    useEffect(() => {
        const customWindow = window as CustomWindow;
   
        if (typeof customWindow === 'undefined') return;       
        customWindow.SpeechRecognition =
          customWindow.SpeechRecognition || customWindow.webkitSpeechRecognition;
   
        if (customWindow.SpeechRecognition) {
          setSupported(true);
        }
      }, []);
    return (
        <>
            {supported && (
                <>
                    <span className={micIconStyle}>
                        <FontAwesomeIcon icon={faMicrophone} onClick={onMicBtn} />
                    </span>
                    {showPopup && (<SpeechRecognitionPopup popupContentStyle={popupContentStyle} micHandlerForSearch={micHandlerForSearch}/>)}
                </>
            )}
        </>
    )
}
export default VoiceBaseSearch;