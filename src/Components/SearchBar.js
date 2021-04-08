import { useState } from 'react';
import Autosuggest from 'react-autosuggest';
import '../Styles/SearchBar.styles.css';
const sp500 = require('../sp500.json');


function SearchBar( {onSelect = console.log }){


    const [value, setValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    // state = {
    //     value: '',
    //     suggestions: []
    // }

    const inputProps = {
        value: value, 
        onChange: (event) => {
            setValue(event.target.value)
        }, 
        type: "search",
        placeholder: "Type a symbol or company name"
    }

    const sectors = sp500.reduceRight((sectors, company) =>{
        const existingSector = sectors.find(x => x.title === company.Sector);
        if (existingSector){
            existingSector.stocks.push(company);
            return sectors;
        }
        else{
            sectors.push({
                title: company.Sector,
                stocks: [company]
            });
            return sectors;
        }
    }, [])

    //Followed the documentation, these are the props for <AutoSuggest/>
    function onSuggestionsFetchRequested(options) {
        setSuggestions(getSuggestions(options.value))
    };

    function onSuggestionsClearRequested ()  {
        setSuggestions([]);
    };

    function getSuggestions (value) {
        if (!value) return [];
        //write function to return the filered values
        else {
            const lowerCasedSearchInput = value.toLowerCase();
            return sectors.map(sector => {return (
                    {
                    title: sector.title,
                    stocks: sector.stocks.filter((stock) => {
                        const lowerCasedSymbol = stock.Symbol.toLowerCase();
                        const lowerCasedName = stock.Name.toLowerCase();
                        const lowerCasedSector = stock.Sector.toLowerCase();
                        return (
                            lowerCasedSymbol.includes(lowerCasedSearchInput) ||
                            lowerCasedName.includes(lowerCasedSearchInput) ||
                            lowerCasedSector.includes(lowerCasedSearchInput)
                        );
                        })
                    }
                )}
            ).filter(sectors => sectors.stocks.length > 0)
        }
    }
    function renderSectionTitle(sector) {
        return (
            <strong>{sector.title}</strong>
        );
    }
    
    function getSectionSuggestions(sector) {
        return sector.stocks;
    }

    function getSuggestionValue (suggestion) {
        return suggestion.Symbol;
    };

    function renderSuggestion ({Name, Symbol}) {
        return (
            <span>{Name} - <strong>{Symbol}</strong></span>
        )
    };

    function onSuggestionSelected(event, { suggestion }){
        onSelect(suggestion.Symbol);
        setSuggestions([]);
        setValue('');
        }
    //end start of documentation

    return(
        <div className="searchBar">
            <p>This is the SearchBar</p>
            <Autosuggest 
                onSuggestionSelected={onSuggestionSelected}
                suggestions={suggestions}
                inputProps={inputProps}
                renderSuggestion={renderSuggestion}
                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                onSuggestionsClearRequested={onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                multiSection ={true}
                renderSectionTitle ={renderSectionTitle}
                getSectionSuggestions={getSectionSuggestions}
            />
        </div>
    )
}
export default SearchBar;



    
//DUSTIN'S CODE TO USE AS GUIDE
// import { useState } from 'react';
// import Autosuggest from 'react-autosuggest';
// import sp500 from './sp500.json';

// const sectors = sp500.reduce((result, nextStonk) => {
//   const sector = result.find(x => x.title === nextStonk.Sector);

//   if (!sector) {
//     result.push({
//       title: nextStonk.Sector,
//       stocks: [
//         nextStonk,
//       ],
//     });
//   } else {
//     sector.stocks.push(nextStonk);
//   }
//   return result;
// }, []);

// const getSuggestionValue = suggestion =>
//   suggestion.symbol;

// const getSuggestions = (value) => {
//   if (!value) return [];

//   const lowerCasedSearchInput = value.toLowerCase();

//   return sectors
//     .map(sector => ({
//       title: sector.title,
//       stocks: sector.stocks.filter((stock) => {
//         const lowerCasedSymbol = stock.Symbol.toLowerCase();
//         const lowerCasedName = stock.Name.toLowerCase();
//         const lowerCasedSector = stock.Sector.toLowerCase();

//     return lowerCasedSymbol.includes(lowerCasedSearchInput) ||
//       lowerCasedName.includes(lowerCasedSearchInput) ||
//       lowerCasedSector.includes(lowerCasedSearchInput);
//   }),
// }))
// .filter(sectors => sectors.stocks.length > 0);
// };

// const renderSuggestion = ({ Name, Symbol }) => (
//   <span>{Name} - <strong>{Symbol}</strong></span>
// );

// function renderSectionTitle(sector) {
//   return (
//     <strong>{sector.title}</strong>
//   );
// }
// function getSectionSuggestions(sector) {
//   return sector.stocks;
// }

// function SearchBar({ onSelect = console.log }) {
//   const [value, setValue] = useState('');
//   const [suggestions, setSuggestions] = useState([]);

//   const inputProps = {
//       placeholder: 'Type a symbol or company name',
//       value: value,
//       onChange: (event) => {
//         setValue(event.target.value);
//       },
//     };

//   return (
//     <div className="SearchBar">
//       <Autosuggest
//         onSuggestionSelected={(event, { suggestion }) => {
//           onSelect(suggestion.Symbol);
//           setSuggestions([]);
//           setValue('');
//         }}
        // multiSection={true}
        // renderSectionTitle={renderSectionTitle}
        // getSectionSuggestions={getSectionSuggestions}
//         suggestions={suggestions}
//         inputProps={inputProps}
//         renderSuggestion={renderSuggestion}
//         onSuggestionsFetchRequested={(options) =>
//           setSuggestions(getSuggestions(options.value))}
//         onSuggestionsClearRequested={() => setSuggestions([])}
//         getSuggestionValue={getSuggestionValue}
//       />
//     </div>
//   );
// }

// export default SearchBar;



//ATTEMPT TO FETCH THE SP500 FROM API (REQUEST DENIED)
// const [stockData, setStockData] = useState(null);
//     useEffect(() => {
//         fetch('https://pkgstore.datahub.io/core/s-and-p-500-companies/constituents_json/data/87cab5b5abab6c61eafa6dfdfa068a42/constituents_json.json')
//         //   .then((res) => res.json())
//           .then((res) => setStockData(res))
//           console.log(stockData)
//       }, []);





