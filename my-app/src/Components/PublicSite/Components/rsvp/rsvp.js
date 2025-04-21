// import './rsvp.css';
import React from 'react';

export default function RSVP(props){

    const headerOn = props.headerOn;
    const details = props.details;


    const displayHeader = () => {

        return (

            <div className="detailsheader">
                <h1>RSVP</h1>
            </div>

        );

    }

    return(

        <section id="rsvp">

            <div className="rsvp">

                <div className="left">

                    <div>

                  
                       
                    </div>
                    
                </div>

                <div className="right">

                    <div>

                        { headerOn ? displayHeader() : ""}

                        <a href="/rsvp">RSVP</a>

                   
                    </div>

                </div>

            </div>
        
        </section>

    )

}
