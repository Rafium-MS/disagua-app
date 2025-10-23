import { apiFetch } from './api.js';

export function listBrands(){
  return apiFetch('/brands');
}

export function createBrand(data){
  return apiFetch('/brands', {
    method: 'POST',
    body: data,
  });
}
