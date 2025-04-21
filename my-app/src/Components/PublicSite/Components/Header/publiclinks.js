import React from 'react';

export default function PublicLinks(props){

    const displayRSVP = window.location.href.includes("rsvp");

    const rsvpLink = () => {

        return <a className={ props.activeSection === 'rsvp' ? "menuActive active": "menuActive" } href="/rsvp">rsvp</a>;

    }

    return(

         <nav className="publicLinks">

            <a className={ props.activeSection === 'Home' ? "menuActive active": "menuActive" } href="#Home" onClick={(e) => props.onClickMenuItem(e)}>Home</a>
            <a className={ props.activeSection === 'Details' ? "menuActive active": "menuActive" } href="#Details" onClick={(e) => props.onClickMenuItem(e)}>Details</a>
            <a className={ props.activeSection === 'Weather' ? "menuActive active": "menuActive" } href="#Weather" onClick={(e) => props.onClickMenuItem(e)}>Weather</a>
            <a className={ props.activeSection === 'FAQ' ? "menuActive active": "menuActive" } href="#FAQ" onClick={(e) => props.onClickMenuItem(e)}>FAQ</a>
            <a className={ props.activeSection === 'Countdown' ? "menuActive active": "menuActive" } href="#Countdown" onClick={(e) => props.onClickMenuItem(e)}>Countdown</a>

            { displayRSVP ? rsvpLink() : "" }

        </nav>

    )

}