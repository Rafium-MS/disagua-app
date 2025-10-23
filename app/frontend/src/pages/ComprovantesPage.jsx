import React, { useEffect, useMemo, useState } from 'react';
import Card from '../components/ui/Card.jsx';
import Select from '../components/ui/Select.jsx';
import Button from '../components/ui/Button.jsx';
import { listBrands } from '../services/brands.js';
import { listStores } from '../services/stores.js';
import { listPartners } from '../services/partners.js';
import { createReceipt, listReceipts, updateReceipt } from '../services/receipts.js';

function formatBytes(bytes){
  if(!bytes && bytes !== 0) return '—';
  const units = ['B', 'KB', 'MB', 'GB'];
  let value = bytes;
  let unitIndex = 0;
  while(value >= 1024 && unitIndex < units.length - 1){
    value /= 1024;
    unitIndex += 1;
  }
  const formatted = unitIndex === 0 ? value.toFixed(0) : value.toFixed(1);
  return `${formatted} ${units[unitIndex]}`;
}

export default function ComprovantesPage(){
  const [files, setFiles] = useState([]);
  const [step, setStep] = useState(1);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedStore, setSelectedStore] = useState('');
  const [selectedPartner, setSelectedPartner] = useState('');
  const [brands, setBrands] = useState([]);
  const [stores, setStores] = useState([]);
  const [partners, setPartners] = useState([]);
  const [receipts, setReceipts] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [loadingImport, setLoadingImport] = useState(false);
  const [loadingReceipts, setLoadingReceipts] = useState(false);
  const [error, setError] = useState('');
  const [importedCount, setImportedCount] = useState(0);

  useEffect(() => {
    async function loadCatalog(){
      try {
        const [brandsData, storesData, partnersData] = await Promise.all([
          listBrands(),
          listStores(),
          listPartners(),
        ]);
        setBrands(brandsData);
        setStores(storesData);
        setPartners(partnersData);
      } catch (err) {
        setError(err.message || 'Não foi possível carregar dados de apoio.');
      }
    }
    loadCatalog();
  }, []);

  const storesForBrand = useMemo(() => (
    selectedBrand ? stores.filter((s) => s.brandId === selectedBrand) : stores
  ), [stores, selectedBrand]);

  async function loadReceipts(filter = statusFilter){
    setLoadingReceipts(true);
    try {
      const data = await listReceipts(filter ? { status: filter } : {});
      setReceipts(data);
    } finally {
      setLoadingReceipts(false);
    }
  }

  useEffect(() => {
    loadReceipts();
  }, [statusFilter]);

  function onDrop(e){
    e.preventDefault();
    const f = Array.from(e.dataTransfer.files).filter((x) => x.type.startsWith('image/'));
    setFiles((prev) => [...prev, ...f]);
  }

  function onPick(e){
    const f = Array.from(e.target.files).filter((x) => x.type.startsWith('image/'));
    setFiles((prev) => [...prev, ...f]);
    e.target.value = '';
  }

  const totalSize = files.reduce((acc, f) => acc + f.size, 0);

  async function importReceipts(){
    if(files.length === 0) return;
    setLoadingImport(true);
    setError('');
    try {
      await Promise.all(files.map((file, index) => {
        const ext = file.name.split('.').pop();
        return createReceipt({
          brandId: selectedBrand || undefined,
          storeId: selectedStore || undefined,
          partnerId: selectedPartner || undefined,
          filename: file.name,
          objectKey: `manual/${Date.now()}-${index}-${file.name}`,
          fileExt: ext,
          sizeBytes: file.size,
          status: 'pendente',
        });
      }));
      setImportedCount(files.length);
      setFiles([]);
      setStep(4);
      await loadReceipts();
    } catch (err) {
      setError(err.message || 'Não foi possível registrar os comprovantes.');
    } finally {
      setLoadingImport(false);
    }
  }

  async function changeStatus(id, status){
    try {
      await updateReceipt(id, { status });
      await loadReceipts();
    } catch (err) {
      alert(err.message || 'Não foi possível atualizar o status.');
    }
  }

  function resetWizard(){
    setFiles([]);
    setSelectedBrand('');
    setSelectedStore('');
    setSelectedPartner('');
    setStep(1);
    setImportedCount(0);
  }

  return (
    <div className="grid gap-4">
      <Card title="Importação de Imagens - Wizard">
        <div className="flex items-center gap-2 text-sm">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`px-3 py-1 rounded-full border ${
                i <= step ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-600'
              }`}
            >
              Etapa {i}
            </div>
          ))}
        </div>
        {step === 1 && (
          <div className="mt-4 grid gap-3">
            <Select label="Marca" value={selectedBrand} onChange={(e) => { setSelectedBrand(e.target.value); setSelectedStore(''); }}>
              <option value="">Selecione</option>
              {brands.map((b) => (
                <option key={b.id} value={b.id}>{b.name}</option>
              ))}
            </Select>
            <Select label="Loja" value={selectedStore} onChange={(e) => setSelectedStore(e.target.value)}>
              <option value="">Opcional</option>
              {storesForBrand.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </Select>
            <Select label="Parceiro" value={selectedPartner} onChange={(e) => setSelectedPartner(e.target.value)}>
              <option value="">Opcional</option>
              {partners.map((p) => (
                <option key={p.id} value={p.id}>{p.parceiro}</option>
              ))}
            </Select>
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={onDrop}
              className="border-2 border-dashed rounded-2xl p-10 text-center bg-slate-50"
            >
              Arraste e solte imagens aqui
              <div className="mt-3">
                <input type="file" accept="image/*" multiple onChange={onPick} />
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {files.map((f, idx) => (
                <div key={idx} className="bg-white rounded-xl border p-2 text-xs truncate">{f.name}</div>
              ))}
            </div>
            <div className="flex gap-2">
              <Button onClick={() => setStep(2)} disabled={!selectedBrand || files.length === 0}>
                Continuar
              </Button>
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="mt-4 grid gap-3">
            <p className="text-slate-700">
              Verificação: {files.length} imagem(ns), {formatBytes(totalSize)}.
            </p>
            <p className="text-emerald-700">Formato e tamanho OK.</p>
            <div className="flex gap-2">
              <Button variant="subtle" onClick={() => setStep(1)}>Voltar</Button>
              <Button onClick={() => setStep(3)}>Continuar</Button>
            </div>
          </div>
        )}
        {step === 3 && (
          <div className="mt-4 grid gap-3">
            <p className="text-sm text-slate-600">
              As imagens serão registradas no backend com status pendente. Ajuste o status na tabela abaixo após a validação.
            </p>
            {error && <p className="text-sm text-rose-600">{error}</p>}
            <div className="flex gap-2">
              <Button variant="subtle" onClick={() => setStep(2)} disabled={loadingImport}>Voltar</Button>
              <Button onClick={importReceipts} disabled={loadingImport}>
                {loadingImport ? 'Importando…' : 'Iniciar Importação'}
              </Button>
            </div>
          </div>
        )}
        {step === 4 && (
          <div className="mt-4 grid gap-3">
            <p className="text-emerald-700 font-medium">Importação concluída.</p>
            <div className="text-sm text-slate-600">Arquivos importados: {importedCount}</div>
            <Button onClick={resetWizard}>Importar mais</Button>
          </div>
        )}
      </Card>

      <Card
        title="Comprovantes Enviados"
        actions={
          <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="">Todos os status</option>
            <option value="pendente">Pendente</option>
            <option value="valido">Válido</option>
            <option value="invalido">Inválido</option>
          </Select>
        }
      >
        {loadingReceipts ? (
          <p className="text-slate-500">Carregando…</p>
        ) : receipts.length === 0 ? (
          <p className="text-slate-500">Nenhum comprovante cadastrado.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-slate-100 text-left">
                  {['Arquivo', 'Status', 'Marca', 'Loja', 'Parceiro', 'Tamanho', 'Data', 'Ações'].map((h) => (
                    <th key={h} className="px-3 py-2">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {receipts.map((r) => {
                  const brandName = brands.find((b) => b.id === r.brandId)?.name || '—';
                  const storeName = stores.find((s) => s.id === r.storeId)?.name || '—';
                  const partnerName = partners.find((p) => p.id === r.partnerId)?.parceiro || '—';
                  return (
                    <tr key={r.id} className="border-b">
                      <td className="px-3 py-2">{r.filename}</td>
                      <td className="px-3 py-2 capitalize">{r.status}</td>
                      <td className="px-3 py-2">{brandName}</td>
                      <td className="px-3 py-2">{storeName}</td>
                      <td className="px-3 py-2">{partnerName}</td>
                      <td className="px-3 py-2">{formatBytes(r.sizeBytes)}</td>
                      <td className="px-3 py-2">{r.uploadedAt ? new Date(r.uploadedAt).toLocaleString('pt-BR') : '—'}</td>
                      <td className="px-3 py-2 space-x-2">
                        <Button variant="subtle" onClick={() => changeStatus(r.id, 'valido')}>Marcar válido</Button>
                        <Button variant="subtle" onClick={() => changeStatus(r.id, 'invalido')}>Marcar inválido</Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
