import { apiFetch } from './api.js';

export function getReports(query = {}){
  const params = new URLSearchParams();
  if(query.start) params.set('start', query.start);
  if(query.end) params.set('end', query.end);
  if(query.brand) params.set('brand', query.brand);
  const qs = params.toString();
  return apiFetch(`/reports${qs ? `?${qs}` : ''}`);
}

export function createReportPeriod({ y, m }){
  return apiFetch('/reports/periods', {
    method: 'POST',
    body: { y, m },
  });
}
