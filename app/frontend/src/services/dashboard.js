import { apiFetch } from './api.js';

export function getDashboard(query = {}){
  const params = new URLSearchParams();
  if(query.y) params.set('y', query.y);
  if(query.m) params.set('m', query.m);
  const qs = params.toString();
  return apiFetch(`/dashboard${qs ? `?${qs}` : ''}`);
}
