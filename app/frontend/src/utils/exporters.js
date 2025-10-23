function triggerDownload(blob, filename){
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = filename
  link.style.display = 'none'
  document.body.appendChild(link)
  link.click()
  URL.revokeObjectURL(link.href)
  document.body.removeChild(link)
}

function escapeCSVValue(value){
  if(value === null || value === undefined){
    return ''
  }
  const stringValue = String(value)
  if(/[";,\n\r]/.test(stringValue)){
    return '"' + stringValue.replace(/"/g, '""') + '"'
  }
  return stringValue
}

export function exportToXLSX(rows, filename = 'relatorio.xlsx'){
  const headers = rows && rows.length > 0 ? Object.keys(rows[0]) : []
  const csvLines = []
  if(headers.length > 0){
    csvLines.push(headers.map(escapeCSVValue).join(';'))
    for(const row of rows){
      csvLines.push(headers.map(h => escapeCSVValue(row[h])).join(';'))
    }
  }
  const csvContent = '\ufeff' + csvLines.join('\r\n')
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const downloadName = filename.toLowerCase().endsWith('.csv')
    ? filename
    : filename.replace(/\.[^/.]+$/, '') + '.csv'
  triggerDownload(blob, downloadName)
}

function sanitisePdfText(text){
  return String(text ?? '').replace(/([\\()])/g, '\\$1')
}

function buildPdfContent(rows){
  const lines = []
  lines.push('Relatório Diságua')
  lines.push('')
  if(!rows || rows.length === 0){
    lines.push('Sem dados para exportar')
    return lines
  }
  const headers = Object.keys(rows[0])
  lines.push(headers.join(' | '))
  lines.push('-'.repeat(Math.min(90, lines[lines.length - 1].length)))
  for(const row of rows){
    lines.push(headers.map(h => String(row[h] ?? '')).join(' | '))
  }
  return lines
}

function createSimplePdf(lines){
  const safeLines = lines.map(sanitisePdfText)
  const contentParts = ['BT', '/F1 10 Tf', '14 TL', '50 780 Td']
  if(safeLines.length === 0){
    safeLines.push('')
  }
  safeLines.forEach((line, index) => {
    if(index === 0){
      contentParts.push(`(${line}) Tj`)
    }else{
      contentParts.push('T*')
      contentParts.push(`(${line}) Tj`)
    }
  })
  contentParts.push('ET')
  const contentStream = contentParts.join('\n')
  const objects = [
    { id: 1, body: '<< /Type /Catalog /Pages 2 0 R >>' },
    { id: 2, body: '<< /Type /Pages /Kids [3 0 R] /Count 1 >>' },
    {
      id: 3,
      body: '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>'
    },
    { id: 4, stream: contentStream },
    { id: 5, body: '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>' }
  ]

  let pdf = '%PDF-1.4\n'
  const offsets = { 0: 0 }
  for(const obj of objects){
    offsets[obj.id] = pdf.length
    if(obj.stream !== undefined){
      pdf += `${obj.id} 0 obj\n<< /Length ${obj.stream.length} >>\nstream\n${obj.stream}\nendstream\nendobj\n`
    }else{
      pdf += `${obj.id} 0 obj\n${obj.body}\nendobj\n`
    }
  }
  const xrefOffset = pdf.length
  pdf += `xref\n0 ${objects.length + 1}\n`
  pdf += '0000000000 65535 f \n'
  for(let i = 1; i <= objects.length; i++){
    const offset = String(offsets[i]).padStart(10, '0')
    pdf += `${offset} 00000 n \n`
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`
  return pdf
}

export function exportToPDF(rows, filename = 'relatorio.pdf'){
  const lines = buildPdfContent(rows)
  const pdfContent = createSimplePdf(lines)
  const blob = new Blob([pdfContent], { type: 'application/pdf' })
  triggerDownload(blob, filename)
}
