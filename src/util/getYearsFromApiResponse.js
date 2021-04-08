export default function getYearsFromApiResponse(historicalByMonth) {
  const allYears = historicalByMonth.map(month => month.dateYear);

  const yearSet = new Set(allYears);
  
  return [...yearSet].slice(0, -1);
}
