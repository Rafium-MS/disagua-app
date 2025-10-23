import React, { useEffect, useState } from 'react';
import Card from '../components/ui/Card.jsx';
import Input from '../components/ui/Input.jsx';
import Select from '../components/ui/Select.jsx';
import Button from '../components/ui/Button.jsx';
import { UF_OPTIONS } from '../data/ufs.js';
import { createBrand, listBrands } from '../services/brands.js';
import { createStore, listStores } from '../services/stores.js';
import { currencyBRL } from '../utils/currency.js';

export default function LojasPage(){
  const [brands, setBrands] = useState([]);
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [brandError, setBrandError] = useState('');
  const [storeError, setStoreError] = useState('');
  const [brandForm, setBrandForm] = useState({ name: '', codDisagua: '' });
  const [storeForm, setStoreForm] = useState({
    brandId: '',
    name: '',
    localEntrega: '',
    endereco: '',
    municipio: '',
    uf: '',
    valor20l: '',
    valor10l: '',
    valor1500ml: '',
    valorCxCopo: '',
    valorVasilhame: '',
  });

  async function fetchData(){
    setLoading(true);
    setBrandError('');
    setStoreError('');
    try {
      const [brandsData, storesData] = await Promise.all([listBrands(), listStores()]);
      setBrands(brandsData);
      setStores(storesData);
    } catch (err) {
      const message = err.message || 'Não foi possível carregar os dados.';
      setBrandError(message);
      setStoreError(message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function onCreateBrand(e){
    e.preventDefault();
    setBrandError('');
    try {
      const created = await createBrand(brandForm);
      setBrands((prev) => [...prev, created]);
      setBrandForm({ name: '', codDisagua: '' });
    } catch (err) {
      setBrandError(err.message || 'Não foi possível criar a marca.');
    }
  }

  async function onCreateStore(e){
    e.preventDefault();
    setStoreError('');
    const payload = {
      brandId: storeForm.brandId,
      name: storeForm.name,
      localEntrega: storeForm.localEntrega,
      endereco: storeForm.endereco,
      municipio: storeForm.municipio,
      uf: storeForm.uf,
      valor20l: Number(storeForm.valor20l || 0),
      valor10l: Number(storeForm.valor10l || 0),
      valor1500ml: Number(storeForm.valor1500ml || 0),
      valorCxCopo: Number(storeForm.valorCxCopo || 0),
      valorVasilhame: Number(storeForm.valorVasilhame || 0),
    };
    try {
      await createStore(payload);
      const refreshed = await listStores();
      setStores(refreshed);
      setStoreForm({
        brandId: '',
        name: '',
        localEntrega: '',
        endereco: '',
        municipio: '',
        uf: '',
        valor20l: '',
        valor10l: '',
        valor1500ml: '',
        valorCxCopo: '',
        valorVasilhame: '',
      });
    } catch (err) {
      setStoreError(err.message || 'Não foi possível criar a loja.');
    }
  }

  return (
    <div className="grid gap-4">
      <Card
        title="Cadastro de Marcas"
        actions={
          <a
            href="/lojas/gerenciar"
            className="bg-slate-800 hover:bg-slate-900 text-white px-3 py-2 rounded-lg text-sm"
          >
            Gerenciar Lojas
          </a>
        }
      >
        <form onSubmit={onCreateBrand} className="grid md:grid-cols-3 gap-3">
          <Input
            label="Nome da Marca"
            value={brandForm.name}
            onChange={(e) => setBrandForm({ ...brandForm, name: e.target.value })}
            required
          />
          <Input
            label="Cód. Matriz"
            value={brandForm.codDisagua}
            onChange={(e) => setBrandForm({ ...brandForm, codDisagua: e.target.value })}
          />
          <div className="flex items-end">
            <Button type="submit">Cadastrar Marca</Button>
          </div>
        </form>
        {brandError && <p className="text-sm text-rose-600 mt-2">{brandError}</p>}
      </Card>

      <Card title="Cadastro de Lojas">
        <form onSubmit={onCreateStore} className="grid gap-3">
          <div className="grid md:grid-cols-3 gap-3">
            <Select
              label="Marca"
              value={storeForm.brandId}
              onChange={(e) => setStoreForm({ ...storeForm, brandId: e.target.value })}
              required
            >
              <option value="">Selecione</option>
              {brands.map((b) => (
                <option key={b.id} value={b.id}>{b.name}</option>
              ))}
            </Select>
            <Input
              label="Nome da loja"
              value={storeForm.name}
              onChange={(e) => setStoreForm({ ...storeForm, name: e.target.value })}
              required
            />
            <Input
              label="Local da entrega"
              value={storeForm.localEntrega}
              onChange={(e) => setStoreForm({ ...storeForm, localEntrega: e.target.value })}
              required
            />
          </div>
          <div className="grid md:grid-cols-4 gap-3">
            <Input
              label="Endereço"
              value={storeForm.endereco}
              onChange={(e) => setStoreForm({ ...storeForm, endereco: e.target.value })}
            />
            <Input
              label="Município"
              value={storeForm.municipio}
              onChange={(e) => setStoreForm({ ...storeForm, municipio: e.target.value })}
              required
            />
            <Select
              label="UF"
              value={storeForm.uf}
              onChange={(e) => setStoreForm({ ...storeForm, uf: e.target.value })}
              required
            >
              <option value="">Selecione</option>
              {UF_OPTIONS.map((uf) => (
                <option key={uf} value={uf}>{uf}</option>
              ))}
            </Select>
          </div>
          <div className="grid md:grid-cols-5 gap-3">
            <Input
              label="Valor 20L"
              type="number"
              step="0.01"
              value={storeForm.valor20l}
              onChange={(e) => setStoreForm({ ...storeForm, valor20l: e.target.value })}
            />
            <Input
              label="Valor 10L"
              type="number"
              step="0.01"
              value={storeForm.valor10l}
              onChange={(e) => setStoreForm({ ...storeForm, valor10l: e.target.value })}
            />
            <Input
              label="Valor 1500ml"
              type="number"
              step="0.01"
              value={storeForm.valor1500ml}
              onChange={(e) => setStoreForm({ ...storeForm, valor1500ml: e.target.value })}
            />
            <Input
              label="Valor CX Copo"
              type="number"
              step="0.01"
              value={storeForm.valorCxCopo}
              onChange={(e) => setStoreForm({ ...storeForm, valorCxCopo: e.target.value })}
            />
          <Input
            label="Vasilhame"
            type="number"
            step="0.01"
            value={storeForm.valorVasilhame}
            onChange={(e) => setStoreForm({ ...storeForm, valorVasilhame: e.target.value })}
          />
        </div>
          {storeError && <p className="text-sm text-rose-600">{storeError}</p>}
          <div className="flex gap-2">
            <Button type="submit">Cadastrar Loja</Button>
          </div>
        </form>
      </Card>

      <Card title={`Marcas e Lojas cadastradas${loading ? ' (carregando…)': ''}`}>
        {stores.length === 0 ? (
          <p className="text-slate-500">Nenhuma loja cadastrada.</p>
        ) : (
          <div className="space-y-3">
            {brands.map((brand) => {
              const brandStores = stores.filter((s) => s.brandId === brand.id);
              return (
                <div key={brand.id} className="border rounded-xl overflow-hidden">
                  <div className="flex items-center justify-between bg-slate-100 px-4 py-2">
                    <div className="font-medium">
                      {brand.name}{' '}
                      <span className="text-slate-500 text-xs">{brand.codDisagua || ''}</span>
                    </div>
                  </div>
                  {brandStores.length === 0 ? (
                    <div className="p-4 text-slate-500">Nenhuma loja nesta marca.</div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="min-w-full text-sm">
                        <thead>
                          <tr className="bg-white">
                            {['Loja', 'Local', 'Endereço', 'Município', 'UF', '20L', '10L', '1500ml', 'CX Copo', 'Vasilhame'].map((h) => (
                              <th key={h} className="px-3 py-2 text-left">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {brandStores.map((s) => (
                            <tr key={s.id} className="border-t">
                              <td className="px-3 py-2">{s.name}</td>
                              <td className="px-3 py-2">{s.localEntrega || '—'}</td>
                              <td className="px-3 py-2">{s.endereco || '—'}</td>
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
                </div>
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
}
