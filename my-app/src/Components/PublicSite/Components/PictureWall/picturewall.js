import './picturewall.css'; 
import React from 'react';
import Logo from '../Logo/logo';
import ICalendarLink from "react-icalendar-link";
import getDateDayDMY from '../../Wigits/timeConvert';

export default function PictureWall(props){

    const weddingDayInvite = props.weddingDayInvite;
    // const weddingReceptionInvite = props.weddingReceptionInvite;
    const event = weddingDayInvite;


    const logoCanvasStyle = {

        "position": "relative",
        "height": "200px",
        "width": "300px",

    }

    const fNameStyle = {

        "position": "absolute",
        "top": "-10px",
        "left": "-20px",
        "fontFamily": "'Over the Rainbow', cursive",
        "fontWeight": "400",
        "fontStyle": "normal",
        "fontSize": "60px",
        "color": "white",
        "textShadow": "2px 2px black",
        "zIndex": "1",

    }

    const sNameStyle = {

        "position": "absolute",
        "bottom": "-10px",
        "left": "60px",
        "fontFamily": "'Over the Rainbow', cursive",
        "fontWeight": "400",
        "fontStyle": "normal",
        "fontSize": "60px",
        "color": "white",
        "textShadow": "2px 2px black",
        "zIndex": "1",

    }

    const andStyle = {

        "position": "absolute",
        "top": "50%",
        "left": "50%",
        "transform": "translate(-50%, -50%)",
        "fontFamily": "'Anton', sans-serif",
        "fontWeight": "400",
        "fontStyle": "normal",
        "fontSize": "200px",
        "color": "rgb(185, 185, 185)",
        "zIndex": "0",
        "opacity": "0.6",


    }


    return(

        <section id="Home" className="imageWrapper">
                
            <div className="std addP">SAVE THE DATE</div>

            <Logo canvasStyle={logoCanvasStyle} fName={props.fName} sName={props.sName} fNameStyle={fNameStyle} sNameStyle={sNameStyle} andStyle={andStyle}/>

            <div className="date addP"> { getDateDayDMY(props.date).toUpperCase() } </div>

            <div className="iCal">

                <ICalendarLink event={event}>Add to Calendar</ICalendarLink>

            </div>

        </section>

    )
}



