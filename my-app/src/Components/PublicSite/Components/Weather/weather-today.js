import './weather.css';
import React, { useEffect, useState } from "react";

export default function WeatherToday(props){

    const apiKey = "ee1e6573b3d3e0108488f138734a3057";
    const lat = props.lat;
    const lon = props.lon;

    const apiCallString = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=metric";

    const [weatherData, setWeatherData] = useState([])
    const [isError, setIsError] = useState(false);

    useEffect(() => {

      const fetchData = async () => {

          try {

            let response = await fetch(apiCallString);
            let data = await response.json();
            setWeatherData(data);

          } catch (e) {

            setIsError(true)

          }

        }

        fetchData();

      }, [apiKey,lat,lon,apiCallString]);

      function convertTimestampToTime(timestamp) {

        const date = new Date(timestamp  * 1000);
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        const minutesStr = minutes < 10 ? '0' + minutes : minutes;
        const strTime = hours + ':' + minutesStr + ' ' + ampm;
        return strTime;

    }

    return(

      <section id="Weather">

        { isError ||  weatherData.length === 0 ? <h3 style={ {"textAlign":"center"} }> { "Error calling weather data" }</h3> :
        

                <div> 

                    <h3 style={ {"textAlign":"center"} }> Current Weather at Venue</h3>

                    <div className="weather">

                        <div> <img src={'https://openweathermap.org/img/wn/' + weatherData.weather[0].icon + '@2x.png' } alt={weatherData.weather[0].icon}/> </div>
                        <div> { weatherData.weather[0].main } </div>
                        <div> { weatherData.main.temp.toFixed(0) } &deg;C</div>
                        <div> Wind:  { (weatherData.wind.speed * 2.23693629).toFixed(1) } mph</div>
                        <div> Sunrise:  { convertTimestampToTime(weatherData.sys.sunrise) }</div>
                        <div> Sunset:  { convertTimestampToTime(weatherData.sys.sunset) }</div>
                      
                   </div>

                </div>
        
        }

 

      </section>

    )


  }