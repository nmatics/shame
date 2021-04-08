import './App.css';
import LandingPage from './Components/LandingPage';
import StockPage from './Components/StockPage';
import { Route } from 'react-router-dom';

// const mockStock = require('./output.json');


function App() {
  return (
    <div className="App">
      <Route exact path='/' component={ LandingPage } />
      <Route path='/:symbol' component={ StockPage } />
    </div>
  );
}

export default App;
