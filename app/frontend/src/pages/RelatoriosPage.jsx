import React, { useEffect, useMemo, useState } from 'react';
import Card from '../components/ui/Card.jsx';
import Input from '../components/ui/Input.jsx';
import Select from '../components/ui/Select.jsx';
import Button from '../components/ui/Button.jsx';
import Stat from '../components/ui/Stat.jsx';
import { listBrands } from '../services/brands.js';
import { createReportPeriod, getReports } from '../services/reports.js';
import { currencyBRL } from '../utils/currency.js';
import { exportToPDF, exportToXLSX } from '../utils/exporters.js';

function makeExportRows(entries){
  return entries.map((r) => ({
    Marca: r.brand?.name || '—',
    Loja: r.store?.name || '—',
    Data: new Date(r.data).toLocaleDateString('pt-BR'),
    '20L': currencyBRL(r.valor20l),
    '10L': currencyBRL(r.valor10l),
    '1500ml': currencyBRL(r.valor1500ml),
    'CX Copo': currencyBRL(r.valorCxCopo),
    Vasilhame: currencyBRL(r.valorVasilhame),
    Total: currencyBRL(r.total),
  }));
}

export default function RelatoriosPage(){
  const [brands, setBrands] = useState([]);
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [startDate, setStartDate] = useState(() => new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString().slice(0, 10));
  const [endDate, setEndDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [marcaId, setMarcaId] = useState('');

  useEffect(() => {
    async function loadBrands(){
      try {
        const data = await listBrands();
        setBrands(data);
      } catch (err) {
        setError(err.message || 'Não foi possível carregar as marcas.');
      }
    }
    loadBrands();
  }, []);

  async function loadReports(){
    setLoading(true);
    setError('');
    try {
      const data = await getReports({
        start: startDate,
        end: endDate,
        brand: marcaId || undefined,
      });
      setEntries(data.entries || []);
    } catch (err) {
      setError(err.message || 'Não foi possível carregar os relatórios.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadReports();
  }, [startDate, endDate, marcaId]);

  const grouped = useMemo(() => {
    const g = {};
    for(const entry of entries){
      const key = entry.brand?.name || '—';
      (g[key] ??= []).push(entry);
    }
    return g;
  }, [entries]);

  const totals = useMemo(() => {
    let t20 = 0, t10 = 0, t15 = 0, tc = 0, tv = 0, gt = 0;
    for(const r of entries){
      t20 += Number(r.valor20l || 0);
      t10 += Number(r.valor10l || 0);
      t15 += Number(r.valor1500ml || 0);
      tc += Number(r.valorCxCopo || 0);
      tv += Number(r.valorVasilhame || 0);
      gt += Number(r.total || 0);
    }
    return { t20, t10, t15, tc, tv, gt };
  }, [entries]);

  async function ensurePeriod(){
    if(!startDate){
      alert('Informe uma data inicial.');
      return;
    }
    try {
      const date = new Date(startDate);
      await createReportPeriod({ y: date.getFullYear(), m: date.getMonth() + 1 });
      alert('Período garantido com sucesso.');
    } catch (err) {
      alert(err.message || 'Não foi possível criar o período.');
    }
  }

  const exportRows = makeExportRows(entries);

  return (
    <div className="grid gap-4">
      <Card
        title="Gerar Relatório"
        actions={<Button variant="subtle" onClick={ensurePeriod}>Garantir período</Button>}
      >
        <div className="grid md:grid-cols-4 gap-3">
          <Input label="Data inicial" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          <Input label="Data final" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          <Select label="Marca" value={marcaId} onChange={(e) => setMarcaId(e.target.value)}>
            <option value="">Todas</option>
            {brands.map((b) => (
              <option key={b.id} value={b.id}>{b.name}</option>
            ))}
          </Select>
          <div className="flex items-end">
            <Button onClick={loadReports} disabled={loading}>Atualizar</Button>
          </div>
        </div>
        {error && <p className="text-sm text-rose-600 mt-3">{error}</p>}
      </Card>
      <Card
        title="Resumo"
        actions={
          <>
            <button
              onClick={() => exportToXLSX(exportRows)}
              className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm mr-2"
            >
              Exportar Excel
            </button>
            <button
              onClick={() => exportToPDF(exportRows)}
              className="bg-slate-800 hover:bg-slate-900 text-white px-3 py-2 rounded-lg text-sm"
            >
              Exportar PDF
            </button>
          </>
        }
      >
        <div className="grid md:grid-cols-4 gap-3 text-sm">
          <Stat label="Registros" value={entries.length} />
          <Stat label="Total" value={currencyBRL(totals.gt)} />
          <Stat label="Total 20L" value={currencyBRL(totals.t20)} />
          <Stat label="Total 10L" value={currencyBRL(totals.t10)} />
        </div>
      </Card>
      <Card title="Relatório Detalhado">
        {loading ? (
          <p className="text-slate-500">Carregando…</p>
        ) : entries.length === 0 ? (
          <p className="text-slate-500">Nenhum dado para o filtro atual.</p>
        ) : (
          <div className="space-y-6">
            {Object.entries(grouped).map(([marca, rows]) => (
              <div key={marca} className="border rounded-xl overflow-hidden">
                <div className="bg-slate-100 px-4 py-2 font-medium">{marca}</div>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="bg-white text-left">
                        {['Loja', 'Data', '20L', '10L', '1500ml', 'CX Copo', 'Vasilhame', 'Total'].map((h) => (
                          <th key={h} className="px-3 py-2">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((r) => (
                        <tr key={r.id} className="border-t">
                          <td className="px-3 py-2">{r.store?.name || '—'}</td>
                          <td className="px-3 py-2">{new Date(r.data).toLocaleDateString('pt-BR')}</td>
                          <td className="px-3 py-2">{currencyBRL(r.valor20l)}</td>
                          <td className="px-3 py-2">{currencyBRL(r.valor10l)}</td>
                          <td className="px-3 py-2">{currencyBRL(r.valor1500ml)}</td>
                          <td className="px-3 py-2">{currencyBRL(r.valorCxCopo)}</td>
                          <td className="px-3 py-2">{currencyBRL(r.valorVasilhame)}</td>
                          <td className="px-3 py-2">{currencyBRL(r.total)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
