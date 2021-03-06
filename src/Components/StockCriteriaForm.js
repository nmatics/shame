import { useState } from "react";

const StockCriteriaForm = ({ years, onSubmit }) => {
  const [state, setState] = useState({
    month: "Jan",
    year: years[years.length - 1],
    investmentCapital: 0,
    dividendPercent: "100",
  });

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit({
      ...state,
      investmentCapital:
        parseFloat(state.investmentCapital, 10).toFixed(2) * 100,
      dividendPercent: parseInt(state.dividendPercent, 10),
    });
  };

  const yearOptions = years.map((year) => (
    <option key={year} value={year}>{year}</option>
  ));

  return (
    <form className="inputForm">
      <label for="month">Month:&nbsp;
        <select name="month" value={state.month} onChange={handleChange}>
          <option value="Jan">Jan</option>
          <option value="Feb">Feb</option>
          <option value="Mar">Mar</option>
          <option value="Apr">Apr</option>
          <option value="May">May</option>
          <option value="Jun">Jun</option>
          <option value="Jul">Jul</option>
          <option value="Aug">Aug</option>
          <option value="Sep">Sep</option>
          <option value="Oct">Oct</option>
          <option value="Nov">Nov</option>
          <option value="Dec">Dec</option>
        </select>
      </label>
      <label for="year">Year:&nbsp;
        <select name="year" value={state.year} onChange={handleChange}>
          {yearOptions}
        </select>
      </label>
      <label for="investmentCapital">Investment Capital:&nbsp;
        <input
          type="number"
          value={state.investmentCapital}
          placeholder="Investment amount"
          name="investmentCapital"
          step="0.01"
          min="0.00"
          onChange={handleChange}
        ></input>
      </label>
        <label>Dividend Reinvestment:&nbsp;
          <input
            type="range"
            value={state.dividendPercent}
            min="0"
            max="100"
            className="slider"
            name="dividendPercent"
            id="myRange"
            onChange={handleChange}
          />
          <span>{state.dividendPercent}%</span>
        </label>
      <button type="submit" onClick={handleSubmit}>
      
        Submit{" "}
      </button>
    </form>
  );
};

export default StockCriteriaForm;
