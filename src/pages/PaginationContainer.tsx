/* The PaginationContainer component wraps the Dropdown and Pagination components together. */
import React from 'react';
import Dropdown from './Dropdown.tsx';
import Pagination from './Pagination.tsx';
import { PaginationContainerProps } from '../utils/interface.tsx';



const PaginationContainer: React.FC<PaginationContainerProps> = (props) => {
  const {
    data,
    paginationRecordsSpan = 'Show Per Page:',
    customRecordMessage = `Showing 10 of 10 records`,
    paginationContainerStyle} = props
  return (
    <div className={paginationContainerStyle}>
      <span>{paginationRecordsSpan}</span>
      {/* Dropdown */}
      <Dropdown {...props} />
      <span>{customRecordMessage}</span>
      {/* Pagination */}
      <Pagination
        totalPages={data?.totalPages}
        {...props}
      />
    </div>
  );
};
export default PaginationContainer;