export const CenaBezDPH = (price: number) => {
    const sazba = 1.21;
    const result = price / sazba;
    const fixed = result.toFixed(2);
    return fixed;
  };