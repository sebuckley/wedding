import React from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

export default function PublicLinks(props){

    const displayRSVP = window.location.href.includes("rsvp");
    const onClickPage = props.onClickPage;
    const loggedIn = props.loggedIn;
    const weddingDateSet = props.weddingDateSet;
    const weddingVenueSet = props.weddingVenueSet;
    const weddingFAQSet = props.weddingFAQSet;

    const rsvpLink = () => {

        return <a href="/rsvp">rsvp</a>;

    }

    const dashboardLink = (onClickPage) => {

        return <Link to='managemywedding/'> Dashboard</Link>

    }

    const logOutLink = () => {

        return <a className="menuActive" href="/" onClick={(e) => props.handleLogout(e) }>Log Out</a>

    }

    return(

         <nav className="publicLinks">

            <HashLink className={ props.activeSection === 'Home' ? "menuActive active": "menuActive" } to="#Home">Home</HashLink>
            { weddingVenueSet ? <HashLink className={ props.activeSection === 'Venue' ? "menuActive active": "menuActive" } to="#Venue" >Venue</HashLink> : "" }
            { weddingVenueSet ? <HashLink className={ props.activeSection === 'Weather' ? "menuActive active": "menuActive" } to="#Weather" >Weather</HashLink> : "" }
            { weddingFAQSet ? <HashLink className={ props.activeSection === 'FAQ' ? "menuActive active": "menuActive" } to="#FAQ" >FAQ</HashLink> : "" }
            { weddingDateSet ? <HashLink className={ props.activeSection === 'Countdown' ? "menuActive active": "menuActive" } to="#Countdown" >Countdown</HashLink> : "" }

            { displayRSVP ? rsvpLink() : "" }
            { loggedIn ? dashboardLink(onClickPage) : "" }
            { loggedIn ? logOutLink() : "" }
         

        </nav>

    )

}