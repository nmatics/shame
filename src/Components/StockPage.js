import { useState, useEffect } from 'react';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import apiResponseStore from '../util/apiResponseStore';
import { convertApiResponses } from '../util/convertApiResponse';
import getYearsFromApiResponse from '../util/getYearsFromApiResponse';
import StockInformation from './StockInformation';
import StockCriteriaForm from './StockCriteriaForm';
import isEmptyObject from '../util/isEmptyObject';
import StockComparison from './StockComparison';
import getApplicableMonths from '../util/getApplicableMonths';
import prettifyMoney from '../util/prettifyMoney';
import createInvestment from '../util/createInvestment';
import getPercentageChange from '../util/getPercentageChange';
import SearchBar from './SearchBar';
import '../Styles/StockPage.css'


const apiKey = '1FK7ETAUURAS9ZJO';

const overviewURL = 'https://www.alphavantage.co/query?function=OVERVIEW';
const monthlyURL = 'https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}


function StockPage(){
  const {symbol} = useParams();
  const [stock, setStock] = useState(null);
  const query = useQuery();
  const history = useHistory();

  const navigateToStockPage = (symbol) => {
    history.push(`/${symbol}`);
  };

  const criteria = {
    year: query.get('year'),
    month: query.get('month'),
    investmentCapital: query.get('investmentCapital'),
    dividendPercent: query.get('dividendPercent'),
  };

  const hasCriteria = !isEmptyObject(criteria);

  useEffect(() => {
    if (apiResponseStore.has(symbol)) {
      return setStock(apiResponseStore.get(symbol));
    }

    Promise
      .all([
        fetch(`${overviewURL}&apikey=${apiKey}&symbol=${symbol}`)
          .then(res => res.json()),

        fetch(`${monthlyURL}&apikey=${apiKey}&symbol=${symbol}`)
          .then(res => res.json()),
      ])
      .then(([overview, monthly]) => {
        const result = convertApiResponses(overview, monthly);
        
        apiResponseStore.set(symbol, result);
        
        setStock(result);
      });

  },[symbol])

    let applicableMonths = [];
    let todaysData;
    let oldestMonth;
    var investment;
    const initialInvestment = parseInt(criteria.investmentCapital);

    if (hasCriteria && stock) {
      applicableMonths = getApplicableMonths(parseInt(criteria.year), criteria.month, stock.historicalByMonth);
      todaysData = applicableMonths[0];
      oldestMonth = applicableMonths[applicableMonths.length - 1];
      investment = createInvestment({
        stock: {
          symbol,
          price: oldestMonth.low,
        },
        reinvestmentPercentage: parseInt(criteria.dividendPercent),
        startingCapital: parseInt(criteria.investmentCapital),
      });
    }

    const months = [...applicableMonths].reverse();
    months.forEach((month) => investment.updateByMonth(month));

    const clearCriteria = () => {
        history.push(`/${symbol}`);
    }

    return(
        <div className="stockPage">
          <div className="inputContainer">
            <SearchBar onSelect={navigateToStockPage} />
            <div className="userInputs">
            {stock &&
              <StockCriteriaForm
                onSubmit={({ year, month, investmentCapital, dividendPercent }) =>
                  history.push(`/${symbol}?year=${year}&month=${month}&investmentCapital=${investmentCapital}&dividendPercent=${dividendPercent}`)}
                years={getYearsFromApiResponse(stock.historicalByMonth)}
              />
            }
            </div>
            {hasCriteria && stock && <button className="clearButton" onClick={() => clearCriteria()}>Clear Inputs</button>}
          </div>
           
            {!stock &&
              <h1>Loading...</h1>
            }
            
            {!hasCriteria && stock &&
              <StockInformation stock={stock}/>
            }
            {hasCriteria && stock &&
              <>
                {/* <button onClick={() => clearCriteria()}>Clear</button> */}
                <StockComparison
                  symbol={symbol}
                  name={stock.name}

                  historicalPrice={prettifyMoney(oldestMonth.low)}
                  historicalLow={prettifyMoney(oldestMonth.low)}
                  historicalHigh={prettifyMoney(oldestMonth.high)}

                  currentPrice={prettifyMoney(todaysData.low)}
                  currentLow={prettifyMoney(todaysData.low)}
                  currentHigh={prettifyMoney(todaysData.high)}

                  couldHaveMadeBank={todaysData.high > oldestMonth.low}
                  portfolioValue={investment.pretty().netWorth}
                  percentChange={getPercentageChange(initialInvestment, (investment.cash + investment.portfolioValue)).toFixed(2)}
                  cashOnHand={investment.pretty().cash}
                  portfolioProfit={prettifyMoney(investment.portfolioValue - initialInvestment)}
                  totalProfit={prettifyMoney(investment.portfolioValue+investment.cash - initialInvestment)}
                />
              </>
            }
        </div>

    )



}

export default StockPage;