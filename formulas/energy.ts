export function fusionEnergy(
  m: number,
  Cp: number,
  Ti: number,
  Tf: number,
  Lf: number,
) {
  const Q1 = m * Cp * (Tf - Ti);
  const Q2 = m * Lf;
  const Q = Q1 + Q2;

  return {
    kJ: Q,
    kWh: Q / 3600,
  };
}
