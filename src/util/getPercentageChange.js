export default function getPercentageChange(start, end) {
  return ((end - start) / start) * 100;
}
