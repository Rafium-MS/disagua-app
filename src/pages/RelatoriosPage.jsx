import React, { useEffect, useMemo, useState } from 'react'
import Card from '../components/ui/Card.jsx'
import Input from '../components/ui/Input.jsx'
import Select from '../components/ui/Select.jsx'
import Button from '../components/ui/Button.jsx'
import Stat from '../components/ui/Stat.jsx'
import { LS } from '../utils/storage.js'
import { currencyBRL } from '../utils/currency.js'

export default function RelatoriosPage(){
  const [brands] = useState(()=> LS.get('brands', []))
  const [stores] = useState(()=> LS.get('stores', []))
  const [data, setData] = useState(()=> LS.get('reportData', []))

  const [startDate, setStartDate] = useState(()=> new Date(Date.now()-1000*60*60*24*30).toISOString().slice(0,10))
  const [endDate, setEndDate] = useState(()=> new Date().toISOString().slice(0,10))
  const [marcaId, setMarcaId] = useState('')

  useEffect(()=> LS.set('reportData', data), [data])

  function ensureSample(){
    if (data?.length>0) return
    if (brands.length===0 || stores.length===0){
      alert('Cadastre marcas e lojas para gerar dados de exemplo.')
      return
    }
    const gen = []
    for (let i=0;i<80;i++){
      const b = brands[Math.floor(Math.random()*brands.length)]
      const brandStores = stores.filter(s=> s.marca_id === b.id || String(s.marca_id) === String(b.id))
      if (brandStores.length===0) continue
      const st = brandStores[Math.floor(Math.random()*brandStores.length)]
      const d = new Date(Date.now() - Math.floor(Math.random()*90)*24*3600*1000).toISOString().slice(0,10)
      gen.push({ marca: b.marca, loja: st.loja, data: d,
        valor_20l: +(Math.random()*100).toFixed(2),
        valor_10l: +(Math.random()*80).toFixed(2),
        valor_1500ml: +(Math.random()*50).toFixed(2),
        valor_cx_copo: +(Math.random()*120).toFixed(2),
        valor_vasilhame: +(Math.random()*30).toFixed(2),
      })
    }
    setData(gen)
  }

  const filtered = useMemo(()=>{
    const s = new Date(startDate)
    const e = new Date(endDate)
    return data.filter(x=>{
      const d = new Date(x.data)
      const inRange = d>=s && d<=e
      const brandOk = !marcaId || x.marca === (brands.find(b => b.id===marcaId || String(b.id)===String(marcaId))?.marca)
      return inRange && brandOk
    })
  }, [data, startDate, endDate, marcaId, brands])

  const grouped = useMemo(()=>{
    const g = {}
    for (const row of filtered){ (g[row.marca] ??= []).push(row) }
    return g
  }, [filtered])

  const totals = useMemo(()=>{
    let t20=0,t10=0,t15=0,tc=0,tv=0,gt=0
    for (const r of filtered){
      t20 += Number(r.valor_20l||0)
      t10 += Number(r.valor_10l||0)
      t15 += Number(r.valor_1500ml||0)
      tc  += Number(r.valor_cx_copo||0)
      tv  += Number(r.valor_vasilhame||0)
      gt  += Number(r.valor_20l||0)+Number(r.valor_10l||0)+Number(r.valor_1500ml||0)+Number(r.valor_cx_copo||0)+Number(r.valor_vasilhame||0)
    }
    return { t20,t10,t15,tc,tv,gt }
  }, [filtered])

  return (
    <div className="grid gap-4">
      <Card title="Gerar Relatório" actions={<Button variant="subtle" onClick={ensureSample}>Gerar dados de exemplo</Button>}>
        <div className="grid md:grid-cols-4 gap-3">
          <Input label="Data inicial" type="date" value={startDate} onChange={e=>setStartDate(e.target.value)} />
          <Input label="Data final" type="date" value={endDate} onChange={e=>setEndDate(e.target.value)} />
          <Select label="Marca" value={marcaId} onChange={e=>setMarcaId(e.target.value)}>
            <option value="">Todas</option>
            {brands.map(b => <option key={b.id} value={b.id}>{b.marca}</option>)}
          </Select>
        </div>
      </Card>

      <Card title="Resumo">
        <div className="grid md:grid-cols-4 gap-3 text-sm">
          <Stat label="Registros" value={filtered.length} />
          <Stat label="Total" value={currencyBRL(totals.gt)} />
          <Stat label="Total 20L" value={currencyBRL(totals.t20)} />
          <Stat label="Total 10L" value={currencyBRL(totals.t10)} />
        </div>
      </Card>

      <Card title="Relatório Detalhado">
        {filtered.length===0 ? <p className="text-slate-500">Nenhum dado para o filtro atual.</p> : (
          <div className="space-y-6">
            {Object.entries(grouped).map(([marca, rows]) => (
              <div key={marca} className="border rounded-xl overflow-hidden">
                <div className="bg-slate-100 px-4 py-2 font-medium">{marca}</div>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="bg-white text-left">
                        {["Loja","Data","20L","10L","1500ml","CX Copo","Vasilhame","Total"].map(h => <th key={h} className="px-3 py-2">{h}</th>)}
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((r, idx) => {
                        const total = Number(r.valor_20l||0)+Number(r.valor_10l||0)+Number(r.valor_1500ml||0)+Number(r.valor_cx_copo||0)+Number(r.valor_vasilhame||0)
                        return (
                          <tr key={idx} className="border-t">
                            <td className="px-3 py-2">{r.loja}</td>
                            <td className="px-3 py-2">{new Date(r.data).toLocaleDateString('pt-BR')}</td>
                            <td className="px-3 py-2">{currencyBRL(r.valor_20l)}</td>
                            <td className="px-3 py-2">{currencyBRL(r.valor_10l)}</td>
                            <td className="px-3 py-2">{currencyBRL(r.valor_1500ml)}</td>
                            <td className="px-3 py-2">{currencyBRL(r.valor_cx_copo)}</td>
                            <td className="px-3 py-2">{currencyBRL(r.valor_vasilhame)}</td>
                            <td className="px-3 py-2">{currencyBRL(total)}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}
