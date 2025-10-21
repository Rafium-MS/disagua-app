import { useMemo, useState } from 'react'
import { parceirosRepo, lojasRepo, marcasRepo, connectionsRepo } from '@/services/repo'
import { toCsv, download } from '@/services/csv'
import type { Connection } from '@/types'

const showAlert = (message: string) => {
  if (typeof window !== 'undefined' && typeof window.alert === 'function') {
    window.alert(message)
  }
}

export default function Conectar() {
  const parceiros = parceirosRepo.all()
  const lojas = lojasRepo.all()
  const marcas = marcasRepo.all()

  const [uf, setUf] = useState('')
  const [municipio, setMunicipio] = useState('')
  const [parceiroId, setParceiroId] = useState('')
  const [lojaId, setLojaId] = useState('')
  const [onlyFree, setOnlyFree] = useState(true)
  const [tick, setTick] = useState(0)
  const force = () => setTick((t) => t + 1)

  const connections = useMemo(() => connectionsRepo.all(), [tick])

  const connectionsByLoja = useMemo(() => {
    const map = new Map<string, Connection>()
    connections.forEach((connection) => {
      map.set(connection.lojaId, connection)
    })
    return map
  }, [connections])

  const lojasFiltradas = useMemo(
    () =>
      lojas.filter((l: any) => {
        if (uf && l.uf !== uf) return false
        if (municipio && !l.municipio.toLowerCase().includes(municipio.toLowerCase())) return false
        if (onlyFree && connectionsByLoja.has(l.id)) return false
        return true
      }),
    [lojas, uf, municipio, onlyFree, connectionsByLoja]
  )

  const lojaAlreadyLinked = lojaId ? connectionsByLoja.get(lojaId) ?? null : null

  const handleExport = () => {
    const rows = connections.map((connection) => {
      const parceiro = parceiros.find((p: any) => p.id === connection.parceiroId)
      const loja = lojas.find((l: any) => l.id === connection.lojaId)
      const marca = loja ? marcas.find((m: any) => m.id === loja.marcaId) : null

      return {
        parceiro: parceiro?.parceiro || '',
        loja: loja?.loja || '',
        municipio: loja?.municipio || '',
        uf: loja?.uf || '',
        marca: marca?.nome || '',
        criadoEm: connection.criadoEm,
      }
    })

    if (!rows.length) {
      showAlert('Não há vínculos para exportar.')
      return
    }

    download('vinculos.csv', toCsv(rows))
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Conectar Parceiro ↔ Loja</h1>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="text-sm font-medium">UF</label>
          <input value={uf} onChange={(e) => setUf(e.target.value.toUpperCase())} className="w-full rounded-md border px-3 py-2" />
        </div>
        <div>
          <label className="text-sm font-medium">Município</label>
          <input value={municipio} onChange={(e) => setMunicipio(e.target.value)} className="w-full rounded-md border px-3 py-2" />
        </div>
        <div>
          <label className="text-sm font-medium">Parceiro</label>
          <select value={parceiroId} onChange={(e) => setParceiroId(e.target.value)} className="w-full rounded-md border px-3 py-2">
            <option value="">Selecione...</option>
            {parceiros.map((p: any) => (
              <option key={p.id} value={p.id}>
                {p.parceiro} ({p.estado}/{p.cidade})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <label className="inline-flex items-center gap-2 text-sm">
          <input type="checkbox" checked={onlyFree} onChange={(e) => setOnlyFree(e.target.checked)} />
          Mostrar apenas lojas livres
        </label>
        <button className="px-3 py-2 border rounded" onClick={handleExport}>
          Exportar CSV
        </button>
      </div>

      <div>
        <h2 className="font-medium mb-2">Lojas compatíveis</h2>
        <div className="grid grid-cols-3 gap-2">
          {lojasFiltradas.map((l: any) => {
            const linked = connectionsByLoja.get(l.id)
            const partnerName = linked ? parceiros.find((p) => p.id === linked.parceiroId)?.parceiro : null
            return (
              <button
                key={l.id}
                className={`text-left border rounded p-2 ${lojaId === l.id ? 'ring-2 ring-blue-500' : ''} ${linked ? 'opacity-60' : ''}`}
                onClick={() => setLojaId(l.id)}
                disabled={!!linked}
                title={linked ? `Já vinculada a ${partnerName}` : ''}
              >
                <div className="font-medium">{l.loja}</div>
                <div className="text-xs">
                  {l.municipio}/{l.uf} — {marcas.find((m: any) => m.id === l.marcaId)?.nome || '—'}
                </div>
                {linked && <div className="text-[11px] mt-1">Vinculada a: {partnerName}</div>}
              </button>
            )
          })}
          {lojasFiltradas.length === 0 && <p className="text-sm text-zinc-500">Nada encontrado para o filtro.</p>}
        </div>
      </div>

      {lojaAlreadyLinked && (
        <div className="text-sm text-red-700">
          Essa loja já está vinculada a {parceiros.find((p) => p.id === lojaAlreadyLinked.parceiroId)?.parceiro}.
        </div>
      )}

      <div className="flex gap-2">
        <button
          disabled={!parceiroId || !lojaId || !!lojaAlreadyLinked}
          className="px-3 py-2 border rounded disabled:opacity-50"
          onClick={() => {
            const res = connectionsRepo.link(parceiroId, lojaId)
            if (!res.ok) {
              showAlert(res.reason)
              return
            }
            showAlert('Conectado com sucesso!')
            setLojaId('')
            force()
          }}
        >
          Conectar
        </button>
      </div>

      <section className="space-y-2">
        <h2 className="font-medium">Vínculos atuais (atemporais)</h2>
        <ul className="space-y-1">
          {connections.map((c) => {
            const p = parceiros.find((p) => p.id === c.parceiroId)
            const l = lojas.find((l) => l.id === c.lojaId)
            return (
              <li key={c.id} className="border rounded p-2 flex items-center justify-between">
                <div>
                  <div className="font-medium">{p?.parceiro} ↔ {l?.loja}</div>
                  <div className="text-xs text-zinc-600">
                    {l?.municipio}/{l?.uf} — criado em {new Date(c.criadoEm).toLocaleString()}
                  </div>
                </div>
                <button
                  className="px-2 py-1 border rounded"
                  onClick={() => {
                    connectionsRepo.unlinkById(c.id)
                    force()
                  }}
                >
                  Desvincular
                </button>
              </li>
            )
          })}
          {connections.length === 0 && <p className="text-sm text-zinc-500">Nenhum vínculo ainda.</p>}
        </ul>
      </section>
    </div>
  )
}
