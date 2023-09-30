/* The Pagination component handles pagination and renders the page numbers. */
import React from 'react'
import PropTypes from 'prop-types'

const Pagination = (props) => {
  const {
    totalPages = 1,
    paginationStyle,
    paginationActiveStyle,
    handlePageChange,
    parameter
  } = props

  return (
    <ul className={paginationStyle}>
      {Array.from({ length: totalPages }, (_, index) => (
        <li
          key={index}
          className={index + 1 === parameter.page ? paginationActiveStyle : ''}
          onClick={() => handlePageChange(index + 1)}
        >
          {index + 1}
        </li>
      ))}
    </ul>
  )
}
export default Pagination

Pagination.propTypes = {
  totalPages: PropTypes.number,
  paginationStyle: PropTypes.any,
  paginationActiveStyle: PropTypes.any
}
