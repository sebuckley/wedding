import './picturewall.css'; 
import React from 'react';
import Logo from '../Logo/logo';
import ICalendarLink from "react-icalendar-link";
import getDateDayDMY from '../../../Wigits/timeConvert';

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
        "fontFamily": "var(--text-font-logo-1)",
        "fontWeight": "400",
        "fontStyle": "normal",
        "fontSize": "60px",
        "color": "var(--text-color-logo-1)",
        "textShadow": "1px 1px var(--text-shadow-logo-1)",
        "zIndex": "1",

    }

    const sNameStyle = {

        "position": "absolute",
        "bottom": "-10px",
        "left": "60px",
        "fontFamily": "var(--text-font-logo-1)",
        "fontWeight": "400",
        "fontStyle": "normal",
        "fontSize": "60px",
        "color": "var(--text-color-logo-1)",
        "textShadow": "1px 1px var(--text-shadow-logo-1)",
        "zIndex": "1",

    }

    const andStyle = {

        "position": "absolute",
        "top": "50%",
        "left": "50%",
        "transform": "translate(-50%, -50%)",
        "fontFamily": "var(--and-font-logo-1)",
        "fontWeight": "400",
        "fontStyle": "normal",
        "fontSize": "200px",
        "color": "var(--and-color-logo-1)",
        "zIndex": "0",
        "opacity": "0.6",


    }


    return(

        <section id="Home" className="imageWrapper">
                
            <div className="std addP">SAVE THE DATE</div>

            <Logo 
                height={"200px"}
                width={"300px"}
                fName={props.fName} sName={props.sName} 
                fontSize={"48px"}
                andFontSize={"150px"}
                postitionFromMargin={"10%"}
            />

            <div className="date addP"> { getDateDayDMY(props.date).toUpperCase() } </div>

            <div className="iCal">

                <ICalendarLink event={event}>Add to calendar</ICalendarLink>

            </div>

        </section>

    )
}



