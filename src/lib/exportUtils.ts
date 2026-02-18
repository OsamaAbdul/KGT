import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";

export const exportToPDF = (data: any[], columns: string[], filename: string) => {
    const doc = new jsPDF();
    const tableData = data.map(item => columns.map(col => item[col]));

    (doc as any).autoTable({
        head: [columns.map(col => col.replace(/_/g, ' ').toUpperCase())],
        body: tableData,
    });

    doc.save(`${filename}.pdf`);
};

export const exportToExcel = (data: any[], filename: string) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
    XLSX.writeFile(workbook, `${filename}.xlsx`);
};
