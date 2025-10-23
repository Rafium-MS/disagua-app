import { apiFetch } from './api.js';

export function listConnections(query = {}){
  const params = new URLSearchParams();
  if(query.estado) params.set('estado', query.estado);
  if(query.cidade) params.set('cidade', query.cidade);
  const qs = params.toString();
  return apiFetch(`/partner-stores${qs ? `?${qs}` : ''}`);
}

export function connectPartnerStore(partnerId, storeId){
  return apiFetch(`/partner-stores/${partnerId}/${storeId}`, {
    method: 'POST',
  });
}

export function disconnectPartnerStore(id){
  return apiFetch(`/partner-stores/${id}`, {
    method: 'DELETE',
  });
}
