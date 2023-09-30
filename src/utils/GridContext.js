// The useGridContext manage all the state and methods
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef
} from 'react'

const GridContext = createContext()

export const useGridContext = () => {
  return useContext(GridContext)
}

export const GridProvider = ({ children }) => {
  const [expandedRows, setExpandedRows] = useState([])
  const [showPopup, setShowPopup] = useState(false)
  // Toggle Column (Dynamically add and remove from browser)
  const [columnState, setColumnState] = useState([])
  const [visibleColumns, setVisibleColumns] = useState([])
  const [initialColumnProps, setInitialColumnProps] = useState()

  // New state to manage the visibility of the popup
  const [isPopupVisible, setIsPopupVisible] = useState(false)

  const gridCardRef = useRef(null) // Reference to the grid card div
  const [selectedChildData, setSelectedChildData] = useState({})
  const [selectAllChecked, setSelectAllChecked] = useState(false)
  const [selectedData, setSelectedData] = useState([])

  useEffect(() => {
    if (columnState.length > 0 && visibleColumns.length === 0) {
      setVisibleColumns(columnState)
      setInitialColumnProps(columnState)
    }
  }, [columnState])

  // Function to handle column changes when the user selects or deselects a column
  const handleColumnChange = (e, columnKey) => {
    const columnsData = visibleColumns.filter((x) => x.columnKey !== 'action')
    if (columnsData.length !== 1 || e.target.checked) {
      if (columnsData.find((column) => column.columnKey === columnKey)) {
        // If the column is currently visible, remove it from the visibleColumns array
        setVisibleColumns((prevColumns) =>
          prevColumns.filter((column) => column.columnKey !== columnKey)
        )
      } else {
        // If the column is not visible, add it to the visibleColumns array
        const columnToAdd = initialColumnProps.find(
          (column) => column.columnKey === columnKey
        )
        if (columnToAdd) {
          // Find the index of the column in the initial order
          const columnIndex = initialColumnProps.indexOf(columnToAdd)
          // Insert the column at the same position in the visibleColumns array
          setVisibleColumns((prevColumns) => [
            ...prevColumns.slice(0, columnIndex),
            columnToAdd,
            ...prevColumns.slice(columnIndex)
          ])
        }
      }
    }
  }

  // Function to toggle the visibility of the popup
  const togglePopup = () => {
    setIsPopupVisible((prev) => !prev)
  }

  // Expand to display child data
  const handleExpand = (id) => {
    setExpandedRows((prevExpandedRows) =>
      prevExpandedRows.includes(id)
        ? prevExpandedRows.filter((rowId) => rowId !== id)
        : [...prevExpandedRows, id]
    )
  }
  const isRowExpanded = (id) => {
    return expandedRows.includes(id)
  }

  // Event for showing mic Icon active or not
  const onMicBtn = () => {
    // Toggle the showPopup state to open or close the popup
    setShowPopup(!showPopup)
  }

  // Event for clicking on outside click when popup is on
  const handleOutsideClick = (event) => {
    if (gridCardRef.current && !gridCardRef.current.contains(event.target)) {
      setShowPopup(false)
    }
  }

  // Function to handle checkbox change for child rows
  const handleCheckboxChange = (
    e,
    parentIndex,
    value,
    data,
    handleSelectCheckbox
  ) => {
    const isChildChecked = selectedChildData[parentIndex]?.includes(value)

    const updatedData = { ...selectedChildData }

    if (isChildChecked) {
      updatedData[parentIndex] = selectedChildData[parentIndex].filter(
        (childValue) => childValue !== value
      )
    } else {
      updatedData[parentIndex] = selectedChildData[parentIndex]
        ? [...selectedChildData[parentIndex], value]
        : [value]
    }
    let allParentsChecked = false
    const dataValue = data.map((item) => {
      return item.children
    })
    const originalData = Object.assign({}, dataValue)
    if (
      Object.entries(updatedData).toString() ===
      Object.entries(originalData).toString()
    ) {
      allParentsChecked = true
    } else {
      allParentsChecked = false
    }
    setSelectAllChecked(allParentsChecked)
    setSelectedChildData(updatedData)
    const updatedChildData = {
      ...selectedChildData,
      [parentIndex]: selectedChildData[parentIndex]?.includes(value)
        ? selectedChildData[parentIndex].filter((v) => v !== value)
        : [...(selectedChildData[parentIndex] || []), value]
    }
    const selectedParent = JSON.parse(JSON.stringify(data[parentIndex]))
    const selectedParentIndex = parentIndex

    const updatedSelectedData = [...selectedData]
    if (selectedParentIndex > -1) {
      if (
        updatedSelectedData.length > 0 &&
        updatedSelectedData[selectedParentIndex]
      ) {
        const childData = updatedSelectedData[selectedParentIndex].children
        if (updatedChildData[parentIndex]?.includes(value)) {
          if (!childData.includes(value)) {
            childData.push(value)
            updatedSelectedData[selectedParentIndex].children = childData
          }
        } else {
          selectedParent.children = childData.filter((v) => v !== value)
          if (selectedParent.children.length === 0) {
            updatedSelectedData.splice(selectedParentIndex, 1)
          } else {
            updatedSelectedData[selectedParentIndex] = selectedParent
          }
        }
      } else if (updatedChildData[parentIndex]?.includes(value)) {
        selectedParent.children = [value]
        updatedSelectedData.push(selectedParent)
      }
    } else {
      selectedParent.children = [value]
      updatedSelectedData.push(selectedParent)
    }

    setSelectedData(updatedSelectedData)
    handleSelectCheckbox(updatedSelectedData)
  }

  /** Handle Parent checkbox change */
  const handleParentCheckboxChange = (
    parentIndex,
    isChecked,
    data,
    handleSelectCheckbox
  ) => {
    setSelectedChildData((prevSelectedChildData) => {
      const updatedData = {
        ...prevSelectedChildData,
        [parentIndex]: isChecked ? data[parentIndex]?.children || [] : []
      }

      if (data[parentIndex]?.children.length === 0) {
        delete updatedData[parentIndex]
      }
      if (isChecked) {
        updatedData[parentIndex] = data[parentIndex]?.children || []
      }
      let allParentsChecked = true
      for (const index in data) {
        if (
          !updatedData[index] ||
          updatedData[index].length !== data[index]?.children.length
        ) {
          allParentsChecked = false
          break
        }
      }
      setSelectAllChecked(allParentsChecked)
      return updatedData
    })
    if (isChecked) {
      setSelectedData((prevSelectedData) => {
        const selectedValue = data[parentIndex] || {}
        handleSelectCheckbox([...prevSelectedData, selectedValue])
        return [...prevSelectedData, selectedValue]
      })
    } else {
      setSelectedData((prevSelectedData) => {
        const updatedSelectedData = prevSelectedData.filter(
          (x) => JSON.stringify(x) !== JSON.stringify(data[parentIndex])
        )
        handleSelectCheckbox(updatedSelectedData)
        return updatedSelectedData
      })
    }
  }

  /** Handle Select All Checkbox */
  const handleSelectAll = (data, handleSelectCheckbox) => {
    if (!selectAllChecked) {
      const newData = {}
      data.forEach((item, index) => {
        newData[index] = item.children
      })
      setSelectedChildData(newData)
    } else {
      setSelectedChildData({})
    }
    setSelectedData([...data])
    handleSelectCheckbox([...data])
    setSelectAllChecked(!selectAllChecked)
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick)
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [])

  const contextValue = {
    handleExpand,
    isRowExpanded,
    onMicBtn,
    gridCardRef,
    showPopup,
    isPopupVisible,
    togglePopup,
    columnState,
    setColumnState,
    visibleColumns,
    handleColumnChange,
    setShowPopup,
    handleCheckboxChange,
    selectedChildData,
    handleParentCheckboxChange,
    selectAllChecked,
    handleSelectAll,
    selectedData
  }

  return (
    <GridContext.Provider value={contextValue}>{children}</GridContext.Provider>
  )
}
