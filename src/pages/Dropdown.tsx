/* The Dropdown component renders a dropdown to select the number of records per page in pagination. */
import React from 'react';
import { DropdownProps } from '../utils/interface';



  const Dropdown: React.FC<DropdownProps> = (props) => {
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
