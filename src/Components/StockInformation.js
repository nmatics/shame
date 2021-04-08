import prettifyMoney from '../util/prettifyMoney.js'
function StockInformation({stock}){
    return(
        <div className="stockInformation">
            <h1 className='stockSymbol'>{stock.symbol}</h1>
            <h2 className='stockName'>{stock.name}</h2>
            <h4 className='stockSector'>Sector: &nbsp;{stock.sector}</h4>
            <p className='stockDescription'>Company Information: &nbsp;<br/>{stock.description}</p>
            <h4 className='stockYear'>52 Week High/Low: &nbsp; 
                {prettifyMoney(stock.yearLow)} - 
                {prettifyMoney(stock.yearHigh)}</h4>
            <h4 className='stockDaily'>Daily High/Low: &nbsp;
                {prettifyMoney(stock.historicalByMonth[0].low)} - 
                {prettifyMoney(stock.historicalByMonth[0].high)}</h4>
            <h4 className='stockMarketCap'>Market Cap: &nbsp;
                {prettifyMoney(stock.marketCap)}</h4>
            <h4 className='stockExchange'>Exchange: &nbsp;{stock.exchange}</h4>
        </div>
    )
}

export default StockInformation;