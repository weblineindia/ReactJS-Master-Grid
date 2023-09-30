/* The SearchInput component renders an input field for searching within the data table. */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const SearchInput = (props) => {
  const {
    searchPlaceHolder = 'Search...',
    searchBoxStyle,
    searchInputStyle,
    clearButtonStyle,
    onSearch,
    parameter
  } = props

  const [searchTimeout, setSearchTimeout] = useState(null)
  const [searchValue, setSearchValue] = useState('')

  /** Handle Input Change */
  const handleInputChange = (e) => {
    const inputValue = e.target.value
    setSearchValue(inputValue)
    if (searchTimeout) {
      clearTimeout(searchTimeout)
    }
    const timeout = setTimeout(() => {
      onSearch(inputValue)
    }, 1000)
    setSearchTimeout(timeout)
  }

  /** Handle Clear button click  */
  const handleClearClick = () => {
    setSearchValue('')
    onSearch('')
  }

  return (
    <React.Fragment>
      <div className={searchBoxStyle}>
        <input
          type='text'
          value={searchValue || parameter.searchQuery}
          onChange={handleInputChange}
          placeholder={searchPlaceHolder}
          className={searchInputStyle}
        />
        {parameter.searchQuery && (
          <button className={clearButtonStyle} onClick={handleClearClick}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        )}
      </div>
    </React.Fragment>
  )
}
export default SearchInput

SearchInput.propTypes = {
  searchPlaceHolder: PropTypes.string,
  searchBoxStyle: PropTypes.any,
  searchInputStyle: PropTypes.any,
  clearButtonStyle: PropTypes.any
}
