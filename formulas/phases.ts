export const leverRule = (C0: number, Ca: number, Cb: number) => {
  const Wa = (Cb - C0) / (Cb - Ca);
  const Wb = (C0 - Ca) / (Cb - Ca);
  return { Wa, Wb };
};
