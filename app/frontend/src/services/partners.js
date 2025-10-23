import { apiFetch } from './api.js';

export function listPartners(query = {}){
  const params = new URLSearchParams();
  if(query.estado) params.set('estado', query.estado);
  if(query.cidade) params.set('cidade', query.cidade);
  const qs = params.toString();
  return apiFetch(`/partners${qs ? `?${qs}` : ''}`);
}

export function createPartner(data){
  return apiFetch('/partners', {
    method: 'POST',
    body: data,
  });
}
