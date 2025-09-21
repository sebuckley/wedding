import React from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

export default function PublicLinks(props){

    const displayRSVP = window.location.href.includes("rsvp");
    const onClickPage = props.onClickPage;
    const loggedIn = props.loggedIn;

    const rsvpLink = () => {

        return <a href="/rsvp">rsvp</a>;

    }

    const dashboardLink = (onClickPage) => {

        return <Link to='managemywedding/'> Dashboard</Link>

    }

    const logOutLink = () => {

        return <a className="menuActive" href="/" onClick={(e) => props.logOut(e) }>Log Out</a>

    }

    return(

         <nav className="publicLinks">

            <HashLink className={ props.activeSection === 'Home' ? "menuActive active": "menuActive" } to="#Home" onClick={(e) => props.onClickMenuItem(e)}>Home</HashLink>
            <HashLink className={ props.activeSection === 'Details' ? "menuActive active": "menuActive" } to="#Details" onClick={(e) => props.onClickMenuItem(e)}>Details</HashLink>
            <HashLink className={ props.activeSection === 'Weather' ? "menuActive active": "menuActive" } to="#Weather" onClick={(e) => props.onClickMenuItem(e)}>Weather</HashLink>
            <HashLink className={ props.activeSection === 'FAQ' ? "menuActive active": "menuActive" } to="#FAQ" onClick={(e) => props.onClickMenuItem(e)}>FAQ</HashLink>
            <HashLink className={ props.activeSection === 'Countdown' ? "menuActive active": "menuActive" } to="#Countdown" onClick={(e) => props.onClickMenuItem(e)}>Countdown</HashLink>

            { displayRSVP ? rsvpLink() : "" }
            { loggedIn ? dashboardLink(onClickPage) : "" }
            { loggedIn ? logOutLink() : "" }
         

        </nav>

    )

}