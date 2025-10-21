export function toCsv(rows: Record<string, unknown>[]): string {
  if (!rows.length) {
    return ''
  }

  const headers = Object.keys(rows[0])
  const escape = (value: unknown) => {
    const stringValue = value == null ? '' : String(value)
    return /[",\n]/.test(stringValue)
      ? '"' + stringValue.replace(/"/g, '""') + '"'
      : stringValue
  }

  const body = rows
    .map((row) => headers.map((header) => escape(row[header])).join(','))
    .join('\n')

  return [headers.join(','), body].filter(Boolean).join('\n')
}

export function download(filename: string, content: string) {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return
  }

  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  anchor.style.display = 'none'
  document.body.appendChild(anchor)
  anchor.click()
  document.body.removeChild(anchor)
  URL.revokeObjectURL(url)
}
