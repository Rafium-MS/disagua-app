import { apiFetch } from './api.js';

export function login({ orgId, email, password }){
  return apiFetch('/auth/login', {
    method: 'POST',
    body: { orgId, email, password },
    auth: false,
  });
}
