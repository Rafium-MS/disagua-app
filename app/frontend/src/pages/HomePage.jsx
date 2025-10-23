import React from 'react';
import Card from '../components/ui/Card.jsx';
import { Link } from 'react-router-dom';

export default function HomePage(){
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card title="Bem-vindo à Diságua">
        <p className="text-slate-700">
          Portal operacional conectado ao backend NestJS. Cadastre marcas, lojas e parceiros para
          alimentar relatórios e a conciliação de comprovantes.
        </p>
        <ul className="list-disc ml-5 mt-3 text-slate-700">
          <li>Autenticação com controle multi-organização.</li>
          <li>Cadastro centralizado de marcas, lojas e parceiros.</li>
          <li>Vinculação entre parceiros e lojas com regras de exclusividade.</li>
          <li>Relatórios consolidados por período e exportação em CSV ou PDF.</li>
        </ul>
      </Card>
      <Card title="Atalhos">
        <div className="flex flex-wrap gap-2">
          <Link className="underline text-blue-700" to="/lojas">Cadastrar marcas e lojas</Link>
          <Link className="underline text-blue-700" to="/parceiros">Cadastrar parceiros</Link>
          <Link className="underline text-blue-700" to="/conectar">Conectar</Link>
          <Link className="underline text-blue-700" to="/comprovantes">Comprovantes</Link>
          <Link className="underline text-blue-700" to="/relatorios">Relatórios</Link>
        </div>
      </Card>
    </div>
  );
}
