
import React, { useState } from 'react';
import OneAdditionalGuest from './oneadditionalguest';
import MultipleAdditionalGuest from './multipleadditionalguests';

export default function AdditionalGuests(props){

    const diet = props.diet;
    const allergies = props.allergies;
    const wedding = props.wedding;
    const weddingGuest = props.weddingGuest;
    const maxGuests = wedding.maxGuests - 1;

    const [additionalGuestSet, setAdditonalGuestValue] = useState(false);
  
    const showAdditionalGuests = (e) => {

        setAdditonalGuestValue(true);
        document.getElementsByClassName("showAddGuest")[0].style.backgroundColor = "#198754";
        document.getElementsByClassName("showAddGuest")[0].style.color  = "#ffffff";
        document.getElementsByClassName("hideAddGuest")[0].style.backgroundColor  = "#C5C5C5";
        document.getElementsByClassName("hideAddGuest")[0].style.color  = "#000000";

    }


    const hidedditionalGuests = (e) => {

        setAdditonalGuestValue(false);
        document.getElementsByClassName("hideAddGuest")[0].style.backgroundColor = "#DC3545";
        document.getElementsByClassName("hideAddGuest")[0].style.color  = "#ffffff";
        document.getElementsByClassName("showAddGuest")[0].style.backgroundColor  = "#C5C5C5";
        document.getElementsByClassName("showAddGuest")[0].style.color  = "#000000";

    }


    return(

        <div>

            <div className="row">

                <div className="inputGroupHalf">

                    <p>You are able to { maxGuests } additonal guests to the { weddingGuest ? "wedding": "wedding reception" }</p>

                    <label className='label'>Are you bringing additional Guests:</label>
                    <div className="btn-group" role="group" aria-label="Basic example">
                        <button type="button" className="btn btn-secondary btnLeft showAddGuest" onClick={ showAdditionalGuests }>Yes</button>
                        <button type="button" className="btn btn-secondary btnRight hideAddGuest" onClick={ hidedditionalGuests }>No</button>
                    </div>
                    
                </div>


                

            </div>

          

            { additionalGuestSet && maxGuests === 1? <OneAdditionalGuest allergies={ allergies } diet={ diet }/>: ""}

            { additionalGuestSet && maxGuests > 1 ? <MultipleAdditionalGuest allergies={ allergies } diet={ diet } maxGuests={ maxGuests } hideGuests={ hidedditionalGuests } />: ""}

            

        </div>


       

    )

}