export const solidificationTime = (V: number, A: number, C: number, n = 2) =>
  C * Math.pow(V / A, n);
