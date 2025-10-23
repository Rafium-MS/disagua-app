import React, { useMemo, useState, useEffect } from 'react'
import Card from '../components/ui/Card.jsx'
import Input from '../components/ui/Input.jsx'
import Select from '../components/ui/Select.jsx'
import Button from '../components/ui/Button.jsx'
import { UF_OPTIONS } from '../data/ufs.js'
import { LS } from '../utils/storage.js'
import { currencyBRL } from '../utils/currency.js'

export default function GerenciarLojasPage(){
  const [stores, setStores]   = useState(()=> LS.get('stores', []))
  const [brands]              = useState(()=> LS.get('brands', []))
  const [q, setQ]             = useState('')    // busca livre
  const [uf, setUF]           = useState('')    // filtro UF
  const [marcaId, setMarcaId] = useState('')    // filtro Marca
  const [cidade, setCidade]   = useState('')    // filtro Cidade

  const [editing, setEditing] = useState(null)  // loja sendo editada (obj)
  const [form, setForm]       = useState({})    // formulário de edição

  useEffect(()=> LS.set('stores', stores), [stores])

  const filtered = useMemo(()=>{
    const ql = q.trim().toLowerCase()
    return stores.filter(s=>{
      const brandName = brands.find(b => b.id===s.marca_id || String(b.id)===String(s.marca_id))?.marca || ''
      const text = `${s.loja} ${brandName} ${s.municipio} ${s.endereco} ${s.local_entrega}`.toLowerCase()
      const okQ = !ql || text.includes(ql)
      const okUF = !uf || s.uf === uf
      const okMarca = !marcaId || String(s.marca_id) === String(marcaId)
      const okCidade = !cidade || s.municipio?.toLowerCase().includes(cidade.toLowerCase())
      return okQ && okUF && okMarca && okCidade
    })
  }, [stores, brands, q, uf, marcaId, cidade])

  function brandOf(store){
    return brands.find(b => b.id === store.marca_id || String(b.id) === String(store.marca_id))
  }

  function removeStore(id){
    if (!confirm('Excluir loja?')) return
    setStores(arr => arr.filter(s => s.id !== id))
  }

  function openEdit(store){
    setEditing(store.id)
    setForm({...store})
  }

  function saveEdit(){
    setStores(arr => arr.map(s => s.id===editing ? {...form, marca_id: String(form.marca_id)} : s))
    setEditing(null)
    setForm({})
  }

  function cancelEdit(){
    setEditing(null)
    setForm({})
  }

  return (
    <div className="grid gap-4">
      <Card
        title="Gerenciar Lojas"
        actions={<a href="/lojas" className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-3 py-2 rounded-lg text-sm">Voltar para Cadastro</a>}
      >
        <div className="grid md:grid-cols-5 gap-3">
          <Input  label="Buscar" placeholder="Loja, marca, endereço…" value={q} onChange={e=>setQ(e.target.value)} />
          <Select label="Marca" value={marcaId} onChange={e=>setMarcaId(e.target.value)}>
            <option value="">Todas</option>
            {brands.map(b => <option key={b.id} value={b.id}>{b.marca}</option>)}
          </Select>
          <Select label="UF" value={uf} onChange={e=>setUF(e.target.value)}>
            <option value="">Todas</option>
            {UF_OPTIONS.map(u => <option key={u} value={u}>{u}</option>)}
          </Select>
          <Input  label="Cidade" value={cidade} onChange={e=>setCidade(e.target.value)} />
          <div className="flex items-end">
            <Button variant="subtle" onClick={()=>{ setQ(''); setUF(''); setMarcaId(''); setCidade('') }}>Limpar</Button>
          </div>
        </div>
      </Card>

      <Card title={`Lojas (${filtered.length})`}>
        {filtered.length === 0 ? (
          <p className="text-slate-500">Nenhuma loja para os filtros atuais.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-slate-100 text-left">
                  {['Marca','Loja','Município','UF','20L','10L','1500ml','CX Copo','Vasilhame','Ações'].map(h=>(
                    <th key={h} className="px-3 py-2">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(s => (
                  <tr key={s.id} className="border-b">
                    <td className="px-3 py-2">{brandOf(s)?.marca || '—'}</td>
                    <td className="px-3 py-2">{s.loja}</td>
                    <td className="px-3 py-2">{s.municipio}</td>
                    <td className="px-3 py-2">{s.uf}</td>
                    <td className="px-3 py-2">{currencyBRL(s.valor_20l)}</td>
                    <td className="px-3 py-2">{currencyBRL(s.valor_10l)}</td>
                    <td className="px-3 py-2">{currencyBRL(s.valor_1500ml)}</td>
                    <td className="px-3 py-2">{currencyBRL(s.valor_cx_copo)}</td>
                    <td className="px-3 py-2">{currencyBRL(s.valor_vasilhame)}</td>
                    <td className="px-3 py-2 flex gap-2">
                      <Button onClick={()=>openEdit(s)}>Editar</Button>
                      <Button variant="danger" onClick={()=>removeStore(s.id)}>Excluir</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Modal/Sheet simples de edição (inline) */}
      {editing && (
        <div className="fixed inset-0 bg-black/40 grid place-items-center p-4">
          <div className="bg-white rounded-2xl p-4 max-w-3xl w-full">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Editar Loja</h3>
              <button onClick={cancelEdit} className="text-slate-500 hover:text-slate-700">✕</button>
            </div>

            <div className="grid md:grid-cols-3 gap-3">
              <Select label="Marca" value={form.marca_id} onChange={e=>setForm({...form, marca_id:e.target.value})} required>
                {brands.map(b => <option key={b.id} value={b.id}>{b.marca}</option>)}
              </Select>
              <Input label="Cód. Disagua" value={form.cod_disagua || ''} onChange={e=>setForm({...form, cod_disagua:e.target.value})} />
              <Input label="Nome da loja" value={form.loja || ''} onChange={e=>setForm({...form, loja:e.target.value})} />
            </div>

            <div className="grid md:grid-cols-5 gap-3 mt-3">
              <Input label="Local da entrega" value={form.local_entrega || ''} onChange={e=>setForm({...form, local_entrega:e.target.value})} />
              <Input label="Endereço" value={form.endereco || ''} onChange={e=>setForm({...form, endereco:e.target.value})} />
              <Input label="Município" value={form.municipio || ''} onChange={e=>setForm({...form, municipio:e.target.value})} />
              <Select label="UF" value={form.uf || ''} onChange={e=>setForm({...form, uf:e.target.value})}>
                {UF_OPTIONS.map(u => <option key={u} value={u}>{u}</option>)}
              </Select>
            </div>

            <div className="grid md:grid-cols-5 gap-3 mt-3">
              <Input label="Valor 20L" type="number" step="0.01" value={form.valor_20l || 0} onChange={e=>setForm({...form, valor_20l:e.target.value})} />
              <Input label="Valor 10L" type="number" step="0.01" value={form.valor_10l || 0} onChange={e=>setForm({...form, valor_10l:e.target.value})} />
              <Input label="Valor 1500ml" type="number" step="0.01" value={form.valor_1500ml || 0} onChange={e=>setForm({...form, valor_1500ml:e.target.value})} />
              <Input label="Valor CX Copo" type="number" step="0.01" value={form.valor_cx_copo || 0} onChange={e=>setForm({...form, valor_cx_copo:e.target.value})} />
              <Input label="Vasilhame" type="number" step="0.01" value={form.valor_vasilhame || 0} onChange={e=>setForm({...form, valor_vasilhame:e.target.value})} />
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <Button variant="subtle" onClick={cancelEdit}>Cancelar</Button>
              <Button onClick={saveEdit}>Salvar</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
