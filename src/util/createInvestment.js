import prettifyMoney from './prettifyMoney';

function prettifyFractionalShares(fractionalShares) {
  return (fractionalShares / 100).toString();
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

export default function createInvestment({ stock, startingCapital, reinvestmentPercentage }) {
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
    
    console.log(investment)
  };

  return investment;
}
