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
};

const StockComparison = ({
  name,
  symbol,

  historicalPrice = "$123.24",
  historicalLow = "$104.25",
  historicalHigh = "$129.25",

  couldHaveMadeBank = false,
  percentChange = "21.3",
  portfolioValue = "$3,251,574",
}) => {
  const shameStyle = {
    backgroundColor: couldHaveMadeBank ? "red" : "green",
    width: "100%",
    height: "100px",
  };

  return (
    <div style={comparisonStyles}>
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
          <p>Price: {historicalPrice}</p>
          <p>Day Low: {historicalLow}</p>
          <p>Day High: {historicalHigh}</p>
        </article>
      </section>

      <section style={shameStyle} className="shame">
        {couldHaveMadeBank && (
          <>
            <p>You missed out! SHAME SHAME SHAME</p>
            <p>
              Portfolio Value: {portfolioValue}. Percentage increase:{" "}
              {percentChange}%{" "}
            </p>
          </>
        )}
        {!couldHaveMadeBank && (
          <>
            <p>You did well in not jumping on this sinking ship.</p>
            <p>
              Portfolio Value: -{portfolioValue}. Percentage decrease: -
              {percentChange}%
            </p>
          </>
        )}
      </section>
    </div>
  );
};

export default StockComparison;
