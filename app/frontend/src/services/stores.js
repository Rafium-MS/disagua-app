import { apiFetch } from './api.js';

export function listStores(query = {}){
  const params = new URLSearchParams();
  if(query.uf) params.set('uf', query.uf);
  if(query.municipio) params.set('municipio', query.municipio);
  if(query.brandId) params.set('brand', query.brandId);
  const qs = params.toString();
  return apiFetch(`/stores${qs ? `?${qs}` : ''}`);
}

export function createStore(data){
  return apiFetch('/stores', {
    method: 'POST',
    body: data,
  });
}
