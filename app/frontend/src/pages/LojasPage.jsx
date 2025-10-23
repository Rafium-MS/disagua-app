import React, { useEffect, useState } from 'react'
import Card from '../components/ui/Card.jsx'
import Input from '../components/ui/Input.jsx'
import Select from '../components/ui/Select.jsx'
import Button from '../components/ui/Button.jsx'
import { UF_OPTIONS } from '../data/ufs.js'
import { LS } from '../utils/storage.js'
import { currencyBRL } from '../utils/currency.js'

export default function LojasPage(){
  const [brands, setBrands] = useState(()=> LS.get('brands', []))
  const [stores, setStores] = useState(()=> LS.get('stores', []))
  const [brandForm, setBrandForm] = useState({ marca:'', cod_disagua:'' })
  const [storeForm, setStoreForm] = useState({ marca_id:'', loja:'', cod_disagua:'', local_entrega:'', endereco:'', municipio:'', uf:'', valor_20l:0, valor_10l:0, valor_1500ml:0, valor_cx_copo:0, valor_vasilhame:0 })

  useEffect(()=> LS.set('brands', brands), [brands])
  useEffect(()=> LS.set('stores', stores), [stores])

  function addBrand(e){ e.preventDefault(); const id = crypto.randomUUID(); setBrands(a=>[...a,{id,...brandForm}]); setBrandForm({ marca:'', cod_disagua:'' }) }
  function addStore(e){ e.preventDefault(); const id = crypto.randomUUID(); setStores(a=>[...a,{ id, ...storeForm, marca_id:String(storeForm.marca_id) }]); setStoreForm({ marca_id:'', loja:'', cod_disagua:'', local_entrega:'', endereco:'', municipio:'', uf:'', valor_20l:0, valor_10l:0, valor_1500ml:0, valor_cx_copo:0, valor_vasilhame:0 }) }
  function delBrand(id){ if(!confirm('Excluir marca e lojas associadas?'))return; setBrands(a=>a.filter(b=>b.id!==id)); setStores(a=>a.filter(s=>s.marca_id!==id && s.marca_id!==String(id))) }
  function delStore(id){ if(!confirm('Excluir loja?'))return; setStores(a=>a.filter(s=>s.id!==id)) }

  return (<div className="grid gap-4">
    <Card title="Cadastro de Marcas" actions={<a href="/lojas/gerenciar" className="bg-slate-800 hover:bg-slate-900 text-white px-3 py-2 rounded-lg text-sm">Gerenciar Lojas</a>}>
      <form onSubmit={addBrand} className="grid md:grid-cols-3 gap-3">
        <Input label="Nome da Marca" value={brandForm.marca} onChange={e=>setBrandForm({...brandForm, marca:e.target.value})} required />
        <Input label="Cód. Matriz" value={brandForm.cod_disagua}onChange={e=>setBrandForm({...brandForm, cod_disagua:e.target.value})} />        
        <div className="flex items-end"><Button type="submit">Cadastrar Marca</Button></div>
      </form>
    </Card>
    <Card title="Cadastro de Lojas">
      <form onSubmit={addStore} className="grid gap-3">
        <div className="grid md:grid-cols-3 gap-3">
          <Select label="Marca" value={storeForm.marca_id}
                  onChange={e=>setStoreForm({...storeForm, marca_id:e.target.value})}>
            <option value="">Selecione</option>
            {brands.map(b => <option key={b.id} value={b.id}>{b.marca}</option>)}
          </Select>

          <Input label="Cód. Disagua" value={storeForm.cod_disagua}
                onChange={e=>setStoreForm({...storeForm, cod_disagua:e.target.value})} />

          <Input label="Nome da loja" value={storeForm.loja}
                onChange={e=>setStoreForm({...storeForm, loja:e.target.value})} required />
        </div>
        <div className="grid md:grid-cols-5 gap-3">
          <Input label="Local da entrega" value={storeForm.local_entrega} onChange={e=>setStoreForm({...storeForm,local_entrega:e.target.value})} required />
          <Input label="Endereço" value={storeForm.endereco} onChange={e=>setStoreForm({...storeForm,endereco:e.target.value})} />
          <Input label="Município" value={storeForm.municipio} onChange={e=>setStoreForm({...storeForm,municipio:e.target.value})} required />
          <Select label="UF" value={storeForm.uf} onChange={e=>setStoreForm({...storeForm,uf:e.target.value})} required><option value="">Selecione</option>{UF_OPTIONS.map(uf=> <option key={uf} value={uf}>{uf}</option>)}</Select>
        </div>
        <div className="grid md:grid-cols-5 gap-3">
          <Input label="Valor 20L" type="number" step="0.01" value={storeForm.valor_20l} onChange={e=>setStoreForm({...storeForm,valor_20l:e.target.value})} />
          <Input label="Valor 10L" type="number" step="0.01" value={storeForm.valor_10l} onChange={e=>setStoreForm({...storeForm,valor_10l:e.target.value})} />
          <Input label="Valor 1500ml" type="number" step="0.01" value={storeForm.valor_1500ml} onChange={e=>setStoreForm({...storeForm,valor_1500ml:e.target.value})} />
          <Input label="Valor CX Copo" type="number" step="0.01" value={storeForm.valor_cx_copo} onChange={e=>setStoreForm({...storeForm,valor_cx_copo:e.target.value})} />
          <Input label="Vasilhame" type="number" step="0.01" value={storeForm.valor_vasilhame} onChange={e=>setStoreForm({...storeForm,valor_vasilhame:e.target.value})} />
        </div>
        <div className="flex gap-2"><Button type="submit">Cadastrar Loja</Button></div>
      </form>
    </Card>
    <Card title="Marcas e Lojas cadastradas">
      {brands.length===0 ? <p className="text-slate-500">Nenhuma marca cadastrada.</p> : (
        <div className="space-y-3">
          {brands.map(b=>{
            const brandStores = stores.filter(s=> s.marca_id===b.id || s.marca_id===String(b.id))
            return (<div key={b.id} className="border rounded-xl overflow-hidden">
              <div className="flex items-center justify-between bg-slate-100 px-4 py-2">
                <div className="font-medium">{b.marca} <span className="text-slate-500 text-xs">{b.cod_disagua||''}</span></div>
                <div className="flex gap-2"><Button variant="danger" onClick={()=>delBrand(b.id)}>Excluir Marca</Button></div>
              </div>
              {brandStores.length===0 ? <div className="p-4 text-slate-500">Nenhuma loja nesta marca.</div> : (
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead><tr className="bg-white">{["Loja","Local","Endereço","Município","UF","20L","10L","1500ml","CX Copo","Vasilhame","Ações"].map(h=> <th key={h} className="px-3 py-2 text-left">{h}</th>)}</tr></thead>
                    <tbody>{brandStores.map(s=> (
                      <tr key={s.id} className="border-t">
                        <td className="px-3 py-2">{s.loja}</td><td className="px-3 py-2">{s.local_entrega}</td><td className="px-3 py-2">{s.endereco}</td><td className="px-3 py-2">{s.municipio}</td><td className="px-3 py-2">{s.uf}</td>
                        <td className="px-3 py-2">{currencyBRL(s.valor_20l)}</td><td className="px-3 py-2">{currencyBRL(s.valor_10l)}</td><td className="px-3 py-2">{currencyBRL(s.valor_1500ml)}</td><td className="px-3 py-2">{currencyBRL(s.valor_cx_copo)}</td><td className="px-3 py-2">{currencyBRL(s.valor_vasilhame)}</td>
                        <td className="px-3 py-2"><Button variant="danger" onClick={()=>delStore(s.id)}>Excluir</Button></td>
                      </tr>))}</tbody>
                  </table>
                </div>
              )}
            </div>)
          })}
        </div>
      )}
    </Card>
  </div>)
}
