// As an investor

// I want to search for a stock by it's company name, symbol, or sector and
// have it show me stats on that stock

// So that I can have more information about the stock


// As an investor

// I want to know what I could have made or lost if I had put a certain amount
// of capital into the stock on a certain date and held it until now

// So that I can better judge investments in the future

const sp500 = require('./apiResponseExamples/sp500.json');


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

function prettifyMoney(money) {
  return (money / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
}

function prettifyFractionalShares(fractionalShares) {
  return (fractionalShares / 100).toString();
}

export function createInvestment({ stock, startingCapital, reinvestmentPercentage }) {
  const fractionalSharesString = (startingCapital / stock.price).toString();

  const investment = {};

  investment.symbol = stock.symbol;

  investment.cash = 0;

  investment.currentPrice = stock.price;

  investment.portfolioValue = startingCapital;

  investment.fractionalShares = convertStringToMoneys(fractionalSharesString);

  investment.pretty = () => ({
    fractionalShares: prettifyFractionalShares(investment.fractionalShares),
    portfolioValue: prettifyMoney(investment.portfolioValue),
    currentPrice: prettifyMoney(investment.currentPrice),
    cash: prettifyMoney(investment.cash),
    netWorth: prettifyMoney(investment.cash + investment.portfolioValue),
  });

  investment.updateByMonth = (month) => {
    const currentPrice = month.high;
    const cashOnHandPercentage = 100 - reinvestmentPercentage;

    investment.currentPrice = currentPrice;

    const potentialReinvestment = month.dividend * investment.fractionalShares;

    if (reinvestmentPercentage) {
      const newShares =
        (potentialReinvestment / currentPrice) * (reinvestmentPercentage / 100);

      investment.fractionalShares += Math.round(newShares);
    }

    if (cashOnHandPercentage) {
      investment.cash += (potentialReinvestment * (cashOnHandPercentage / 100)) / 100;
    }

    investment.portfolioValue =
      (investment.fractionalShares * currentPrice) / 100;
  };

  return investment;
}

export function findStockBySearchInput(searchInput) {
  const lowerCasedSearchInput = searchInput.toLowerCase();

  return sp500.filter((stock) => {
    const lowerCasedSymbol = stock.Symbol.toLowerCase();
    const lowerCasedName = stock.Name.toLowerCase();

    return lowerCasedSymbol.includes(lowerCasedSearchInput) ||
      lowerCasedName.includes(lowerCasedSearchInput);
  });
}

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

/**
 * Get the applicable months for an invesment given a starting date.
 *
 * @param {number} year
 * @param {string} month
 * @param {object[]}
 */
export function getApplicableMonths(year, month, historicalByMonth) {
  const oldest = historicalByMonth.find(({ dateMonth, dateYear }) => {
    return dateYear === year && dateMonth === month;
  });

  const indexOfOldest = historicalByMonth.indexOf(oldest);

  return historicalByMonth.slice(0, indexOfOldest + 1);
}
