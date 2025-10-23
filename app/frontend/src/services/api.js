const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3333').replace(/\/$/, '');

let accessToken = null;
let refreshToken = null;

export function setAuthTokens(tokens){
  accessToken = tokens?.access || null;
  refreshToken = tokens?.refresh || null;
}

export function clearAuthTokens(){
  accessToken = null;
  refreshToken = null;
}

export function getAccessToken(){
  return accessToken;
}

export async function apiFetch(path, { method = 'GET', body, headers, auth = true } = {}){
  const finalHeaders = new Headers(headers || {});
  if(auth && accessToken){
    finalHeaders.set('Authorization', `Bearer ${accessToken}`);
  }

  let payload = body;
  if(body && !(body instanceof FormData)){
    finalHeaders.set('Content-Type', 'application/json');
    payload = JSON.stringify(body);
  }

  const response = await fetch(`${API_URL}${path}`, {
    method,
    headers: finalHeaders,
    body: payload,
  });

  const text = await response.text();
  let data = null;
  if(text){
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }
  }

  if(!response.ok){
    const message = data?.message || response.statusText || 'Erro na requisição';
    throw new Error(Array.isArray(message) ? message.join(', ') : message);
  }

  return data;
}
