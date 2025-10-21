import { storage } from './storage'
import type { ID, Connection } from '@/types'

function uid() {
  return crypto.randomUUID?.() || Math.random().toString(36).slice(2)
}

export function createRepo<T extends { id: ID }>(key: string) {
  type Col = T[]
  const read = (): Col => storage.get<Col>(key, [])
  const write = (v: Col) => storage.set(key, v)

  return {
    all(): Col {
      return read()
    },
    byId(id: ID) {
      return read().find((x) => x.id === id) || null
    },
    add(data: Omit<T, 'id'>): T {
      const item = { id: uid(), ...(data as any) } as T
      const col = read()
      col.push(item)
      write(col)
      return item
    },
    update(id: ID, patch: Partial<Omit<T, 'id'>>): T | null {
      const col = read()
      const idx = col.findIndex((x) => x.id === id)
      if (idx === -1) return null
      col[idx] = { ...col[idx], ...patch } as T
      write(col)
      return col[idx]
    },
    remove(id: ID): boolean {
      const col = read()
      const len = col.length
      const next = col.filter((x) => x.id !== id)
      write(next)
      return next.length !== len
    },
    setAll(items: T[]) {
      write(items)
    }
  }
}

export const marcasRepo = createRepo<any>('marcas')
export const lojasRepo = createRepo<any>('lojas')
export const parceirosRepo = createRepo<any>('parceiros')

const base = createRepo<Connection>('connections')
export const connectionsRepo = {
  ...base,
  byLoja(lojaId: ID) {
    return base.all().find((c) => c.lojaId === lojaId) || null
  },
  byParceiro(parceiroId: ID) {
    return base.all().filter((c) => c.parceiroId === parceiroId)
  },
  link(parceiroId: ID, lojaId: ID): { ok: true; id: ID } | { ok: false; reason: string } {
    const existingLoja = base.all().find((c) => c.lojaId === lojaId)
    if (existingLoja) return { ok: false, reason: 'Essa loja já está vinculada a um parceiro.' }
    const created = base.add({ parceiroId, lojaId, criadoEm: new Date().toISOString() })
    return { ok: true, id: created.id }
  },
  unlinkById(connId: ID) {
    return base.remove(connId)
  }
}
