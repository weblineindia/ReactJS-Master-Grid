/* The Column component represents each column header in the data table. */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { ColumnProps } from '../utils/interface';

const Column: React.FC<ColumnProps> = (props) => {
  const { label, columnKey, handleSort, parameter } = props

  const isSorted = parameter?.sortColumn === 'action' ? false : parameter?.sortColumn === columnKey;
  const arrowIcon = isSorted ? (
    <FontAwesomeIcon icon={parameter?.sortOrder === 'ASC' ? faArrowUp : faArrowDown} />
    ) : null;

  return (
    <th onClick={() =>  handleSort && handleSort(columnKey)}>
      {label} {arrowIcon}
    </th>
  );
};
export default Column;
