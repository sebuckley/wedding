import './Components/rsvp/rsvp.css';
import React, { useState } from 'react';
import Header from './Components//Header/header';
import dietry from './Components/Data/dietry'
import DietSection from './Components/rsvp/dietrysection'
import PlusOne from './Components/rsvp/plusone'
import RSVPReception from './Components/rsvp/rsvpReception'
import RSVPDay from './Components/rsvp/rsvpDay'


export default function RSVPForm(props){

    const headerOn = props.headerOn;
    const wedding = props.wedding;
    const weddingVenue = props.weddingVenue;
    const bridalParty = props.bridalParty;
    const weddingGuest = false;

    const logoCanvasStyle = {

        "position": "relative",
        "height": "100px",
        "width": "160px",

    }

    const fNameStyle = {

        "position": "absolute",
        "top": "-2px",
        "left": "-6px",
        "fontFamily": "'Over the Rainbow', cursive",
        "fontWeight": "400",
        "fontStyle": "normal",
        "fontSize": "30px",
        "zIndex": "2",

    }

    const sNameStyle = {

        "position": "absolute",
        "bottom": "-2px",
        "left": "34px",
        "fontFamily": "'Over the Rainbow', cursive",
        "fontWeight": "400",
        "fontStyle": "normal",
        "fontSize": "30px",
        "zIndex": "2",

    }

    const andStyle = {

        "position": "absolute",
        "top": "50%",
        "left": "50%",
        "transform": "translate(-50%, -50%)",
        "fontFamily": "'Anton', sans-serif",
        "fontWeight": "400",
        "fontStyle": "normal",
        "fontSize": "100px",
        "color": "rgb(185, 185, 185)",
        "zIndex": "1",
        "opacity": "0.6",


    }

    const [rsvpSet, setRSVPValue] = useState(false);
    const [guestSet, setGuestValue] = useState(false);

    const displayHeader = () => {

        return (

            <div className="rsvpheader">
                <h1>RSVP</h1>
            </div>

        );

    }

    const showRSVP = (e) => {

        setRSVPValue(true);
        e.target.style.backgroundColor = "#198754";
        e.target.style.color  = "#ffffff";
        document.getElementsByClassName("hideRSVP")[0].style.backgroundColor  = "#C5C5C5";
        document.getElementsByClassName("hideRSVP")[0].style.color  = "#000000";


    }

    const hideRSVP = (e) => {

        setRSVPValue(false);
        e.target.style.backgroundColor = "#DC3545";
        e.target.style.color  = "#ffffff";
        document.getElementsByClassName("showRSVP")[0].style.backgroundColor  = "#C5C5C5";
        document.getElementsByClassName("showRSVP")[0].style.color  = "#000000";

    }


    const showGuest = (e) => {

        setGuestValue(true);
        e.target.style.backgroundColor = "#198754";
        e.target.style.color  = "#ffffff";
        document.getElementsByClassName("hideGuest")[0].style.backgroundColor  = "#C5C5C5";
        document.getElementsByClassName("hideGuest")[0].style.color  = "#000000";

        

    }

    const hideGuest = (e) => {

        setGuestValue(false);
        e.target.style.backgroundColor = "#DC3545";
        e.target.style.color  = "#ffffff";
        document.getElementsByClassName("showGuest")[0].style.backgroundColor  = "#C5C5C5";
        document.getElementsByClassName("showGuest")[0].style.color  = "#000000";

    }

    return(

        

        <div style={{"marginTop": "100px",}}>



            < Header location="rsvp" fName={bridalParty.groom.fName} sName={bridalParty.bride.fName}/>
        
            <section id="rsvp">

                { headerOn ? displayHeader() : ""}

                <div className="rsvp">

                    <div className="left">

                    

                       { weddingGuest ? <RSVPDay logoCanvasStyle={ logoCanvasStyle }  fNameStyle={ fNameStyle } sNameStyle={ sNameStyle } andStyle={ andStyle } bridalParty={ bridalParty } wedding={ wedding } weddingVenue={ weddingVenue }/>: <RSVPReception logoCanvasStyle={ logoCanvasStyle }  fNameStyle={ fNameStyle } sNameStyle={ sNameStyle } andStyle={ andStyle } bridalParty={ bridalParty } wedding={ wedding } weddingVenue={ weddingVenue }/> }
                        
                    </div>

                    <div className="right">

                        <form>

                            <h2>Invitee</h2>

                            <div className="row">

                                <div className="inputGroupHalf">
                                
                                    <label className='label'>First name:</label>
                                    <input type="text" className="firstName" name="fName"></input>

                                </div>

                                <div className="inputGroupHalf">

                                    <label className='label'>Surname:</label>
                                  
                                    <input type="text" className="secondName" name="sName"></input>
                            
                                </div>
                            
                            </div>

                            <div className="row">

                                <div className="inputGroupHalf">

                                    <label className='label'>Email:</label>
                                    <input type="email" className="email" name="email"></input>

                                </div>

                                <div className="inputGroupHalf">

                                    <label className='label'>RSVP:</label>
                                    <div className="btn-group" role="group" aria-label="Basic example">
                                        <button type="button" className="btn btn-secondary btnLeft showRSVP" onClick={ showRSVP }>Yes</button>
                                        <button type="button" className="btn btn-secondary btnRight hideRSVP" onClick={ hideRSVP }>No</button>
                                    </div>
                                </div>

                            </div>

                            
                            

                            { rsvpSet ? <DietSection diet={ dietry.dietry.diet } allergies={ dietry.dietry.allergies } showGuest={ showGuest } hideGuest={ hideGuest }/> : "" }

                            { guestSet && rsvpSet ? <PlusOne wedding={ wedding } diet={ dietry.dietry.diet } allergies={ dietry.dietry.allergies } weddingGuest={ weddingGuest }/> : "" }

                    
                        </form>

                    </div>

                </div>
            
            </section>

        </div>

    )

}
