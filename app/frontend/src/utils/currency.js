export function currencyBRL(n){ const val = Number(n||0); return new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(val) }
