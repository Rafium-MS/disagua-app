import { apiFetch } from './api.js';

export function listReceipts(query = {}){
  const params = new URLSearchParams();
  if(query.status) params.set('status', query.status);
  if(query.periodId) params.set('period', query.periodId);
  if(query.brandId) params.set('brand', query.brandId);
  if(query.storeId) params.set('store', query.storeId);
  if(query.partnerId) params.set('partner', query.partnerId);
  const qs = params.toString();
  return apiFetch(`/receipts${qs ? `?${qs}` : ''}`);
}

export function createReceipt(data){
  return apiFetch('/receipts', {
    method: 'POST',
    body: data,
  });
}

export function updateReceipt(id, data){
  return apiFetch(`/receipts/${id}`, {
    method: 'PATCH',
    body: data,
  });
}
