import { apiFetch } from './api.js';

export function presignUpload(data){
  return apiFetch('/uploads/presign', {
    method: 'POST',
    body: data,
  });
}

export async function uploadToPresignedUrl({ url, file, contentType }){
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': contentType,
    },
    body: file,
  });

  if(!response.ok){
    throw new Error('Falha ao enviar arquivo para armazenamento.');
  }
}
