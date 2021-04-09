export default function getPercentageChange(start, end) {
  const percentageChange = ((end - start) / start) * 100;
  if(isNaN(percentageChange)){
    return 0;
  }
    return percentageChange;
}
