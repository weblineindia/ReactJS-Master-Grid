/* eslint-disable array-callback-return */
import React from "react";
import { useGridContext } from "../utils/GridContext.tsx";
import { ExcelExporterProps } from "../utils/interface";

const ExcelExporter: React.FC<ExcelExporterProps> = (props) => {
  const { filename, exportBtnStyle, label, headers, data } = props;
 
  const { selectAllChecked, selectedData } = useGridContext();

  /** Method to download csv*/
  const downloadCSV = (csvData, filename) => {
    const blob = new Blob([csvData.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${filename}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  /** Method to generate csv*/
  const generateCSV = async (data, headers, filename) => {
    try {
      const headerKeys = headers.filter((x) => x.columnKey !== 'action').map((header) => header.columnKey);
      const headerLabels = headers.filter((x) => x.columnKey !== 'action').map((header) => header.label);
      const csvRows: string[] = [];
      csvRows.push(headerLabels.join(','));
      // Create data rows
      data.forEach((role) => {
        // Add parent row
        const parentValues = headerKeys.map((header) => role[header]);
        csvRows.push(parentValues.join(','));
        // Add child rows
        if (role.children.length > 0) {
          role.children.forEach((child) => {
            const childValues = headerKeys.map((header) => child[header] || '');
            csvRows.push(childValues.join(','));
          });
        }
      });
      csvRows.join('\n');
      downloadCSV(csvRows, filename);
    } catch (error) {
      console.error("Error while exporting data to CSV:", error);
    }
  };

 /** Handle Export to  Excel*/
  const exportToExcel = () => {
    try {
      if (!selectAllChecked) {
        generateCSV(selectedData, headers, filename);
      } else {
        generateCSV(data, headers, filename);
      }
    } catch (error) {
      console.error("Error while exporting data to CSV:", error);
    }
  };

  return (
    <button className={exportBtnStyle} onClick={exportToExcel}>
      {label}
    </button>
  );
};

export default ExcelExporter;
