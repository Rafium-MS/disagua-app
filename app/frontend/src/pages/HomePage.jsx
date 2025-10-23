import React, { useEffect, useMemo, useState } from 'react';
import Card from '../components/ui/Card.jsx';
import Select from '../components/ui/Select.jsx';
import Stat from '../components/ui/Stat.jsx';
import { getDashboard } from '../services/dashboard.js';

const monthOptions = [
  { value: 1, label: 'Janeiro' },
  { value: 2, label: 'Fevereiro' },
  { value: 3, label: 'Março' },
  { value: 4, label: 'Abril' },
  { value: 5, label: 'Maio' },
  { value: 6, label: 'Junho' },
  { value: 7, label: 'Julho' },
  { value: 8, label: 'Agosto' },
  { value: 9, label: 'Setembro' },
  { value: 10, label: 'Outubro' },
  { value: 11, label: 'Novembro' },
  { value: 12, label: 'Dezembro' },
];

const currencyFormatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
const numberFormatter = new Intl.NumberFormat('pt-BR');

export default function HomePage(){
  const now = useMemo(() => new Date(), []);
  const [selectedYear, setSelectedYear] = useState(now.getUTCFullYear());
  const [selectedMonth, setSelectedMonth] = useState(now.getUTCMonth() + 1);
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const yearOptions = useMemo(() => {
    const current = now.getUTCFullYear();
    return Array.from({ length: 5 }).map((_, index) => current - index);
  }, [now]);

  useEffect(() => {
    let isMounted = true;
    async function load(){
      setLoading(true);
      setError('');
      try {
        const data = await getDashboard({ y: selectedYear, m: selectedMonth });
        if(isMounted){
          setDashboard(data);
        }
      } catch (err) {
        if(isMounted){
          setError(err.message || 'Não foi possível carregar o dashboard.');
        }
      } finally {
        if(isMounted){
          setLoading(false);
        }
      }
    }
    load();
    return () => {
      isMounted = false;
    };
  }, [selectedYear, selectedMonth]);

  const receiptsByStatus = dashboard?.receiptsByStatus || [];
  const entriesByBrand = dashboard?.entriesByBrand || [];
  const entriesByUF = dashboard?.entriesByUF || [];
  const coverage = dashboard?.coverage;
  const pendingPartners = coverage?.pendingPartners || [];

  const maxBrand = useMemo(() => (
    entriesByBrand.reduce((max, entry) => Math.max(max, entry.total || 0), 0)
  ), [entriesByBrand]);

  const maxUf = useMemo(() => (
    entriesByUF.reduce((max, entry) => Math.max(max, entry.total || 0), 0)
  ), [entriesByUF]);

  function renderBarList(items, getLabel, maxValue){
    if(items.length === 0){
      return <p className="text-sm text-slate-500">Sem dados para o período selecionado.</p>;
    }
    return (
      <div className="space-y-3">
        {items.map((item) => {
          const total = item.total || 0;
          const width = maxValue > 0
            ? Math.max(Math.min((total / maxValue) * 100, 100), total > 0 ? 4 : 0)
            : 0;
          return (
            <div key={getLabel(item)}>
              <div className="flex justify-between text-sm font-medium text-slate-600">
                <span>{getLabel(item)}</span>
                <span>{currencyFormatter.format(total)}</span>
              </div>
              <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-2 bg-blue-600"
                  style={{ width: `${width}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      <Card
        title="Resumo do período"
        actions={(
          <div className="flex flex-wrap gap-2">
            <Select
              value={String(selectedMonth)}
              onChange={(event) => setSelectedMonth(Number(event.target.value))}
            >
              {monthOptions.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </Select>
            <Select
              value={String(selectedYear)}
              onChange={(event) => setSelectedYear(Number(event.target.value))}
            >
              {yearOptions.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </Select>
          </div>
        )}
      >
        {error && (
          <p className="text-sm text-rose-600">{error}</p>
        )}
        {loading ? (
          <p className="text-sm text-slate-500">Carregando…</p>
        ) : (
          <div className="grid gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {receiptsByStatus.map((item) => (
                <Stat
                  key={item.status}
                  label={`Comprovantes ${item.status}`}
                  value={numberFormatter.format(item.count || 0)}
                />
              ))}
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h3 className="font-semibold text-slate-700 mb-3">Entradas por marca</h3>
                {renderBarList(entriesByBrand, (item) => item.brand || item.brandId, maxBrand)}
              </div>
              <div>
                <h3 className="font-semibold text-slate-700 mb-3">Entradas por UF</h3>
                {renderBarList(entriesByUF, (item) => item.uf, maxUf)}
              </div>
            </div>
          </div>
        )}
      </Card>

      <Card title="Cobertura de parceiros">
        {loading && !dashboard ? (
          <p className="text-sm text-slate-500">Carregando…</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-3">
            <div className="md:col-span-1">
              <div className="grid gap-3">
                <Stat label="Total de parceiros" value={numberFormatter.format(coverage?.partnersTotal || 0)} />
                <Stat label="Parceiros com envio" value={numberFormatter.format(coverage?.partnersSent || 0)} />
                <Stat label="Pendentes" value={numberFormatter.format(coverage?.partnersPending || 0)} />
              </div>
            </div>
            <div className="md:col-span-2">
              <h3 className="font-semibold text-slate-700 mb-2">Parceiros pendentes</h3>
              {pendingPartners.length === 0 ? (
                <p className="text-sm text-slate-500">Todos os parceiros já enviaram comprovantes neste período.</p>
              ) : (
                <ul className="grid gap-2 text-sm text-slate-600">
                  {pendingPartners.map((partner) => (
                    <li key={partner.id} className="bg-white border rounded-xl px-4 py-2">{partner.name}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
