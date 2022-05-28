import React from "react";
import axios from 'axios';
import './style/resultContainer.css';


function toCelsius(kelvin) {
  return parseInt(kelvin - 273.15);
}


export default class ResultContainer extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            error : null,
            isLoaded: false,
            cityData: null
        }
    }

    // console.log("top of the page, city = " + props.city + " error = " + error + " isLoaded = " + isLoaded);
    apiCall(city){
        axios.get("https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=a1d7b9ef6a211e7dbc71a77562c5bbab").then((data)=>{
            this.setState({error: null, isLoaded: true, cityData: data.data});
        }).catch((error)=>{
            // console.log(error.response.data.cod);
            this.setState({error: error, isLoaded: true, cityData: null});
        });
    }

    componentDidMount(){
        this.apiCall(this.props.city);
    }

    componentDidUpdate(prevProps){
        if(prevProps.city !== this.props.city){
            this.apiCall(this.props.city);
        }
    }

    render(){
        if(this.state.error !== null){
            if(this.state.error.response.data.cod === "404"){
                return <div className="result-container">Error = City Not Found, Please Enter a valid City Name.</div>
            }else{
                return <div className="result-container">Error = {this.state.error.message}</div>
            }
        }else if(this.state.isLoaded === false){
            return <div className="result-container">Loading....</div>
        }else{
            return(
                <div className="result-container">
                    <p className="city-description">Temperature = {toCelsius(this.state.cityData.main.temp)} °C</p>
                    <p className="city-description">Weather Description = {this.state.cityData.weather[0].main}</p>
                    <p className="city-description">Humidity = {this.state.cityData.main.humidity}</p>
                    <p className="city-description">Visibility = {this.state.cityData.visibility} Meters</p>
                    <p className="city-description">Wind Speed = {this.state.cityData.wind.speed} Km/Hour</p>
                </div>
            );
        }
    }
    
}