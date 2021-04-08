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

    const sectors = sp500.reduce((sectors, company) =>{
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
