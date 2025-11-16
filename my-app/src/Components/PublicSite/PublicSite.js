import React from 'react';
import Header from '../Wigits/Header/header'
import FAQ from './Components/faq/faq';
import Details from './Components/Details/details';
import Countdown from './Components/Countdown/countdown';
import NoVenue from './Components/no-venue';
import NoFAQ from './Components/faq/no-faq';
import PictureWall from './Components/PictureWall/picturewall';
import WeatherToday from './Components/Weather/weather-today';
import CookieConsent from '../Wigits/cookie-consent/cookie-consent';


export default function PublicSite(props){

    const bridalParty = props.bridalParty;
    const wedding = props.wedding;
    const weddingVenue = props.weddingVenue;
    const faq = props.faq;
    const weddingDayInvite = props.weddingDayInvite;
    const weddingReceptionInvite = props.weddingReceptionInvite;
    const loggedIn = props.loggedIn;
    const setLoggedin = props.setLoggedin;
    const checkVenueDetails = bridalParty?.weddingVenue?.weddingVenueDisplay || false;

    const weddingDateSet = bridalParty.weddingDetails.dateTime !== "" ? true : false;
    const weddingVenueSet = checkVenueDetails ? true : false;
    const weddingFAQSet = bridalParty.faqsSet === true ? true : false;

    return(

        <div>

             <Header firstName={ bridalParty.first.firstName } sName={ bridalParty.second.firstName } displayPublic={ true } loggedIn={ loggedIn } setLoggedin={ setLoggedin } publicPage={ true } weddingDateSet={ weddingDateSet } weddingVenueSet={ weddingVenueSet } weddingFAQSet={ weddingFAQSet }/>

            <div className="publicBody">

                < PictureWall fName={bridalParty.first.firstName} sName={bridalParty.second.firstName} date={bridalParty.weddingDetails.dateTime} weddingDayInvite={ weddingDayInvite } weddingReceptionInvite={ weddingReceptionInvite } bridalParty={ bridalParty }/> 
                { weddingVenueSet ? <Details headerOn={true} details={bridalParty.weddingVenue} bridalParty={ bridalParty }/> : <NoVenue />}
                { weddingVenueSet ? <WeatherToday venueName={ bridalParty.weddingVenue.name } lon={ bridalParty.weddingVenue.address.longitude } lat={ bridalParty.weddingVenue.address.latitude } />  : "" }
                { weddingFAQSet ? <FAQ headerOn={ true } faq={ faq } wedding={ wedding }/> : <NoFAQ /> }
                { weddingDateSet ? <Countdown headerOn={ true } date={ bridalParty.weddingDetails.dateTime }/> :"" }
                <CookieConsent />

            </div>

        </div>
    )
}