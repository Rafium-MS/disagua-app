import React, { useState } from 'react'
import Card from '../components/ui/Card.jsx'
import Select from '../components/ui/Select.jsx'
import Button from '../components/ui/Button.jsx'
import { LS } from '../utils/storage.js'

export default function ComprovantesPage(){
  const [files, setFiles] = useState([])
  const [step, setStep] = useState(1)
  const [brandIdx, setBrandIdx] = useState('')
  const [brands] = useState(()=> LS.get('brands', []))

  function onDrop(e){ e.preventDefault(); const f = Array.from(e.dataTransfer.files).filter(x=>x.type.startsWith('image/')); setFiles(p=>[...p,...f]) }
  function onPick(e){ const f = Array.from(e.target.files).filter(x=>x.type.startsWith('image/')); setFiles(p=>[...p,...f]); e.target.value='' }
  const totalSize = files.reduce((acc,f)=> acc+f.size, 0)
  function simulateImport(){ setStep(4) }

  return (<div className="grid gap-4">
    <Card title="Importação de Imagens - Wizard">
      <div className="flex items-center gap-2 text-sm">{[1,2,3,4].map(i=> <div key={i} className={`px-3 py-1 rounded-full border ${i<=step?'bg-blue-600 text-white border-blue-600':'bg-white text-slate-600'}`}>Etapa {i}</div>)}</div>
      {step===1 && (<div className="mt-4 grid gap-3">
        <Select label="Associar à marca" value={brandIdx} onChange={e=>setBrandIdx(e.target.value)}><option value="">Selecione</option>{brands.map((b,i)=> <option key={b.id} value={i}>{b.marca}</option>)}</Select>
        <div onDragOver={e=>e.preventDefault()} onDrop={onDrop} className="border-2 border-dashed rounded-2xl p-10 text-center bg-slate-50">Arraste e solte imagens aqui<div className="mt-3"><input type="file" accept="image/*" multiple onChange={onPick}/></div></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">{files.map((f,idx)=> <div key={idx} className="bg-white rounded-xl border p-2 text-xs truncate">{f.name}</div>)}</div>
        <div className="flex gap-2"><Button onClick={()=>setStep(2)} disabled={!brandIdx || files.length===0}>Continuar</Button></div>
      </div>)}
      {step===2 && (<div className="mt-4 grid gap-3"><p className="text-slate-700">Verificação: {files.length} imagem(ns), {(totalSize/1024/1024).toFixed(2)} MB.</p><p className="text-emerald-700">Formato e tamanho OK (simulado).</p><div className="flex gap-2"><Button variant="subtle" onClick={()=>setStep(1)}>Voltar</Button><Button onClick={()=>setStep(3)}>Continuar</Button></div></div>)}
      {step===3 && (<div className="mt-4 grid gap-3">
        <Select label="Qualidade da imagem" defaultValue="medium"><option value="high">Alta</option><option value="medium">Média</option><option value="low">Baixa</option></Select>
        <Select label="Redimensionamento" defaultValue="medium"><option value="original">Original</option><option value="large">1920x1080</option><option value="medium">1280x720</option><option value="small">800x600</option></Select>
        <div className="flex gap-2"><Button variant="subtle" onClick={()=>setStep(2)}>Voltar</Button><Button onClick={simulateImport}>Iniciar Importação</Button></div>
      </div>)}
      {step===4 && (<div className="mt-4 grid gap-3"><p className="text-emerald-700 font-medium">Importação concluída (simulação).</p><div className="text-sm text-slate-600">Arquivos importados: {files.length}</div><Button onClick={()=>{ setFiles([]); setBrandIdx(''); setStep(1) }}>Importar mais</Button></div>)}
    </Card>
  </div>)
}
