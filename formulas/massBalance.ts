export interface MassBalanceInput {
  mineral: number;
  fePercent: number;
  efficiency: number;
  flux: number;
}

export function massBalance({
  mineral,
  fePercent,
  efficiency,
  flux,
}: MassBalanceInput) {
  const feFraction = fePercent / 100;

  const iron = mineral * feFraction * efficiency;
  const slag = flux + mineral * (1 - feFraction);
  const realEfficiency = iron / (mineral * feFraction);

  return { iron, slag, realEfficiency };
}
