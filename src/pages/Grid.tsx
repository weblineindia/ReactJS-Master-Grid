/* The Grid component is the main component that wraps other sub-components and handles the grid's functionality. */
import GridTable from './GridTable.tsx';
import Column from "./Column.tsx";
import SearchInput from "./SearchInput.tsx";
import VoiceBaseSearch from "./VoiceBaseSearch.tsx";
import PaginationContainer from "./PaginationContainer.tsx";
import { useGridContext } from "../utils/GridContext.tsx";
import ExcelExporter from './ExcelExporter.tsx';
import { faSliders } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ColumnVisibilityToggle from './ColumnVisibilityToggle.tsx';
import React from 'react';
import { GridProps } from '../utils/interface.tsx';

const Grid: React.FC<GridProps> = ({
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
    const {
        showPopup,
        gridCardRef,
        isPopupVisible,
        togglePopup,
        
    } = useGridContext();

    const columData = gridTableProps.isEditableGrid ? columnProps : columnProps.filter((x) => x.columnKey !== 'action')

    return (
        <div ref={gridCardRef}>
            {/* Search Textbox */}
            <div className={searchProps.searchInputDivStyle}>
                {isSearch &&
                    <SearchInput {...searchProps} />
                }
                {/* Voice base Searching */}
                {isSearch && isVoiceSearch &&
                    <VoiceBaseSearch {...voiceSearchProps} />
                }

                {/* Toggle Column */}
                {isColumnVisibility &&
                    <div className={voiceSearchProps.micIconStyle}>
                        <FontAwesomeIcon icon={faSliders} onClick={togglePopup} />
                    </div>
                }
                {isPopupVisible && isColumnVisibility &&
                    <ColumnVisibilityToggle
                       {...columnVisibilityProps}
                       />
                    }
            </div>
            <div className={showPopup ? 'blur' : ''}>
                {/* Grid table */}
                <div className={gridTableProps.gridTableDivStyle}>
                    <GridTable {...gridTableProps}>
                        {
                            columData?.map((column, index) => {
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
                                );
                            })
                        }
                    </GridTable>

                    {/* Export in Excel file */}
                    <div className='row'>
                        {isExcelAllowed &&
                            <ExcelExporter {...excelProps} />

                        }

                        {/* Pagination */}
                        {isPagination &&
                            <PaginationContainer {...paginationContainerProps} />
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Grid;
