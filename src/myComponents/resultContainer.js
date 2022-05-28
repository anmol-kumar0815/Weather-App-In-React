import React, {useState, useEffect} from "react";
import axios from 'axios';
import './style/resultContainer.css';


function toCelsius(kelvin) {
  return parseInt(kelvin - 273.15);
}


function ResultContainer(props){

    const[error, setError] = useState(null);
    const[isLoaded, setLoaded] = useState(false);
    const[cityData, setCityData] = useState(null);

    useEffect(()=>{
        let city  = props.city.trim();
        if(city !== ''){
            console.log("City is not an empty string going to call api");
            apiCall(props.city);
        }
    },[props.city]);

    function apiCall(city){
        axios.get("https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=a1d7b9ef6a211e7dbc71a77562c5bbab").then((data)=>{
            setError(null);
            setLoaded(true);
            setCityData(data.data);
        }).catch((error)=>{
            setError(error);
            setLoaded(true);
        });
    }

    if(error !== null){
        if(error.response.data.cod === "404"){
            return <div className="result-container">Error = City Not Found, Please Enter a valid City Name.</div>
        }else{
            return <div className="result-container">Error = {error.message}</div>
        }
    }else if(isLoaded === false){
        return <div className="result-container">Loading....</div>
    }else{
        return(
            <div className="result-container">
                <p className="city-description">Temperature = {toCelsius(cityData.main.temp)} °C</p>
                <p className="city-description">Weather Description = {cityData.weather[0].main}</p>
                <p className="city-description">Humidity = {cityData.main.humidity}</p>
                <p className="city-description">Visibility = {cityData.visibility} Meters</p>
                <p className="city-description">Wind Speed = {cityData.wind.speed} Km/Hour</p>
            </div>
        );
    }
}

export default ResultContainer;