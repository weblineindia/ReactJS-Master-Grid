/* The Column component represents each column header in the data table. */
import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons'

const Column = (props) => {
  const { label, columnKey, handleSort, parameter } = props

  const isSorted =
    parameter.sortColumn === 'action'
      ? false
      : parameter.sortColumn === columnKey
  const arrowIcon = isSorted ? (
    <FontAwesomeIcon
      icon={parameter.sortOrder === 'ASC' ? faArrowUp : faArrowDown}
    />
  ) : null

  return (
    <th onClick={() => handleSort(columnKey)}>
      {label} {arrowIcon}
    </th>
  )
}
export default Column

Column.propTypes = {
  columnKey: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
}
