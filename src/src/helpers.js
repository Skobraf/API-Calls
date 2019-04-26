export function formatDate(date) {
  const oneDay = 1000 * 60 * 60 * 24;
  const date1 = new Date(date);
  const date2 = Date.now();
  const times = date2 - date1;
  return Math.round(times / oneDay);
}
