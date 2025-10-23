import React, { useEffect, useMemo, useState } from 'react';
import Card from '../components/ui/Card.jsx';
import Input from '../components/ui/Input.jsx';
import Select from '../components/ui/Select.jsx';
import Button from '../components/ui/Button.jsx';
import { UF_OPTIONS } from '../data/ufs.js';
import { listPartners } from '../services/partners.js';
import { listStores } from '../services/stores.js';
import { listBrands } from '../services/brands.js';
import { connectPartnerStore, disconnectPartnerStore, listConnections } from '../services/partnerStores.js';

export default function ConectarPage(){
  const [partners, setPartners] = useState([]);
  const [brands, setBrands] = useState([]);
  const [stores, setStores] = useState([]);
  const [connections, setConnections] = useState([]);
  const [estado, setEstado] = useState('');
  const [cidade, setCidade] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchData(){
      setLoading(true);
      try {
        const [partnersData, storesData, brandsData, connectionsData] = await Promise.all([
          listPartners(),
          listStores(),
          listBrands(),
          listConnections(),
        ]);
        setPartners(partnersData);
        setStores(storesData);
        setBrands(brandsData);
        setConnections(connectionsData);
      } catch (err) {
        setError(err.message || 'Não foi possível carregar os dados.');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const partnersFiltered = useMemo(() => (
    partners.filter((p) => (
      (!estado || p.estado === estado) &&
      (!cidade || p.cidade.toLowerCase().includes(cidade.toLowerCase()))
    ))
  ), [partners, estado, cidade]);

  const storesFiltered = useMemo(() => (
    stores.filter((s) => (
      (!estado || s.uf === estado) &&
      (!cidade || s.municipio.toLowerCase().includes(cidade.toLowerCase()))
    ))
  ), [stores, estado, cidade]);

  const brandOf = (store) => store?.brand || brands.find((b) => b.id === store?.brandId);

  const connectionsDetailed = useMemo(() => (
    connections.map((c) => ({
      ...c,
      partner: c.partner || partners.find((p) => p.id === c.partnerId),
      store: c.store || stores.find((s) => s.id === c.storeId),
      brand: (c.store && c.store.brand) || brandOf(stores.find((s) => s.id === c.storeId)),
    })).filter((c) => c.partner && c.store)
  ), [connections, partners, stores, brands]);

  function compatibleStoresForPartner(partner){
    return stores.filter((s) => s.uf === partner.estado && s.municipio.toLowerCase() === partner.cidade.toLowerCase());
  }

  function compatiblePartnersForStore(store){
    return partners.filter((p) => p.estado === store.uf && p.cidade.toLowerCase() === store.municipio.toLowerCase());
  }

  async function connect(partnerId, storeId){
    try {
      const created = await connectPartnerStore(partnerId, storeId);
      setConnections((prev) => [
        {
          ...created,
          partner: partners.find((p) => p.id === partnerId),
          store: stores.find((s) => s.id === storeId),
        },
        ...prev,
      ]);
    } catch (err) {
      alert(err.message || 'Não foi possível conectar.');
    }
  }

  async function disconnect(id){
    if(!confirm('Desconectar esta parceria?')) return;
    try {
      await disconnectPartnerStore(id);
      setConnections((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      alert(err.message || 'Não foi possível desconectar.');
    }
  }

  return (
    <div className="grid gap-4">
      <Card
        title="Filtros de Localização"
        actions={<Button variant="subtle" onClick={() => { setEstado(''); setCidade(''); }}>Limpar</Button>}
      >
        <div className="grid md:grid-cols-3 gap-3">
          <Select label="UF" value={estado} onChange={(e) => setEstado(e.target.value)}>
            <option value="">Todos</option>
            {UF_OPTIONS.map((uf) => (
              <option key={uf} value={uf}>{uf}</option>
            ))}
          </Select>
          <Input
            label="Cidade"
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
            placeholder="Ex.: Campo Grande"
          />
        </div>
        {error && <p className="text-sm text-rose-600 mt-3">{error}</p>}
      </Card>

      <div className="grid md:grid-cols-3 gap-4">
        <Card title={`Parceiros${loading ? ' (carregando…)': ''}`}>
          {partnersFiltered.length === 0 ? (
            <p className="text-slate-500">Nenhum parceiro.</p>
          ) : (
            <ul className="space-y-2">
              {partnersFiltered.map((p) => (
                <li key={p.id} className="border rounded-xl p-3">
                  <div className="font-medium">{p.parceiro}</div>
                  <div className="text-xs text-slate-500">{p.cidade} - {p.estado}</div>
                  <div className="mt-2">
                    <div className="text-xs text-slate-600 mb-1">Lojas compatíveis nesta cidade/UF</div>
                    <div className="flex flex-wrap gap-2">
                      {compatibleStoresForPartner(p).map((s) => (
                        <Button key={s.id} onClick={() => connect(p.id, s.id)}>
                          Conectar: {s.name} ({brandOf(s)?.name || '?'})
                        </Button>
                      ))}
                      {compatibleStoresForPartner(p).length === 0 && (
                        <span className="text-xs text-slate-500">Nenhuma loja compatível</span>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card title={`Lojas${loading ? ' (carregando…)': ''}`}>
          {storesFiltered.length === 0 ? (
            <p className="text-slate-500">Nenhuma loja.</p>
          ) : (
            <ul className="space-y-2">
              {storesFiltered.map((s) => (
                <li key={s.id} className="border rounded-xl p-3">
                  <div className="font-medium">{s.name}</div>
                  <div className="text-xs text-slate-500">{brandOf(s)?.name || '—'} • {s.municipio} - {s.uf}</div>
                  <div className="mt-2">
                    <div className="text-xs text-slate-600 mb-1">Parceiros compatíveis nesta cidade/UF</div>
                    <div className="flex flex-wrap gap-2">
                      {compatiblePartnersForStore(s).map((p) => (
                        <Button key={p.id} onClick={() => connect(p.id, s.id)}>
                          Conectar: {p.parceiro}
                        </Button>
                      ))}
                      {compatiblePartnersForStore(s).length === 0 && (
                        <span className="text-xs text-slate-500">Nenhum parceiro compatível</span>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card title="Conexões Ativas">
          {connectionsDetailed.length === 0 ? (
            <p className="text-slate-500">Nenhuma conexão.</p>
          ) : (
            <ul className="space-y-2">
              {connectionsDetailed.map((c) => (
                <li key={c.id} className="border rounded-xl p-3 flex items-center justify-between">
                  <div>
                    <div className="font-medium">{c.partner.parceiro} ↔ {c.store.name}</div>
                    <div className="text-xs text-slate-500">
                      {c.partner.cidade}-{c.partner.estado} → {c.store.municipio}-{c.store.uf} • {c.brand?.name || '—'}
                    </div>
                  </div>
                  <Button variant="danger" onClick={() => disconnect(c.id)}>Desconectar</Button>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </div>
  );
}
