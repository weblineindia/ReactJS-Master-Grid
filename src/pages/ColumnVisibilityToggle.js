/* The ColumnVisibilityToggle component renders a popup menu to select the number of columns to be displayed in browser. */
import React from 'react'
import { useGridContext } from '../utils/GridContext'
import PropTypes from 'prop-types'

const ColumnVisibilityToggle = (props) => {
  const { columnVisibilityStyle, label, closeBtnLabel } = props
  const { togglePopup, columnState, visibleColumns, handleColumnChange } =
    useGridContext()

  const onCancel = () => {
    togglePopup()
  }

  const columnsData = visibleColumns.filter((x) => x.columnKey !== 'action')

  return (
    <div className={columnVisibilityStyle}>
      <h3>{label}</h3>
      {columnState
        .filter((x) => x.columnKey !== 'action')
        .map((column) => (
          <div key={column.columnKey}>
            <input
              type='checkbox'
              checked={columnsData.some(
                (c) => c.columnKey === column.columnKey
              )}
              onChange={(e) => handleColumnChange(e, column.columnKey)}
            />
            <label>{column.label}</label>
          </div>
        ))}
      <button onClick={onCancel}>{closeBtnLabel}</button>
    </div>
  )
}

export default ColumnVisibilityToggle

ColumnVisibilityToggle.propTypes = {
  columnVisibilityStyle: PropTypes.any
}
