import SearchBar from './SearchBar'
import { useHistory } from 'react-router-dom';
import '../Styles/LandingPage.css'
import '../Styles/SearchBar.styles.css'

function LandingPage (){
    let history = useHistory();
    const navigateToStockPage = (symbol) => {
        history.push(`/${symbol}`);
    };
    return (
        <div className="landingPage">
            <div className="header">
                <h1>Stock Shame Calculator</h1>
            </div>
            <SearchBar onSelect={navigateToStockPage}/>
        </div>

    )
}

export default LandingPage;