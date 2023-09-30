/* The Grid component is the main component that wraps other sub-components and handles the grid's functionality. */
import PropTypes from 'prop-types'
import GridTable from './GridTable'
import Column from './Column'
import SearchInput from './SearchInput'
import VoiceBaseSearch from './VoiceBaseSearch'
import PaginationContainer from './PaginationContainer'
import { useGridContext } from '../utils/GridContext'
import ExcelExporter from './ExcelExporter'
import { faSliders } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ColumnVisibilityToggle from './ColumnVisibilityToggle'
import React from 'react'

const Grid = ({
  isSearch,
  searchProps,
  isVoiceSearch,
  voiceSearchProps,
  isColumnVisibility,
  columnVisibilityProps,
  gridTableProps,
  columnProps,
  isPagination,
  paginationContainerProps,
  isExcelAllowed,
  excelProps
}) => {
  const { showPopup, gridCardRef, isPopupVisible, togglePopup } =
    useGridContext()

  const columData = gridTableProps.isEditableGrid
    ? columnProps
    : columnProps.filter((x) => x.columnKey !== 'action')

  return (
    <div ref={gridCardRef}>
      {/* Search Textbox */}
      <div className={searchProps.searchInputDivStyle}>
        {isSearch && <SearchInput {...searchProps} />}
        {/* Voice base Searching */}
        {isSearch && isVoiceSearch && <VoiceBaseSearch {...voiceSearchProps} />}

        {/* Toggle Column */}
        {isColumnVisibility && (
          <div className={voiceSearchProps.micIconStyle}>
            <FontAwesomeIcon icon={faSliders} onClick={togglePopup} />
          </div>
        )}
        {isPopupVisible && isColumnVisibility && (
          <ColumnVisibilityToggle {...columnVisibilityProps} />
        )}
      </div>
      <div className={showPopup ? 'blur' : ''}>
        {/* Grid table */}
        <div className={gridTableProps.gridTableDivStyle}>
          <GridTable {...gridTableProps}>
            {columData?.map((column, index) => {
              return (
                <Column
                  key={index}
                  columnKey={column.columnKey}
                  columnType={column.type}
                  label={column.label}
                  handleSort={gridTableProps.handleSort}
                  parameter={gridTableProps.parameter}
                  isParent={column.isParent}
                  isEditable={column.isEditable}
                />
              )
            })}
          </GridTable>

          {/* Export in Excel file */}
          <div className='row'>
            {isExcelAllowed && <ExcelExporter {...excelProps} />}

            {/* Pagination */}
            {isPagination && (
              <PaginationContainer {...paginationContainerProps} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
export default Grid

Grid.propTypes = {
  isSearch: PropTypes.bool.isRequired,
  searchProps: PropTypes.object,
  isVoiceSearch: PropTypes.bool.isRequired,
  voiceSearchProps: PropTypes.object,
  isColumnVisibility: PropTypes.bool.isRequired,
  columnVisibilityProps: PropTypes.object,
  gridTableProps: PropTypes.object.isRequired,
  columnProps: PropTypes.any,
  isPagination: PropTypes.bool.isRequired,
  paginationContainerProps: PropTypes.object,
  isExcelAllowed: PropTypes.bool.isRequired,
  excelProps: PropTypes.object
}
