const monthMappingsFromDateIndex = {
  0: 'Jan',
  1: 'Feb',
  2: 'Mar',
  3: 'Apr',
  4: 'May',
  5: 'Jun',
  6: 'Jul',
  7: 'Aug',
  8: 'Sep',
  9: 'Oct',
  10: 'Nov',
  11: 'Dec',
};

/**
 * Convert a string representation of a dollar amount into an integer that
 * represents the number of cents.
 *
 * @param {string} string
 * @param {number}
 */
 function convertStringToMoneys(string) {
  const float = parseFloat(string).toFixed(2);
 
  return Math.floor(float * 100);
}

/**
 * Convert a monthly api response into an array of objects that we would
 * like to use.
 *
 * @param {object} monthly
 * @return {object[]}
 */
function convertMonthly(monthly) {
  const entries = Object.entries(monthly['Monthly Adjusted Time Series']);

  const converted = entries.map(([date, monthData]) => {
    const dateObject = new Date(date);

    return {
      // Date values
      stringDate: date,
      dateYear: dateObject.getFullYear(),
      dateMonth: monthMappingsFromDateIndex[dateObject.getMonth()],

      // Moneys values
      low: convertStringToMoneys(monthData['3. low']),
      high: convertStringToMoneys(monthData['2. high']),
      dividend: convertStringToMoneys(monthData['7. dividend amount']),
    };
  });

  return converted;
}

/**
 * Convert two api responses from the stock api into an object that is used
 * by our application.
 *
 * @param {object} overviewResponse
 * @param {object} monthlyResponse
 * @return {object}
 */
export function convertApiResponses(overviewResponse, monthlyResponse) {
  return {
    symbol: overviewResponse.Symbol,
    name: overviewResponse.Name,
    description: overviewResponse.Description,
    exchange: overviewResponse.Exchange,
    sector: overviewResponse.Sector,
    yearLow: convertStringToMoneys(overviewResponse['52WeekLow']),
    yearHigh: convertStringToMoneys(overviewResponse['52WeekHigh']),
    marketCap: convertStringToMoneys(overviewResponse.MarketCapitalization),
    historicalByMonth: convertMonthly(monthlyResponse),
  };
}


