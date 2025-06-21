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

    const weddingDateSet = true;
    const weddingVenueSet = true;
    const weddingFAQSet = true;

    return(

        <div>

            < Header fName={bridalParty.groom.fName} sName={bridalParty.bride.fName} displayPublic={ true }/>

            <div className="publicBody">
            
            < PictureWall fName={bridalParty.groom.fName} sName={bridalParty.bride.fName} date={wedding.date} weddingDayInvite={ weddingDayInvite } weddingReceptionInvite={ weddingReceptionInvite }/> 
            { weddingVenueSet ? <Details headerOn={true} details={weddingVenue}/> : <NoVenue />}
            <WeatherToday lon={ weddingVenue.longitude } lat={ weddingVenue.latitude } />
           { weddingFAQSet ? <FAQ headerOn={ true } faq={ faq } wedding={ wedding }/> : <NoFAQ /> }
           
           { weddingDateSet ? <Countdown headerOn={ true } date={ wedding.date }/> :"" }
           <CookieConsent />

            </div>

        </div>
    )
}