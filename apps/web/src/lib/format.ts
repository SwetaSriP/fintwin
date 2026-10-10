export const formatINR = (amount: number, compact = false) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0, notation: compact ? 'compact' : 'standard' }).format(amount);

export const formatINRCompact = (amount: number) => {
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(amount % 10000000 === 0 ? 0 : 1)}Cr`;
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(amount % 100000 === 0 ? 0 : 1)}L`;
  if (amount >= 1000) return `₹${Math.round(amount / 1000)}k`;
  return formatINR(amount);
};
