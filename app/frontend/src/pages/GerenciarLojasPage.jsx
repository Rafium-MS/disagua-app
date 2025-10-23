import React, { useEffect, useMemo, useState } from 'react';
import Card from '../components/ui/Card.jsx';
import Input from '../components/ui/Input.jsx';
import Select from '../components/ui/Select.jsx';
import Button from '../components/ui/Button.jsx';
import { UF_OPTIONS } from '../data/ufs.js';
import { listStores } from '../services/stores.js';
import { listBrands } from '../services/brands.js';
import { currencyBRL } from '../utils/currency.js';

export default function GerenciarLojasPage(){
  const [stores, setStores] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [q, setQ] = useState('');
  const [uf, setUF] = useState('');
  const [brandId, setBrandId] = useState('');
  const [cidade, setCidade] = useState('');

  async function fetchData(){
    setLoading(true);
    setError('');
    try {
      const [brandsData, storesData] = await Promise.all([listBrands(), listStores()]);
      setBrands(brandsData);
      setStores(storesData);
    } catch (err) {
      setError(err.message || 'Não foi possível carregar as lojas.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const filtered = useMemo(() => {
    const ql = q.trim().toLowerCase();
    return stores.filter((store) => {
      const brandName = brands.find((b) => b.id === store.brandId)?.name || '';
      const text = `${store.name} ${brandName} ${store.municipio} ${store.endereco || ''} ${store.localEntrega || ''}`.toLowerCase();
      const okQ = !ql || text.includes(ql);
      const okUF = !uf || store.uf === uf;
      const okBrand = !brandId || store.brandId === brandId;
      const okCidade = !cidade || store.municipio?.toLowerCase().includes(cidade.toLowerCase());
      return okQ && okUF && okBrand && okCidade;
    });
  }, [stores, brands, q, uf, brandId, cidade]);

  return (
    <div className="grid gap-4">
      <Card
        title="Gerenciar Lojas"
        actions={
          <a href="/lojas" className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-3 py-2 rounded-lg text-sm">
            Voltar para Cadastro
          </a>
        }
      >
        <div className="grid md:grid-cols-5 gap-3">
          <Input label="Buscar" placeholder="Loja, marca, endereço…" value={q} onChange={(e) => setQ(e.target.value)} />
          <Select label="Marca" value={brandId} onChange={(e) => setBrandId(e.target.value)}>
            <option value="">Todas</option>
            {brands.map((b) => (
              <option key={b.id} value={b.id}>{b.name}</option>
            ))}
          </Select>
          <Select label="UF" value={uf} onChange={(e) => setUF(e.target.value)}>
            <option value="">Todas</option>
            {UF_OPTIONS.map((u) => (
              <option key={u} value={u}>{u}</option>
            ))}
          </Select>
          <Input label="Cidade" value={cidade} onChange={(e) => setCidade(e.target.value)} />
          <div className="flex items-end">
            <Button variant="subtle" onClick={() => { setQ(''); setUF(''); setBrandId(''); setCidade(''); }}>
              Limpar
            </Button>
          </div>
        </div>
        {error && <p className="text-sm text-rose-600 mt-3">{error}</p>}
      </Card>

      <Card title={`Lojas (${filtered.length})${loading ? ' - carregando…' : ''}`}>
        {filtered.length === 0 ? (
          <p className="text-slate-500">Nenhuma loja para os filtros atuais.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-slate-100 text-left">
                  {['Marca', 'Loja', 'Município', 'UF', '20L', '10L', '1500ml', 'CX Copo', 'Vasilhame'].map((h) => (
                    <th key={h} className="px-3 py-2">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((s) => (
                  <tr key={s.id} className="border-b">
                    <td className="px-3 py-2">{brands.find((b) => b.id === s.brandId)?.name || '—'}</td>
                    <td className="px-3 py-2">{s.name}</td>
                    <td className="px-3 py-2">{s.municipio}</td>
                    <td className="px-3 py-2">{s.uf}</td>
                    <td className="px-3 py-2">{currencyBRL(s.valor20l)}</td>
                    <td className="px-3 py-2">{currencyBRL(s.valor10l)}</td>
                    <td className="px-3 py-2">{currencyBRL(s.valor1500ml)}</td>
                    <td className="px-3 py-2">{currencyBRL(s.valorCxCopo)}</td>
                    <td className="px-3 py-2">{currencyBRL(s.valorVasilhame)}</td>
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
