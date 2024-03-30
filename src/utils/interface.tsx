// Common Interface
export interface ParameterProps {
  page: number;
  records: number;
  searchQuery: string;
  sortColumn: string;
  sortOrder: string;
}

// Column
export interface ColumnProps {
  columnKey: string;
  label?: string;
  type?: string
  isEditable?: boolean;
  isParent?: string | boolean;
  columnType?:string;
  handleSort?: (key: string) => void;
  parameter?: ParameterProps
}

// ColumnVisibilityToggle
export interface ColumnVisibilityToggleProps {
  columnVisibilityStyle: string;
  label: string;
  closeBtnLabel: string;
}

// Dropdown
export interface DropdownProps {
  PaginationDropDownValues: number[];
  parameter: ParameterProps;
  onDropdownChange: (value: any) => void;
  
}

// ExcelExporter
export interface ExcelExporterProps {
  data: [];
  headers: ColumnProps[];
  filename: string;
  exportBtnStyle: any;
  label: string;
}

//Grid
export interface GridProps {
  isSearch: boolean;
  searchProps: any;
  isVoiceSearch:boolean;
  voiceSearchProps:any;
  isColumnVisibility:boolean;
  columnVisibilityProps:ColumnVisibilityToggleProps;
  gridTableProps:any;
  columnProps:ColumnProps[];
  isPagination:boolean;
  paginationContainerProps:any;
  isExcelAllowed:boolean;
  excelProps:ExcelExporterProps
}

// GridTableProps
export interface GridTableProps {
  data: [],
  children:any,
  noRecordMessage : string,
  noRecordMessageStyle:any,
  gridTableStyle:any,
  expandButtonStyle:any,
  isCheckboxVisible:boolean,
  isShowChildrenGrid:boolean,
  handleEdit: (
    rowIndex: number,
    childIndex: number,
    columnKey: string,
    value: string | boolean 
  ) => void;
  handleSave: (
    rowIndex: number,
    childIndex: number,
    data: any[], 
    columnKeys: ColumnProps[] 
  ) => void;
  editedData: Record<number, Record<number, { edit: boolean }>>; 
  handleCancelEdit: (rowIndex: number, childIndex: number) => void;
  handleSelectCheckbox: (
    rowIndex: number,
    childIndex: number,
    childData: any, 
    handleSelectCheckbox: any 
  ) => void;
}

// Pagination
export interface PaginationProps {
  totalPages?: number;
  paginationStyle: string;
  paginationActiveStyle: string;
  handlePageChange: (page: number) => void;
  parameter: ParameterProps
} 

// PaginationContainer
export interface PaginationContainerProps extends DropdownProps, PaginationProps {
  data: {
    totalPages: number;
  };
  paginationRecordsSpan: string;
  customRecordMessage: string;
  paginationContainerStyle: any;
} 

// SearchInput
export interface SearchInputProps {
  searchPlaceHolder: string;
  searchBoxStyle: any;
  searchInputStyle: any;
  clearButtonStyle: any;
  onSearch: (value: string) => void;
  parameter: ParameterProps
}

// SpeechRecognitionPopup
export interface SpeechRecognitionPopupProps {
  popupContentStyle: any;
  micHandlerForSearch: (transcript: string) => void;
}

// VoiceBaseSearch
export interface VoiceBaseSearchProps {
  micIconStyle: any;
  popupContentStyle: any;
  micHandlerForSearch: (value: any) => void; 
}

// GridContext
export interface GridContextProps {
  handleExpand?: (id: number) => void;
  isRowExpanded?: (id: number) => boolean;
  onMicBtn?: () => void;
  gridCardRef?: React.MutableRefObject<null>;
  showPopup?: boolean;
  isPopupVisible?: boolean;
  togglePopup?: () => void;
  columnState?: any[]; 
  setColumnState?: React.Dispatch<React.SetStateAction<any[]>>; 
  visibleColumns?: any[]; 
  handleColumnChange?: (e: React.ChangeEvent<HTMLInputElement>, columnKey: string) => void;
  setShowPopup?: React.Dispatch<React.SetStateAction<boolean>>;
  handleCheckboxChange?: (
    e: React.ChangeEvent<HTMLInputElement>,
    parentIndex: number,
    value: any,
    data: any,
    handleSelectCheckbox: any
  ) => void;
  selectedChildData?: Record<number, any[]>; 
  handleParentCheckboxChange?: (
    parentIndex: number,
    isChecked: boolean,
    data: any,
    handleSelectCheckbox: any
  ) => void;
  selectAllChecked?: boolean;
  handleSelectAll?: (data: any, handleSelectCheckbox: any) => void;
  selectedData?: any[]; 
}

export interface GridProviderProps {
  children: any;
}


