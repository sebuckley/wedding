import './details.css';
import React from 'react';
import getDateDayDMY from '../../../Wigits/timeConvert';
import { weddingStyles } from '../../../Dashboard/Details/weddingStyle';

export default function Details(props){

    const getAddress = (obj) => {

        let address = "";
        if (obj?.number && obj?.number !== ""){ address += obj.number + ", " }
        if (obj?.roadName) { address += obj.roadName + ", " } 
        if (obj?.town) { address += obj.town + ", " }
        if (obj?.postCode1) { address += obj.postCode1 + " " }
        if (obj?.postCode2) { address += obj.postCode2 }

        return address;

    }

     const getDescription = (object) => {

        let options = object;

        for (let i = 0; i < object.length; i++) {

            if (object[i].value === bridalParty.weddingDetails.weddingStyle) {
                return object[i].description;
            }

        }

    }

    const headerOn = props.headerOn;
    const details = props.details;
    const bridalParty = props.bridalParty;
    const weddingVenue = bridalParty.weddingVenue;
    const venueName = weddingVenue?.name;
    const venueWebAddress = weddingVenue?.contactDetails?.website || "";
    const venueAddress = getAddress(weddingVenue.address);
    const description = bridalParty.weddingDetails?.styleDescription || getDescription(weddingStyles[bridalParty.weddingDetails.weddingStyleCategory]);


    const displayHeader = () => {

        return (

            <div className="detailsheader">
                <h1>Details</h1>
            </div>

        );

    }

    const getGoogleMapsLink = () => {

        let base;

        return base = "https://www.google.co.uk/maps/search/"+  weddingVenue.name + "/@" + weddingVenue.address.longitude + "," + weddingVenue.address.latitude;

    }

   

    return(

        <section id="Details">

            <div className="details">

                <div className="left">

                    <div>
                       
                    </div>
                    
                </div>

                <div className="right">

                    <div>

                        { headerOn ? displayHeader() : ""}

                        <div className="detailSet">
                            <div className="item">When:</div>
                            <div className="info">{ getDateDayDMY(bridalParty.weddingDetails.dateTime) }</div>
                        </div>
                        <div className="detailSet">
                            <div className="item">Where:</div>
                            <div className="info"><a href={ venueWebAddress } target="_blank" rel="noreferrer noopener">{ venueName }</a></div>
                        </div>
                        <div className="detailSet">
                            <div className="item">Address:</div>
                            <div className="info">{ venueAddress }<br></br>
                            <a href={ getGoogleMapsLink() } target="_blank" rel="noreferrer noopener">Google Maps</a></div>
                        </div>
                        <div className="detailSet">
                            <div className="item">Dress code:</div>
                     
                            <div className="info">{ description }</div>
                        </div>
                    </div>

                </div>

            </div>
        
        </section>

    )

}
