import './rsvp.css';
import React from 'react';
import Logo from '../Logo/logo';

export default function RSVPReception(props){

    const logoCanvasStyle = props.logoCanvasStyle;
    const fNameStyle = props.fNameStyle;
    const sNameStyle = props.sNameStyle;
    const andStyle = props.andStyle;
    const bridalParty = props.bridalParty;
    const wedding = props.wedding;
    const weddingVenue = props.weddingVenue;

    return(

        <div>

            <p>You have been invited to the wedding reception of:</p>

            <div className="logo">

            { <Logo canvasStyle={logoCanvasStyle} fName={bridalParty.groom.fName} sName={bridalParty.bride.fName} fNameStyle={fNameStyle} sNameStyle={sNameStyle} andStyle={andStyle}/> }


            </div>

            <p>on the { wedding.reception }.  The wedding will be at <a href={ weddingVenue.venueWebAddress }>{ weddingVenue.venue }</a>, please respond to your invitation by completing the form.</p>

        </div>

    )

}