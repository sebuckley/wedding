import './countdown.css';
import React from 'react';
import { useState, useEffect } from "react";
import CountDownBox from './countdownbox';

export default function Countdown(props){

    const [dateObject, setDate] = useState({});
    const headerOn = props.headerOn;
    const weddingDate = props.date;

    const displayHeader = () => {

        return (

            <div className="countdownHeader">
                <h1>Countdown</h1>
            </div>

        );

    }

    const convertDate = (weddingDate) => {

        const today = new Date();
        const date = new Date(weddingDate);
        
        let timeleft = date - today;
        let daysDiff = Math.ceil((Math.abs(today - date)) / (1000 * 60 * 60 * 24));
        let years = Math.floor(daysDiff / 365.25);
        let remainingDays = Math.floor(daysDiff - (years * 365.25));
        let months = Math.floor((remainingDays / 365.25) * 12);
        let days = Math.ceil(daysDiff - (years * 365.25 + (months / 12 * 365.25)));

        let hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

        if(days === 1){

            days = 0;
            
        }

        if(minutes < 10){

            minutes = "0" + minutes;

        }

        if(seconds < 10){

            seconds = "0" + seconds;

        }

        let object = {

            daysAll: daysDiff,
            year: years,
            month: months,
            day:days,
            hour:hours,
            minute: minutes,
            second: seconds

        }

        return object;

    }

    useEffect(() => {

        const interval = setInterval(() => {

            const data = convertDate(weddingDate);
          setDate((data));
        }, 1000);
    
        return () => clearInterval(interval);

    }, [weddingDate]);

  
    return(

        <section id="Countdown">

            { headerOn ? displayHeader() : ""}



            <div className="countdown">

                <div className="days">

                    {dateObject.year > 0 ? <CountDownBox label="Year" data={dateObject.year}/> : ""}    
                    {dateObject.month > 0 ? <CountDownBox label="Month" data={dateObject.month}/> : ""}    
                    {dateObject.day > 0 ? <CountDownBox label="Day" data={dateObject.day}/> : ""} 

                </div> 

                <div className="time">

                    {dateObject.hour > 0 ? <CountDownBox label="Hour" data={dateObject.hour}/> : ""}
                    {dateObject.year === 0 && dateObject.month === 0 && dateObject.day === 0 && dateObject.hour === 0 && dateObject.minute === 0 ? "Wedding Complete": <CountDownBox label="Minute" data={dateObject.minute}/> }
                    {dateObject.year === 0 && dateObject.month === 0 && dateObject.day === 0 && dateObject.hour === 0 && dateObject.minute === 0 ? "Wedding Complete": <CountDownBox label="Second" data={dateObject.second}/> }

                </div>

            </div>

        </section>

    )

}
