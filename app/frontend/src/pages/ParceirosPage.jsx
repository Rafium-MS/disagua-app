import React, { useEffect, useState } from 'react'
import Card from '../components/ui/Card.jsx'
import Input from '../components/ui/Input.jsx'
import Select from '../components/ui/Select.jsx'
import Button from '../components/ui/Button.jsx'
import { UF_OPTIONS } from '../data/ufs.js'
import { LS } from '../utils/storage.js'

export default function ParceirosPage(){
  const [partners, setPartners] = useState(()=> LS.get('partners', []))
  const [form, setForm] = useState({ cidade:'', estado:'', parceiro:'', distribuidora:'', cnpj_cpf:'', telefone:'', email:'', cx_copo:0, dez_litros:0, vinte_litros:0, mil_quinhentos_ml:0, vasilhame:0 })
  useEffect(()=> LS.set('partners', partners), [partners])
  function onSubmit(e){ e.preventDefault(); const id = crypto.randomUUID(); setPartners(a=>[...a,{...form,id}]); setForm({ cidade:'', estado:'', parceiro:'', distribuidora:'', cnpj_cpf:'', telefone:'', email:'', cx_copo:0, dez_litros:0, vinte_litros:0, mil_quinhentos_ml:0, vasilhame:0 }) }
  function remove(id){ if(!confirm('Remover parceiro?')) return; setPartners(a=>a.filter(x=>x.id!==id)) }
  return (<div className="grid gap-4">
    <Card title="Cadastro de Parceiros">
      <form onSubmit={onSubmit} className="grid gap-3">
        <div className="grid md:grid-cols-3 gap-3">
          <Input label="Cidade" value={form.cidade} onChange={e=>setForm({...form,cidade:e.target.value})} required />
          <Select label="Estado" value={form.estado} onChange={e=>setForm({...form,estado:e.target.value})} required>
            <option value="">Selecione</option>{UF_OPTIONS.map(uf=> <option key={uf} value={uf}>{uf}</option>)}
          </Select>
          <Input label="Parceiro" value={form.parceiro} onChange={e=>setForm({...form,parceiro:e.target.value})} required />
        </div>
        <div className="grid md:grid-cols-4 gap-3">
          <Input label="Distribuidora" value={form.distribuidora} onChange={e=>setForm({...form,distribuidora:e.target.value})} />
          <Input label="CNPJ/CPF" value={form.cnpj_cpf} onChange={e=>setForm({...form,cnpj_cpf:e.target.value})} required />
          <Input label="Telefone" value={form.telefone} onChange={e=>setForm({...form,telefone:e.target.value})} required />
          <Input label="Email" type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
        </div>
        <div className="grid md:grid-cols-5 gap-3">
          <Input label="Valor CX Copo" type="number" step="0.01" value={form.cx_copo} onChange={e=>setForm({...form,cx_copo:e.target.value})} />
          <Input label="Valor 10L" type="number" step="0.01" value={form.dez_litros} onChange={e=>setForm({...form,dez_litros:e.target.value})} />
          <Input label="Valor 20L" type="number" step="0.01" value={form.vinte_litros} onChange={e=>setForm({...form,vinte_litros:e.target.value})} />
          <Input label="Valor 1500ml" type="number" step="0.01" value={form.mil_quinhentos_ml} onChange={e=>setForm({...form,mil_quinhentos_ml:e.target.value})} />
          <Input label="Vasilhame" type="number" step="0.01" value={form.vasilhame} onChange={e=>setForm({...form,vasilhame:e.target.value})} />
        </div>
        <div className="flex gap-2"><Button type="submit">Cadastrar Parceiro</Button></div>
      </form>
    </Card>
    <Card title="Parceiros Cadastrados">
      {partners.length===0 ? <p className="text-slate-500">Nenhum parceiro cadastrado.</p> : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead><tr className="bg-slate-100 text-left">{["Cidade","UF","Parceiro","Distribuidora","CNPJ/CPF","Telefone","Email","Ações"].map(h=> <th key={h} className="px-3 py-2">{h}</th>)}</tr></thead>
            <tbody>{partners.map(p=> (
              <tr key={p.id} className="border-b">
                <td className="px-3 py-2">{p.cidade}</td><td className="px-3 py-2">{p.estado}</td><td className="px-3 py-2">{p.parceiro}</td><td className="px-3 py-2">{p.distribuidora}</td>
                <td className="px-3 py-2">{p.cnpj_cpf}</td><td className="px-3 py-2">{p.telefone}</td><td className="px-3 py-2">{p.email}</td>
                <td className="px-3 py-2"><Button variant="danger" onClick={()=>remove(p.id)}>Excluir</Button></td>
              </tr>))}</tbody>
          </table>
        </div>
      )}
    </Card>
  </div>)
}
