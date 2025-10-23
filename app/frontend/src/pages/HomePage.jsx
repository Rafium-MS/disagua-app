import React from 'react'
import Card from '../components/ui/Card.jsx'
import { Link } from 'react-router-dom'
export default function HomePage(){
  const tip="Dica: cadastre marcas e lojas primeiro, depois os parceiros, e por fim use a aba Conectar."
  return (<div className="grid gap-4 md:grid-cols-2">
    <Card title="Bem-vindo à Disagua">
      <p className="text-slate-700">SPA em React com persistência local (localStorage). {tip}</p>
      <ul className="list-disc ml-5 mt-3 text-slate-700">
        <li>Relatórios por período e por marca;</li>
        <li>Wizard de importação de comprovantes (simulado);</li>
        <li>Regra: um parceiro pode atender várias lojas; loja só pode estar com um parceiro ativo.</li>
      </ul>
    </Card>
    <Card title="Atalhos">
      <div className="flex flex-wrap gap-2">
        <Link className="underline text-blue-700" to="/lojas">Cadastrar marcas e lojas</Link>
        <Link className="underline text-blue-700" to="/parceiros">Cadastrar parceiros</Link>
        <Link className="underline text-blue-700" to="/conectar">Conectar</Link>
        <Link className="underline text-blue-700" to="/relatorios">Relatórios</Link>
      </div>
    </Card>
  </div>)
}
