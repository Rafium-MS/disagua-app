import { describe, it, expect, beforeEach } from 'vitest'
import { createRepo } from '@/services/repo'

type Item = { id: string; name: string }
const repo = createRepo<Item>('test_items')

beforeEach(() => {
  localStorage.clear()
})

describe('repo (localStorage CRUD)', () => {
  it('adds, updates and removes items', () => {
    const a = repo.add({ name: 'A' } as any)
    const b = repo.add({ name: 'B' } as any)
    expect(repo.all().length).toBe(2)
    expect(repo.byId(a.id)?.name).toBe('A')

    repo.update(a.id, { name: 'A2' })
    expect(repo.byId(a.id)?.name).toBe('A2')

    const removed = repo.remove(b.id)
    expect(removed).toBe(true)
    expect(repo.all().length).toBe(1)
  })
})
