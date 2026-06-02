export function fmt(v) {
  return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export function fmtShort(v) {
  if (v >= 1000) return `R$ ${(v / 1000).toFixed(0)}k`;
  return fmt(v);
}
