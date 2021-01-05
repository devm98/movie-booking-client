export const formatCash = (str) => {
  if (!(str instanceof String)) str = String(str);
  return str
    .split('')
    .reverse()
    .reduce((prev, next, index) => {
      return (index % 3 ? next : next + ',') + prev;
    });
};
