export function calcPMT(principal, taxaMensal, meses) {
  if (taxaMensal === 0) return principal / meses;
  return (
    (principal * taxaMensal * Math.pow(1 + taxaMensal, meses)) /
    (Math.pow(1 + taxaMensal, meses) - 1)
  );
}
