/* The PaginationContainer component wraps the Dropdown and Pagination components together. */
import React from 'react'
import PropTypes from 'prop-types'
import Dropdown from './Dropdown'
import Pagination from './Pagination'

const PaginationContainer = (props) => {
  const {
    data,
    paginationRecordsSpan = 'Show Per Page:',
    customRecordMessage = `Showing 10 of 10 records`,
    paginationContainerStyle
  } = props
  return (
    <div className={paginationContainerStyle}>
      <span>{paginationRecordsSpan}</span>
      {/* Dropdown */}
      <Dropdown {...props} />
      <span>{customRecordMessage}</span>
      {/* Pagination */}
      <Pagination totalPages={data?.totalPages} {...props} />
    </div>
  )
}
export default PaginationContainer

PaginationContainer.propTypes = {
  data: PropTypes.any.isRequired,
  PaginationDropDownValues: PropTypes.array.isRequired,
  paginationRecordsSpan: PropTypes.string,
  customRecordMessage: PropTypes.string,
  paginationContainerStyle: PropTypes.any,
  paginationStyle: PropTypes.any,
  paginationActiveStyle: PropTypes.any
}
