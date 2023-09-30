/* The VoiceBaseSearch component enables voice-based search using the browser's SpeechRecognition API */
import PropTypes from 'prop-types'
import { useGridContext } from '../utils/GridContext'
import SpeechRecognitionPopup from './SpeechRecognitionPopup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrophone } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect } from 'react'

const VoiceBaseSearch = (props) => {
  const { micIconStyle, popupContentStyle, micHandlerForSearch } = props
  const { onMicBtn, showPopup } = useGridContext()
  const [supported, setSupported] = React.useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition
    if (window.SpeechRecognition) {
      setSupported(true)
    }
  }, [])
  return (
    <React.Fragment>
      {supported && (
        <React.Fragment>
          <span className={micIconStyle}>
            <FontAwesomeIcon icon={faMicrophone} onClick={onMicBtn} />
          </span>
          {showPopup && (
            <SpeechRecognitionPopup
              popupContentStyle={popupContentStyle}
              micHandlerForSearch={micHandlerForSearch}
            />
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  )
}
export default VoiceBaseSearch

VoiceBaseSearch.propTypes = {
  micIconStyle: PropTypes.any,
  popupContentStyle: PropTypes.any
}
