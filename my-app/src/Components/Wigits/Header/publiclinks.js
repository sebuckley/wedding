import React from 'react';

export default function PublicLinks(props){

    const displayRSVP = window.location.href.includes("rsvp");
    const displayDashboard = props.webPage;
    const onClickPage = props.onClickPage;

    const rsvpLink = () => {

        return <a href="/rsvp">rsvp</a>;

    }

    const dashboardLink = (onClickPage) => {

        return <a href="/managemywedding" onClick={(e) => onClickPage(e) } >Dashboard</a>

    }

    const logOutLink = () => {

        return <a className="menuActive" href="/" onClick={(e) => props.logOut(e) }>Log Out</a>

    }

    return(

         <nav className="publicLinks">

            <a className={ props.activeSection === 'Home' ? "menuActive active": "menuActive" } href="#Home" onClick={(e) => props.onClickMenuItem(e)}>Home</a>
            <a className={ props.activeSection === 'Details' ? "menuActive active": "menuActive" } href="#Details" onClick={(e) => props.onClickMenuItem(e)}>Details</a>
            <a className={ props.activeSection === 'Weather' ? "menuActive active": "menuActive" } href="#Weather" onClick={(e) => props.onClickMenuItem(e)}>Weather</a>
            <a className={ props.activeSection === 'FAQ' ? "menuActive active": "menuActive" } href="#FAQ" onClick={(e) => props.onClickMenuItem(e)}>FAQ</a>
            <a className={ props.activeSection === 'Countdown' ? "menuActive active": "menuActive" } href="#Countdown" onClick={(e) => props.onClickMenuItem(e)}>Countdown</a>

            { displayRSVP ? rsvpLink() : "" }
            { displayDashboard === 0 && props.token ? dashboardLink(onClickPage) : "" }
            { props.token ? logOutLink() : "" }
         

        </nav>

    )

}