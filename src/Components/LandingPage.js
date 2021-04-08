import SearchBar from './SearchBar'
import { useHistory } from 'react-router-dom';

function LandingPage (){
    let history = useHistory();
    const navigateToStockPage = (symbol) => {
        history.push(`/${symbol}`);
    };
    return (
        <div className="landingPage">
            <h1>Stock Shame Calculator</h1>
            <SearchBar onSelect={navigateToStockPage}/>
        </div>

    )
}

export default LandingPage;