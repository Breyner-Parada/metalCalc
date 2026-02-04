export function rollingForce(
  h0: number,
  hf: number,
  K: number,
  n: number,
  area: number,
) {
  const strain = Math.log(h0 / hf);
  const stress = K * Math.pow(strain, n);
  const force = stress * area;

  return { strain, stress, force };
}
