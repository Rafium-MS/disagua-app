export function required(value) {
  return value != null && String(value).trim() !== '';
}

export function isCnpj(value) {
  return /\d{14}/.test((value || '').replace(/\D/g, ''));
}

