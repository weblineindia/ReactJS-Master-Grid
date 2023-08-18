import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faEdit, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useGridContext } from '../utils/GridContext';

const GridTable = (props) => {
  const {
    data,
    children,
    noRecordMessage,
    noRecordMessageStyle,
    gridTableStyle,
    expandButtonStyle,
    isCheckboxVisible,
    isShowChildrenGrid,
    handleEdit,
    handleSave,
    editedData,
    handleCancelEdit,
    handleSelectCheckbox
  } = props
  const {
    handleExpand,
    isRowExpanded,
    handleCheckboxChange,
    selectedChildData,
    handleParentCheckboxChange,
    selectAllChecked,
    handleSelectAll,
  } = useGridContext();

  
  const getColumnKeysFromChildren = () => {
    const columnKeys = [];
    React.Children.forEach(children, (child) => {
      if (child.type.name === "Column") {
        columnKeys.push({
          columnKey: child.props.columnKey,
          columnType: child.props.columnType,
          isEditable: child.props.isEditable,
          isParent: child.props.isParent,
        });
      }
    });
    return columnKeys;
  };
  const columnKeys = getColumnKeysFromChildren();
  
  const renderTableRow = (item, rowIndex) => {
    const isChildRowExpanded = isRowExpanded(rowIndex);

    return (
      <React.Fragment key={rowIndex}>
        <tr>
          {(isShowChildrenGrid || isCheckboxVisible) && (
            <td>
              {isCheckboxVisible && (
                <>
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleParentCheckboxChange(rowIndex, e.target.checked, data, handleSelectCheckbox)
                    }
                    checked={
                      !!selectedChildData[rowIndex] &&
                      selectedChildData[rowIndex].length === item.children.length
                    }
                  />
                </>
              )}
              {isShowChildrenGrid && (
                <button
                  className={`${expandButtonStyle}`}
                  onClick={() => handleExpand(rowIndex)}
                >
                  <FontAwesomeIcon
                    icon={isRowExpanded(rowIndex) ? faMinus : faPlus}
                  />
                </button>
              )}
            </td>
          )}
          {columnKeys.map((cItem) => (
            <td key={cItem.columnKey}>{item[cItem.columnKey]}</td>
          ))}
        </tr>
        {isShowChildrenGrid && isChildRowExpanded && (
          <>
            {item.children.length > 0 ? (
              item.children.map((child, childIndex) => (
                <tr key={childIndex}>
                  {isCheckboxVisible && (
                    <td key={childIndex}>
                      <input
                        type="checkbox"
                        onChange={(e) => handleCheckboxChange(e, rowIndex, child, data, handleSelectCheckbox)}
                        checked={
                          !!selectedChildData[rowIndex] &&
                          selectedChildData[rowIndex].includes(child)
                        }
                      />
                    </td>)}
                  {columnKeys.map((cItem) => {
                    return (
                      <td key={cItem.columnKey}>
                        {editedData[rowIndex]?.[childIndex]?.edit && cItem.columnKey !== 'action' ? (
                          cItem.columnType === 'text' && cItem.isEditable && !cItem.isParent ?
                            <input
                              type={cItem.columnType}
                              style={{ maxWidth: '100%' }}
                              value={
                                editedData[rowIndex]?.[childIndex]?.[cItem.columnKey] ||
                                child[cItem.columnKey]
                              }
                              onChange={(e) =>
                                handleEdit(rowIndex, childIndex, cItem.columnKey, e.target.value)
                              }
                            /> : child[cItem.columnKey]
                        ) : (
                          <>
                            {cItem.columnKey !== 'action' ?
                              child[cItem.columnKey]
                              :
                              <td key={childIndex}>
                                {editedData[rowIndex]?.[childIndex]?.edit ? (
                                  <>
                                    <button
                                      className={`${expandButtonStyle}`}
                                      onClick={() => handleSave(rowIndex, childIndex, data, columnKeys)}
                                    >
                                      <FontAwesomeIcon icon={faCheck} />
                                    </button>
                                    <button
                                      className={`${expandButtonStyle}`}
                                      onClick={() => handleCancelEdit(rowIndex, childIndex)}
                                    >
                                      <FontAwesomeIcon icon={faTimes} />
                                    </button>
                                  </>
                                ) : (
                                  <button
                                    className={`${expandButtonStyle}`}
                                    onClick={() => handleEdit(rowIndex, childIndex, 'edit', true)}
                                  >
                                    <FontAwesomeIcon icon={faEdit} />
                                  </button>
                                )}
                              </td>
                            }
                          </>
                        )}
                      </td>
                    )
                  }
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columnKeys.length + 2} className={noRecordMessageStyle}>
                  <p>{noRecordMessage}</p>
                </td>
              </tr>
            )}
          </>
        )}
      </React.Fragment>
    );
  };
  return (
    <table className={gridTableStyle}>
      <thead>
        <tr>
          {isCheckboxVisible && (
            <th>
              <input
                type="checkbox"
                onChange={() => handleSelectAll(data, handleSelectCheckbox)}
                checked={selectAllChecked}
              />
            </th>)}
          {(!isCheckboxVisible && isShowChildrenGrid) && <th></th>}
          {children}
        </tr>
      </thead>

      <tbody>
        {data?.length > 0 ? (
          data.map((item, rowIndex) => renderTableRow(item, rowIndex))
        ) : (
          <tr >
            <td colSpan={columnKeys.length + 2} className={noRecordMessageStyle}>
              <p>{noRecordMessage}</p>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default GridTable;

GridTable.propTypes = {
  data: PropTypes.array,
  children: PropTypes.any.isRequired,
  noRecordMessage: PropTypes.string,
  noRecordMessageStyle: PropTypes.any,
  gridTableStyle: PropTypes.any,
  expandButtonStyle: PropTypes.any,
};
