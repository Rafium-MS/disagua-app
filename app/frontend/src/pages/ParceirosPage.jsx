import React, { useEffect, useState } from 'react';
import Card from '../components/ui/Card.jsx';
import Input from '../components/ui/Input.jsx';
import Select from '../components/ui/Select.jsx';
import Button from '../components/ui/Button.jsx';
import { UF_OPTIONS } from '../data/ufs.js';
import { createPartner, listPartners } from '../services/partners.js';

export default function ParceirosPage(){
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    cidade: '',
    estado: '',
    parceiro: '',
    distribuidora: '',
    cnpjCpf: '',
    telefone: '',
    email: '',
  });

  async function fetchPartners(){
    setLoading(true);
    try {
      const data = await listPartners();
      setPartners(data);
    } catch (err) {
      setError(err.message || 'Erro ao carregar parceiros.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPartners();
  }, []);

  async function onSubmit(e){
    e.preventDefault();
    setError('');
    try {
      const created = await createPartner(form);
      setPartners((prev) => [created, ...prev]);
      setForm({
        cidade: '',
        estado: '',
        parceiro: '',
        distribuidora: '',
        cnpjCpf: '',
        telefone: '',
        email: '',
      });
    } catch (err) {
      setError(err.message || 'Não foi possível criar o parceiro.');
    }
  }

  return (
    <div className="grid gap-4">
      <Card title="Cadastro de Parceiros">
        <form onSubmit={onSubmit} className="grid gap-3">
          <div className="grid md:grid-cols-3 gap-3">
            <Input
              label="Cidade"
              value={form.cidade}
              onChange={(e) => setForm({ ...form, cidade: e.target.value })}
              required
            />
            <Select
              label="Estado"
              value={form.estado}
              onChange={(e) => setForm({ ...form, estado: e.target.value })}
              required
            >
              <option value="">Selecione</option>
              {UF_OPTIONS.map((uf) => (
                <option key={uf} value={uf}>{uf}</option>
              ))}
            </Select>
            <Input
              label="Nome do Parceiro"
              value={form.parceiro}
              onChange={(e) => setForm({ ...form, parceiro: e.target.value })}
              required
            />
          </div>
          <div className="grid md:grid-cols-4 gap-3">
            <Input
              label="Distribuidora"
              value={form.distribuidora}
              onChange={(e) => setForm({ ...form, distribuidora: e.target.value })}
            />
            <Input
              label="CNPJ/CPF"
              value={form.cnpjCpf}
              onChange={(e) => setForm({ ...form, cnpjCpf: e.target.value })}
            />
            <Input
              label="Telefone"
              value={form.telefone}
              onChange={(e) => setForm({ ...form, telefone: e.target.value })}
            />
            <Input
              label="Email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          {error && <p className="text-sm text-rose-600">{error}</p>}
          <div className="flex gap-2">
            <Button type="submit">Cadastrar Parceiro</Button>
          </div>
        </form>
      </Card>
      <Card title="Parceiros Cadastrados">
        {loading && partners.length === 0 ? (
          <p className="text-slate-500">Carregando…</p>
        ) : partners.length === 0 ? (
          <p className="text-slate-500">Nenhum parceiro cadastrado.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-slate-100 text-left">
                  {['Parceiro', 'Distribuidora', 'CNPJ/CPF', 'Telefone', 'Email', 'Cidade', 'UF'].map((h) => (
                    <th key={h} className="px-3 py-2">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {partners.map((p) => (
                  <tr key={p.id} className="border-b">
                    <td className="px-3 py-2">{p.parceiro}</td>
                    <td className="px-3 py-2">{p.distribuidora || '—'}</td>
                    <td className="px-3 py-2">{p.cnpjCpf || '—'}</td>
                    <td className="px-3 py-2">{p.telefone || '—'}</td>
                    <td className="px-3 py-2">{p.email || '—'}</td>
                    <td className="px-3 py-2">{p.cidade}</td>
                    <td className="px-3 py-2">{p.estado}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
