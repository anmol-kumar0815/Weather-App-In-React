import React, {useState } from "react";
import './style/container.css';
import SearchBarContainer from './searchBarContainer';
import ResultContainer from './resultContainer';

export default function Container(){
    const[city, updateCity] = useState("");

    console.log(city);
    
    function handleChange(cityName){
        updateCity(cityName);
    }

    return(
        <div className="container">
            <div className="inner-container">
                
                <SearchBarContainer updateCity={handleChange} /> 

                <ResultContainer city={city} />
            </div>
        </div>
    );
}

// export default Container;