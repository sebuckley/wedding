import './picturewall.css'; 
import React from 'react';
import Logo from '../Logo/logo';
import ICalendarLink from "react-icalendar-link";
import getDateDayDMY from '../../../Wigits/timeConvert';
import { HashLink as Link } from "react-router-hash-link";

export default function PictureWall(props){

    const weddingDayInvite = props.weddingDayInvite;
    // const weddingReceptionInvite = props.weddingReceptionInvite;
    const event = weddingDayInvite;
    const date = props.date;
    const bridalParty = props.bridalParty;

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

    const generateICalFile = () => {

        const icsContent = `
            BEGIN:VCALENDAR
            VERSION:2.0
            BEGIN:VEVENT
            SUMMARY:Sample Event
            DTSTART:20251010T100000Z
            DTEND:20251010T110000Z
            LOCATION:Online
            DESCRIPTION: ${ bridalParty.weddingDetails.styleDescription }
            END:VEVENT
            END:VCALENDAR
        `;
    
        const blob = new Blob([icsContent], { type: "text/calendar" });
        const url = URL.createObjectURL(blob);

        return url;

    };

    const icalLink = generateICalFile();

    return(

        

        <section id="Home" className="imageWrapper">
                
            { date !== "" ?  <div className="std addP">SAVE THE DATE</div> : "" }

            <Logo 
                height={"250px"}
                width={"450px"}
                fName={props.fName} sName={props.sName} 
                fontSize={"45px"}
                andFontSize={"150px"}
                postitionFromMargin={"20%"}
            />

            { date !== "" ? <div className="date addP"> { getDateDayDMY(props.date).toUpperCase() } </div> : "" }

            { date !== "" ? <div className="date addP"> <div className="iCal"><a href={ icalLink }>Add to calendar</a></div></div> : "" }

        </section>

    )
}



