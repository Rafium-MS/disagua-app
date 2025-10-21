import { describe, it, expect, beforeEach } from 'vitest'
import { connectionsRepo } from '@/services/repo'

beforeEach(() => {
  localStorage.clear()
})

describe('connections rules', () => {
  it('allows multiple stores per partner', () => {
    const p1 = 'p1', l1 = 'l1', l2 = 'l2'
    const r1 = connectionsRepo.link(p1, l1)
    const r2 = connectionsRepo.link(p1, l2)
    expect(r1.ok).toBe(true)
    expect(r2.ok).toBe(true)
    expect(connectionsRepo.byParceiro(p1).length).toBe(2)
  })

  it('prevents the same store from linking to two partners', () => {
    const p1 = 'p1', p2 = 'p2', l1 = 'l1'
    const r1 = connectionsRepo.link(p1, l1)
    const r2 = connectionsRepo.link(p2, l1)
    expect(r1.ok).toBe(true)
    expect(r2.ok).toBe(false)
  })

  it('unlink removes the connection', () => {
    const p1 = 'p1', l1 = 'l1'
    const r = connectionsRepo.link(p1, l1)
    expect(r.ok).toBe(true)
    const ok = connectionsRepo.unlinkById((r as any).id)
    expect(ok).toBe(true)
    expect(connectionsRepo.byLoja(l1)).toBeNull()
  })
})
