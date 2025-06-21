import './details.css';
import React from 'react';
import getDateDayDMY from '../../../Wigits/timeConvert';

export default function FAQ(props){

    const headerOn = props.headerOn;
    const details = props.details;

    const displayHeader = () => {

        return (

            <div className="detailsheader">
                <h1>Details</h1>
            </div>

        );

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
                            <div className="info">{ getDateDayDMY(details.date) }</div>
                        </div>
                        <div className="detailSet">
                            <div className="item">Where:</div>
                            <div className="info"><a href={ details.venueWebAddress } target="_blank" rel="noreferrer noopener">{details.venue}</a></div>
                        </div>
                        <div className="detailSet">
                            <div className="item">Address:</div>
                            <div className="info">{ details.venueAddress }<br></br><a href={ details.venueGoogleMaps } target="_blank" rel="noreferrer noopener">Google Maps</a></div>
                        </div>
                        <div className="detailSet">
                            <div className="item">Dress code:</div>
                            <div className="info">{ details.dressCode }</div>
                        </div>
                    </div>

                </div>

            </div>
        
        </section>

    )

}
