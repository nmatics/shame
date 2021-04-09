import prettifyMoney from '../util/prettifyMoney.js'
function StockInformation({stock}){
    return(
        <div className="stockInformation">
            <h1 className='stockSymbol'>{stock.symbol}</h1>
            <h2 className='stockName'>{stock.name}</h2>
            <h3 className='stockSector'>Sector: &nbsp;{stock.sector}</h3>
            <h4 className='companyInfo'>Company Information: &nbsp;</h4>
            <p className="stockDescription">{stock.description}</p>
            <div className="stockValueInformation">
                <p className='stockYear'>52 Week Low/High: &nbsp; 
                    {prettifyMoney(stock.yearLow)} - 
                    {prettifyMoney(stock.yearHigh)}</p>
                <p className='stockDaily'>Daily Low/High: &nbsp;
                    {prettifyMoney(stock.historicalByMonth[0].low)} - 
                    {prettifyMoney(stock.historicalByMonth[0].high)}</p>
                <p className='stockMarketCap'>Market Cap: &nbsp;
                    {prettifyMoney(stock.marketCap)}</p>
                <p className='stockExchange'>Exchange: &nbsp;{stock.exchange}</p>
            </div>
        </div>
    )
}

export default StockInformation;