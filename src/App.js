/* eslint-disable react-hooks/exhaustive-deps */
import "./styles.css";
import Grid from "./pages/Grid";
import { useGridContext } from "./utils/GridContext";
import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const { setColumnState, visibleColumns } = useGridContext();
  const [data, setData] = useState({});
  const [allData, setAllData] = useState([]);
  const [parameter, setParameter] = useState({
    page: 1,
    records: 10,
    searchQuery: "",
    sortColumn: "",
    sortOrder: "ASC",
  });
  const [editedData, setEditedData] = useState([]);

  const columnProps = [
    { columnKey: "roleName", label: "Role", type: "text", isParent: true, isEditable: true },
    { columnKey: "userName", label: "Name", type: 'text', isEditable: true },
    { columnKey: "emailId", label: "Email ID", type: 'text', isEditable: true },
    { columnKey: "phone_no", label: "Mobile Number", type: 'text', isEditable: true },
    { columnKey:"gender", label: "Gender",type :'text' ,isEditable :true},
    { columnKey: "age", label: "Age", type: 'number', isEditable: true },
    { columnKey: "country", label: "Country", type: 'dropdown' },
    { columnKey:"action", label: "Action" ,type :'button'},
  ];

  useEffect(() => {
    setColumnState(columnProps);
    getData();
  }, [parameter]);

  useEffect(() => {
    getAllData();
  }, []);

  const getData = async () => {
    const response = await axios.get(
      `http://localhost:3000/master-grid?page=${parameter.page}&limit=${parameter.records}&search=${parameter.searchQuery}&sortField=${parameter.sortColumn}&sortOrder=${parameter.sortOrder}`
    );
    setData(response.data);
  };

  const getAllData = async () => {
    const response = await axios.get(`http://localhost:3000/master-grid/all`);
    setAllData(response.data);
  };


  const handlePageChange = (page) => {
    setParameter({ ...parameter, page: page });
  };

  // Dropdown change event for pagination
  const onDropdownChange = (records) => {
    setParameter({ ...parameter, records: records });
  };


  // Sorting
  const handleSort = (field) => {
    if (field !== "action") {
      if (field === parameter.sortColumn) {
        // Reverse the sort direction if the same column is clicked
        const order = parameter.sortOrder === "ASC" ? "DESC" : "ASC";
        setParameter({ ...parameter, sortOrder: order });
      } else {
        // Set the new sort column and default sort direction
        setParameter({ ...parameter, sortColumn: field, sortOrder: "ASC" });
      }
    }
  };

  // Searching
  const onSearch = (value) => {
    setParameter({ ...parameter, searchQuery: value });
  };
  // clear search Input
  const onClear = () => {
    onSearch('');
  };

  // Event for storing the searchQuery based on voice search
  const micHandlerForSearch = (value) => {
    setParameter((prevParameter) => ({
      ...prevParameter,
      searchQuery: value,
    }));
  };


  // Function to handle inline edit for child rows
  const handleEdit = (rowIndex, childIndex, columnKey, value) => {
    const updatedData = [...editedData];
    if (!updatedData[rowIndex]) {
      updatedData[rowIndex] = [];
    }
    if (!updatedData[rowIndex][childIndex]) {
      updatedData[rowIndex][childIndex] = {};
    }
    updatedData[rowIndex][childIndex][columnKey] = value;
    setEditedData(updatedData);
  };

  // Function to save the edited data back to the main data array
  const handleSave = (rowIndex, childIndex, data, columnKeys) => {
    const updatedData = [...data];
    const editedRowData = editedData[rowIndex]?.[childIndex];
    if (editedRowData) {
      columnKeys.forEach((columnKey) => {
        if (editedRowData.hasOwnProperty(columnKey.columnKey)) {
          updatedData[rowIndex].children[childIndex][columnKey.columnKey] =
            editedRowData[columnKey.columnKey];
        }
      });
    }
    setEditedData((prevEditedData) => {
      const updatedEditedData = [...prevEditedData];
      updatedEditedData[rowIndex][childIndex].edit = false;
      return updatedEditedData;
    });
  };

  // Function to cancel the edit and discard changes
  const handleCancelEdit = (rowIndex, childIndex) => {
    const updatedData = [...editedData];
    updatedData[rowIndex][childIndex].edit = false;
    setEditedData(updatedData);
  };


  const handleSelectCheckbox = (selectedData) => {
    console.log(selectedData)
  }

  const isSearch = true;
  const searchProps = {
    searchPlaceHolder: "Search/Speak Something...",
    searchBoxStyle: "search-box",
    searchInputDivStyle: "input-area",
    searchInputStyle: "search-input",
    clearButtonStyle: "clear-button",
    onSearch: onSearch,
    onClearBtn: onClear,
    parameter:parameter
  };

  const isVoiceSearch = true;
  const voiceSearchProps = {
    micIconStyle: "mic-icon",
    popupContentStyle: "large-mic",
    micHandlerForSearch: micHandlerForSearch
  };

  const isColumnVisibility = true;
  const columnVisibilityProps = {
    columnVisibilityStyle: "column-visibility",
    label: 'Manage Columns',
    closeBtnLabel:'Close'
  };

  const gridTableProps = {
    data: data?.data,
    noRecordMessage: "No Records Available",
    gridTableDivStyle: "table-container",
    noRecordMessageStyle: "no-record-message-style", 
    gridTableStyle: "grid-table",
    expandButtonStyle: "expand-button",
    isCheckboxVisible: true,
    isShowChildrenGrid: true,
    isEditableGrid: true,
    handleSort,
    parameter,
    handleEdit,
    handleSave,
    editedData,
    handleCancelEdit,
    handleSelectCheckbox
  };


  const isPagination = true;
  const paginationContainerProps = {
    data: data,
    PaginationDropDownValues: [5, 10, 20, 50, 100],
    paginationRecordsSpan: "Records Per Page:",
    customRecordMessage: `Showing ${parameter.records} of ${data?.childrenRecords} records`,
    paginationContainerStyle: "pagination-container",
    paginationStyle: "pagination",
    paginationActiveStyle: "active",
    handlePageChange: handlePageChange,
    parameter: parameter,
    onDropdownChange: onDropdownChange
  };

  const isExcelAllowed = true;
  const excelProps = {
    data: allData,
    headers: columnProps,
    filename: "Data",
    exportBtnStyle: "button",
    label: "Export to Excel",
  };

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Master-Grid Component</h1>
      <Grid
        isSearch={isSearch}
        searchProps={searchProps}
        isVoiceSearch={isVoiceSearch}
        voiceSearchProps={voiceSearchProps}
        gridTableProps={gridTableProps}
        isColumnVisibility={isColumnVisibility}
        columnVisibilityProps={columnVisibilityProps}
        columnProps={visibleColumns}
        isPagination={isPagination}
        paginationContainerProps={paginationContainerProps}
        isExcelAllowed={isExcelAllowed}
        excelProps={excelProps}
      />
    </>
  );
};
export default App;
