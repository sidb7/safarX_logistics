import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";

export const convertXMLToXLSX = async (apiData: any, filename: any) => {
  try {
    const ws = XLSX.utils.json_to_sheet(apiData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet 1");

    const blob = await XLSX.write(wb, {
      bookType: "xlsx",
      type: "array",
    } as any);

    const data = new Blob([blob], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });
    await FileSaver.saveAs(data, filename);
    return true;
  } catch (err: any) {
    console.log("error", err.message);
    return false;
  }
};
