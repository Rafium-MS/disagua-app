export const formatDate = (iso) => new Date(iso).toLocaleDateString('pt-BR');
export const formatPercent = (n) => `${Number(n).toFixed(2)}%`;

