import '../Styles/StockComparison.css'
const comparisonStyles = {
  display: "flex",
  flexDirection: "column",
};

const bodyStyles = {
  display: "flex",
  flexDirection: "row",
  wrap: "nowrap",
  justifyContent: "space-around",
};

const gifStyle = {
  height: "150px",
  // width: "100px",
  marginTop: "3%"
};

const StockComparison = ({
  name,
  symbol,

  historicalPrice,
  historicalLow,
  historicalHigh,

  currentPrice,
  currentLow,
  currentHigh,

  couldHaveMadeBank,
  percentChange,
  portfolioValue,
  cashOnHand,
  totalProfit,
  portfolioProfit
}) => {
  const shameStyle = {
    backgroundColor: couldHaveMadeBank ? "tomato" : "green",
    width: "100%",
  };

  return (
    <div style={comparisonStyles} className="comparisonContainer">
      <section
        style={{
          textAlign: "center",
          marginBottom: "25px",
        }}
        className="comparison-title"
      >
        <strong>{symbol}</strong>
        <br />
        {name}
      </section>

      <section className="comparison-body" style={bodyStyles}>
        <article className="comparison-historical">
          <h3>Historical</h3>
          <p>Price: {historicalPrice}</p>
          <p>Day Low: {historicalLow}</p>
          <p>Day High: {historicalHigh}</p>
        </article>
        <article className="comparison-gif">
          {couldHaveMadeBank && (
            <img style={gifStyle} src="/shame.gif" alt="Salty Gif" />
          )}
          {!couldHaveMadeBank && (
            <img style={gifStyle} src="/stonks.gif" alt="Salty Gif" />
          )}
        </article>
        <article className="comparison-current">
          <h3>Current</h3>
          <p>Price: {currentPrice}</p>
          <p>Day Low: {currentLow}</p>
          <p>Day High: {currentHigh}</p>
        </article>
      </section>

      <section style={shameStyle} className="shame">
        {couldHaveMadeBank && (
          <>
            <p>You missed out! SHAME SHAME SHAME</p>
            <p>
              Portfolio Value: {portfolioValue}<br/> <br/>
              Percentage Increase: {percentChange}%<br/><br/>
              Cash from Dividends: {cashOnHand}<br/><br/>
              Portfolio Profit: {portfolioProfit} <br/><br/>
              Total Profit: {totalProfit}
            </p>
          </>
        )}
        {!couldHaveMadeBank && (
          <>
            <p>You did well in not jumping on this sinking ship.</p>
            <p>
              Portfolio Value: {portfolioValue} <br/><br/>
              Percentage Decrease: {percentChange}%<br/><br/>
              Cash from Dividends: {cashOnHand}<br/><br/>
              Portfolio Loss: {portfolioProfit} <br/><br/>
              Total Loss: {totalProfit}
            </p>
          </>
        )}
      </section>
    </div>
  );
};

export default StockComparison;
