/* The Dropdown component renders a dropdown to select the number of records per page in pagination. */
import React from 'react';
import PropTypes from 'prop-types';


const Dropdown = (props) => {
  const { PaginationDropDownValues, parameter, onDropdownChange } =props

  return (
    <select value={parameter.records} onChange={(e) => onDropdownChange(e.target.value)}>
      {PaginationDropDownValues.map((optionValue) => (
        <option key={optionValue} value={optionValue}>
          {optionValue}
        </option>
      ))}
    </select>
  );
};
export default Dropdown;

Dropdown.propTypes = {
  PaginationDropDownValues: PropTypes.array.isRequired
}