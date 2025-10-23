import * as XLSX from 'xlsx'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

export function exportToXLSX(rows, filename = 'relatorio.xlsx'){
  const ws = XLSX.utils.json_to_sheet(rows)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Relatório')
  XLSX.writeFile(wb, filename)
}

export function exportToPDF(rows, filename = 'relatorio.pdf'){
  const doc = new jsPDF()
  if(!rows || rows.length === 0){
    doc.text('Sem dados para exportar', 14, 16)
    return doc.save(filename)
  }
  const headers = Object.keys(rows[0])
  const body = rows.map(r => headers.map(h => String(r[h] ?? '')))
  autoTable(doc, { head: [headers], body, startY: 20, styles: { fontSize: 8 }, headStyles: { fillColor: [15,23,42] } })
  doc.save(filename)
}
