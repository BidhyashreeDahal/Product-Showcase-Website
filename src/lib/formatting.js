export function formatPrice(value) {
  if (value === null || value === undefined || Number.isNaN(Number(value))) {
    return "Price on request";
  }
  return `$${Number(value).toFixed(2)}`;
}
