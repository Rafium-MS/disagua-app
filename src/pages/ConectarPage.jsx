import React, { useMemo, useState, useEffect } from 'react'
import Card from '../components/ui/Card.jsx'
import Input from '../components/ui/Input.jsx'
import Select from '../components/ui/Select.jsx'
import Button from '../components/ui/Button.jsx'
import { UF_OPTIONS } from '../data/ufs.js'
import { LS } from '../utils/storage.js'

export default function ConectarPage(){
  const [partners] = useState(()=> LS.get('partners', []))
  const [brands] = useState(()=> LS.get('brands', []))
  const [stores] = useState(()=> LS.get('stores', []))
  const [connections, setConnections] = useState(()=> LS.get('connections', []))

  const [estado, setEstado] = useState('')
  const [cidade, setCidade] = useState('')

  useEffect(()=> LS.set('connections', connections), [connections])

  const partnersFiltered = useMemo(()=> partners.filter(p =>
    (!estado || p.estado === estado) && (!cidade || p.cidade.toLowerCase().includes(cidade.toLowerCase()))
  ), [partners, estado, cidade])

  const storesFiltered = useMemo(()=> stores.filter(s =>
    (!estado || s.uf === estado) && (!cidade || s.municipio.toLowerCase().includes(cidade.toLowerCase()))
  ), [stores, estado, cidade])

  function brandOf(store){
    return brands.find(b => b.id === store.marca_id || String(b.id) === String(store.marca_id))
  }

  const connectionsDetailed = useMemo(()=> connections.map(c => ({
    ...c,
    partner: partners.find(p=>p.id===c.partner_id),
    store: stores.find(s=>s.id===c.store_id),
    brand: brandOf(stores.find(s=>s.id===c.store_id) || {}),
  })).filter(x=>x.partner && x.store), [connections, partners, stores])

  function connect(partner_id, store_id){
    const existsForStore = connections.some(c => c.store_id === store_id)
    if (existsForStore){
      alert('Esta loja já está conectada a um parceiro. Desconecte antes de criar outra conexão.')
      return
    }
    setConnections(arr => [...arr, { id: crypto.randomUUID(), partner_id, store_id, created_at: new Date().toISOString() }])
  }

  function disconnect(id){
    if(!confirm('Desconectar esta parceria?')) return
    setConnections(arr => arr.filter(c => c.id !== id))
  }

  function compatibleStoresForPartner(partner){
    return stores.filter(s => s.uf === partner.estado && s.municipio.toLowerCase() === partner.cidade.toLowerCase())
  }

  function compatiblePartnersForStore(store){
    return partners.filter(p => p.estado === store.uf && p.cidade.toLowerCase() === store.municipio.toLowerCase())
  }

  return (
    <div className="grid gap-4">
      <Card title="Filtros de Localização" actions={<Button variant="subtle" onClick={()=>{setEstado(''); setCidade('')}}>Limpar</Button>}>
        <div className="grid md:grid-cols-3 gap-3">
          <Select label="UF" value={estado} onChange={e=>setEstado(e.target.value)}>
            <option value="">Todos</option>
            {UF_OPTIONS.map(uf => <option key={uf} value={uf}>{uf}</option>)}
          </Select>
          <Input label="Cidade" value={cidade} onChange={e=>setCidade(e.target.value)} placeholder="Ex.: Campo Grande" />
        </div>
      </Card>

      <div className="grid md:grid-cols-3 gap-4">
        <Card title="Parceiros">
          {partnersFiltered.length===0 ? <p className="text-slate-500">Nenhum parceiro.</p> : (
            <ul className="space-y-2">
              {partnersFiltered.map(p => (
                <li key={p.id} className="border rounded-xl p-3">
                  <div className="font-medium">{p.parceiro}</div>
                  <div className="text-xs text-slate-500">{p.cidade} - {p.estado}</div>
                  <div className="mt-2">
                    <div className="text-xs text-slate-600 mb-1">Lojas compatíveis nesta cidade/UF</div>
                    <div className="flex flex-wrap gap-2">
                      {compatibleStoresForPartner(p).map(s => (
                        <Button key={s.id} onClick={()=>connect(p.id, s.id)}>Conectar: {s.loja} ({brandOf(s)?.marca || '?'})</Button>
                      ))}
                      {compatibleStoresForPartner(p).length===0 && <span className="text-xs text-slate-500">Nenhuma loja compatível</span>}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card title="Lojas">
          {storesFiltered.length===0 ? <p className="text-slate-500">Nenhuma loja.</p> : (
            <ul className="space-y-2">
              {storesFiltered.map(s => (
                <li key={s.id} className="border rounded-xl p-3">
                  <div className="font-medium">{s.loja}</div>
                  <div className="text-xs text-slate-500">{brandOf(s)?.marca || '—'} • {s.municipio} - {s.uf}</div>
                  <div className="mt-2">
                    <div className="text-xs text-slate-600 mb-1">Parceiros compatíveis nesta cidade/UF</div>
                    <div className="flex flex-wrap gap-2">
                      {compatiblePartnersForStore(s).map(p => (
                        <Button key={p.id} onClick={()=>connect(p.id, s.id)}>Conectar: {p.parceiro}</Button>
                      ))}
                      {compatiblePartnersForStore(s).length===0 && <span className="text-xs text-slate-500">Nenhum parceiro compatível</span>}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card title="Conexões Ativas">
          {connectionsDetailed.length===0 ? <p className="text-slate-500">Nenhuma conexão.</p> : (
            <ul className="space-y-2">
              {connectionsDetailed.map(c => (
                <li key={c.id} className="border rounded-xl p-3 flex items-center justify-between">
                  <div>
                    <div className="font-medium">{c.partner.parceiro} ↔ {c.store.loja}</div>
                    <div className="text-xs text-slate-500">{c.partner.cidade}-{c.partner.estado} → {c.store.municipio}-{c.store.uf} • {c.brand?.marca || '—'}</div>
                  </div>
                  <Button variant="danger" onClick={()=>disconnect(c.id)}>Desconectar</Button>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </div>
  )
}
