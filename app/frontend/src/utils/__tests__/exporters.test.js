import { afterEach, beforeEach, describe, it, expect } from 'vitest'
import { exportToPDF, exportToXLSX } from '../exporters.js'

const originalDocument = global.document
const originalCreateObjectURL = URL.createObjectURL
const originalRevokeObjectURL = URL.revokeObjectURL

describe('exporters', () => {
  let anchorElement
  let capturedBlob

  beforeEach(() => {
    capturedBlob = undefined
    anchorElement = { href: '', download: '', style: {}, click: () => {} }

    global.document = {
      createElement: () => anchorElement,
      body: {
        appendChild: () => {},
        removeChild: () => {}
      }
    }

    URL.createObjectURL = blob => {
      capturedBlob = blob
      return 'blob:mock'
    }

    URL.revokeObjectURL = () => {}
  })

  afterEach(() => {
    if (originalDocument === undefined) {
      delete global.document
    } else {
      global.document = originalDocument
    }

    if (originalCreateObjectURL === undefined) {
      delete URL.createObjectURL
    } else {
      URL.createObjectURL = originalCreateObjectURL
    }

    if (originalRevokeObjectURL === undefined) {
      delete URL.revokeObjectURL
    } else {
      URL.revokeObjectURL = originalRevokeObjectURL
    }
  })

  it('exportToXLSX ajusta extensão para .csv e escapa conteúdo', async () => {
    const rows = [
      { Nome: 'Alice', Observacao: 'Valor; "especial"' }
    ]

    await exportToXLSX(rows, 'dados.xlsx')

    expect(anchorElement.download).toBe('dados.csv')
    expect(capturedBlob).toBeInstanceOf(Blob)

    const csvText = await capturedBlob.text()
    const csvWithoutBom = csvText.replace(/^\ufeff/, '')
    const [headersLine, dataLine] = csvWithoutBom.split('\r\n')

    expect(headersLine).toBe('Nome;Observacao')
    expect(dataLine).toBe('Alice;"Valor; ""especial"""')
  })

  it('exportToPDF mantém extensão informada e escapa caracteres especiais', async () => {
    const rows = [
      { Comentario: 'Valor (especial) \\ teste' }
    ]

    await exportToPDF(rows, 'relatorio.pdf')

    expect(anchorElement.download).toBe('relatorio.pdf')
    expect(capturedBlob).toBeInstanceOf(Blob)

    const pdfContent = await capturedBlob.text()
    expect(pdfContent).toContain('Valor \\(')
    expect(pdfContent).toContain('especial\\)')
    expect(pdfContent).toContain('\\\\ teste')
  })
})
