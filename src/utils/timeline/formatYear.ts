export const formatYear = (year: number, approximate?: boolean) => {
  const formatted = year >= 0 ? `${year} AD` : `${Math.abs(year)} BC`;
  return approximate ? `~${formatted}` : formatted;
};
