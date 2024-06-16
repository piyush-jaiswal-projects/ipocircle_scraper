import * as XLSX from "xlsx";
import * as fs from "fs";

interface DataObject {
  [key: string]: any;
}

export default function exportToExcel(data: DataObject[], fileName: string) {
  // Create a new workbook
  const workbook = XLSX.utils.book_new();

  // Convert the data to a worksheet
  const worksheet = XLSX.utils.json_to_sheet(data);

  // Append the worksheet to the workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  // Write the workbook to a buffer
  const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });

  // Write the buffer to a file
  fs.writeFileSync(fileName, buffer);
}
