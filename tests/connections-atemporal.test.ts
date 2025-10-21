import { describe, it, expect, beforeEach } from 'vitest'
import { connectionsRepo } from '@/services/repo'

beforeEach(() => {
  localStorage.clear()
})

describe('connections atemporal', () => {
  it('stores createdAt metadata without period fields', () => {
    const result = connectionsRepo.link('parceiro-1', 'loja-1')
    expect(result.ok).toBe(true)

    const connection = connectionsRepo.byLoja('loja-1')
    expect(connection).not.toBeNull()
    expect(connection?.criadoEm).toBeTypeOf('string')
    expect((connection as any).inicio).toBeUndefined()
    expect((connection as any).fim).toBeUndefined()
  })
})
