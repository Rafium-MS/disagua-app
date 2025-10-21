import { describe, it, expect } from 'vitest'
import { toCsv } from '@/services/csv'

describe('csv export', () => {
  it('generates a csv string with escaped values', () => {
    const csv = toCsv([
      {
        parceiro: 'Parceiro 1',
        loja: 'Loja, 1',
        municipio: 'São Paulo',
        uf: 'SP',
        marca: 'Marca "Especial"',
        criadoEm: '2024-01-01T12:00:00.000Z',
      },
    ])

    expect(csv).toBe(
      'parceiro,loja,municipio,uf,marca,criadoEm\n' +
        'Parceiro 1,"Loja, 1",São Paulo,SP,"Marca ""Especial""",2024-01-01T12:00:00.000Z'
    )
  })

  it('returns an empty string when there are no rows', () => {
    expect(toCsv([])).toBe('')
  })
})
