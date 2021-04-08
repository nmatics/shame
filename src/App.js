import './App.css';
import StockInformation from './Components/StockInformation';
import SearchBar from './Components/SearchBar'
const mockStock = require('./output.json');

function App() {
  return (
    <div className="App">
      <h1>Hello world!</h1>
      <SearchBar/>
      <StockInformation stock={mockStock}/>
    </div>
  );
}

export default App;
