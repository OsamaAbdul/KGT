import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

export const exportToPDF = (data: any[], columns: string[], filename: string) => {
    const doc = new jsPDF();

    // Header
    doc.setFontSize(18);
    doc.setTextColor(0, 168, 107); // Kogi Green
    doc.text("KOGI GLOBAL TRACKER", 14, 20);

    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text(filename.replace(/_/g, ' ').toUpperCase(), 14, 28);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 34);

    const tableData = data.map(item => columns.map(col => {
        const val = item[col];
        if (typeof val === 'boolean') return val ? "VERIFIED" : "PENDING";
        if (val === null || val === undefined) return "N/A";
        return String(val);
    }));

    autoTable(doc, {
        head: [columns.map(col => col.replace(/_/g, ' ').toUpperCase())],
        body: tableData,
        startY: 40,
        styles: { fontSize: 8, cellPadding: 2 },
        headStyles: {
            fillColor: [0, 168, 107],
            textColor: [255, 255, 255],
            fontStyle: 'bold'
        },
        alternateRowStyles: { fillColor: [245, 247, 250] },
    });

    doc.save(`${filename}.pdf`);
};

export const exportToExcel = (data: any[], filename: string) => {
    // Flatten data for better excel visibility if there are nested roles
    const flattenedData = data.map(item => {
        const newItem = { ...item };
        if (item.user_roles) {
            newItem.role = item.user_roles[0]?.role || 'user';
            delete newItem.user_roles;
        }
        return newItem;
    });

    const worksheet = XLSX.utils.json_to_sheet(flattenedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Node Registry");
    XLSX.writeFile(workbook, `${filename}.xlsx`);
};
