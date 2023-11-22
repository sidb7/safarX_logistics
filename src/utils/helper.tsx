import React from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const convertToXLSX = (data: any, fileName: any) => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet 1");

  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx" });

  const blob = new Blob([excelBuffer], { type: "text/plain;charset=utf-8" });
  console.log(blob, "hh");
  saveAs(blob, fileName);
};
