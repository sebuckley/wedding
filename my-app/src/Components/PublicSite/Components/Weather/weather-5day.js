import React, { useEffect, useState } from "react";

export default function Weather(props){

    const apiKey = "ee1e6573b3d3e0108488f138734a3057";
    const lat = props.lat;
    const lon = props.lon;

    const apiCallString = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;

    const [weatherData, setWeatherData] = useState([])
    const [isError, setIsError] = useState(false);

    useEffect(() => {
      
      const fetchData = async () => {

        
          try {

            let response = await fetch(apiCallString);
            let data = await response.json();
            setWeatherData(data);

          } catch (error) {

            setIsError(true)

          }

        }

        fetchData();

      }, [apiKey,lat,lon,apiCallString])

      function renderWeather() {

          const weatherDataList = [];
          const list = weatherData.list;

          
          
          for(let i = 0; i < list.length; i++){
            
            weatherDataList.push(<li>{list[i].dt_txt}</li>);

          }
        
          return weatherDataList;

      }

    return(

      <div>

        { isError ? <h3 style={ {"textAlign":"center"} }> { "Error calling weather data" }</h3> :
        
                <ul> 

                    { renderWeather() }

                </ul>
        
        }

      </div>

    )


  }