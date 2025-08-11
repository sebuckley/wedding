import { useState } from "react";
import '../Dashboard.css';
import { getGuestIndex, deleteGuestListItem } from '../../Wigits/dataFunctions-guestList';

export default function PrimaryGuestList(props){
  
    const guestList = props.guestList;
    const setGuestList = props.setGuestList;
    // const onChangeGuests = props.onChangeGuests;
    const wedding = props.wedding;
    const guestFilter = props.guestFilter;
    const guestsSorted = props.guestSorted;
    const guestsSortedBy = props.guestSortedBy;
    const [guestListUpdated, setGuestListUpdated] = useState(0);

    const getPhoneLink = (mobile, uuid) => {

        let link;

        if(mobile === ""){

            link = "guest/?personID=" + uuid;

        }else{

            link = "tel:" + mobile;

        }

        return link; 
        
    }

    const getEmailLink = (email, wedding, firstName) => {

        return "mailto:" + email + "?subject=" + encodeURIComponent(wedding.name) + "&body=Hi " + firstName + ",";

    }

    const getPersonLink = (uuid) => {

        return "guest/?personID=" + uuid;

    }

    const deleteListItem = async (event) => {

        const checkAction = window.confirm("Are you sure you want to delete the guest?");

        if(checkAction){

            const UUID = event.target.parentNode.nextSibling.innerText;
            const itemIndex = getGuestIndex(guestList,UUID);
            const newList = await deleteGuestListItem(guestList,itemIndex);
            console.log(newList);

            setGuestList(newList);
            const newSate = guestListUpdated + 1;
            setGuestListUpdated(newSate);

        }
     
    }

    const getConfirmed = (rsvpState, guestsSelected, noAddiitonalGuests, maxGuests) => {

        let number = 0;

        if(rsvpState === "Confirmed"){

            number += 1;

        }

        if(guestsSelected){

            number += noAddiitonalGuests;

        }

        return number;

    }

    const getDeclined = (rsvpState, guestsSelected, noAddiitonalGuests, maxGuests) => {

        let number = 0;

        if(rsvpState === "Declined"){

            number += 1;

        }

        if(guestsSelected){

            number += maxGuests - noAddiitonalGuests;

        }

        return number;

    }

    const getNumberTitle = (num, fName, surname) => {

        let text;

        if(num  === ""){


            text= "add number for " + fName + " " + surname;


        }else{

            text= "call " + fName + " " + surname;

        }

        return text;

    }

    const getList = (array) => {

        array = sortGuestList(array, guestsSortedBy, guestsSorted);

        let htmlContent;

        if(array.length > 0){

            if(guestFilter === "All"){

                htmlContent =  array.map((item, index) => {


                    return (

                        <div className={ "guestRow " + index} key={ item.UUID }>

                            <div className="col-3"><a href={ getPersonLink(item.UUID) }>{item.firstName + " " + item.surname } </a></div>
                            <div className="col-1"><a href={ getPhoneLink(item.mobile, item.UUID) } aria-label={ getNumberTitle(item.mobile, item.firstName, item.surname ) } title={ getNumberTitle(item.mobile, item.firstName, item.surname ) }> { item.mobile === "" ? <i className="fa-solid fa-circle-plus icon3"></i> : <i className="fa-solid fa-phone icon3"></i> }</a></div>
                            <div className="col-1"><a href={ getEmailLink(item.email, wedding, item.firstName) } aria-label={ "email " + item.firstName + " " + item.surname } title={ "email " + item.firstName + " " + item.surname }><i className="fa-solid fa-envelope icon3"></i></a></div>
                            <div className="col-1"> { item.rsvp === "Not confirmed" ? <i className="fa-solid fa-circle-minus iconMinus" aria-label="Not confirmed" title="Not confirmed"></i> : item.rsvp === "Confirmed" ?  <i className="fa-solid fa-circle-check iconCheck" aria-label="Confirmed" title="Confirmed"></i> : <i className="fa-solid fa-circle-xmark iconCross" aria-label="Declined" title="Declined"></i>} </div>
                            
                            <div className="col-1 centered">
                                <div className="centered"><i className="fa-solid fa-people-group icon4" aria-hidden="true" aria-label="Max guests" title="Max guests"></i></div>
                                <div className="centered">:</div> 
                                <div className="centered"> { parseInt(item.maxGuests) + 1 }</div>
                            </div>
                            <div className="col-1 centered">
                                <div className="centered"><i className="fa-solid fa-circle-check iconCheck2" aria-hidden="true" aria-label="Number confirmed" title="Number confirmed"></i></div>
                                <div className="centered">:</div> 
                                <div className="centered">{ getConfirmed(item.rsvp, item.additionalGuestsSet, item.additionalGuestsNo, item.maxGuests) } </div>
                            </div>
                            <div className="col-1 centered">
                                <div className="centered"><i className="fa-solid fa-circle-xmark iconCross2" aria-hidden="true" aria-label="Number declined" title="Number declined"></i></div>
                                <div className="centered">:</div> 
                                <div className="centered"> { getDeclined(item.rsvp, item.additionalGuestsSet, item.additionalGuestsNo, item.maxGuests) }</div>
                            </div>
                            <div className="col-2">
                                <button className="deleteButton" onClick={ deleteListItem } >Delete</button>
                            </div>
                            <div style={{display:"none"}}>
                                { item.UUID }
                            </div>

                        </div>

                    )

                })

            }else{

                htmlContent =  array.map((item, index) => {

                    let declinedGuests = parseInt(getDeclined(item.rsvp, item.additionalGuestsSet, item.additionalGuestsNo, item.maxGuests));
        
                    if(guestFilter === item.rsvp || guestFilter === "Declined" && declinedGuests > 0){

                        return (

                           <div className={ "guestRow " + index} key={ item.UUID }>

                                <div className="col-3"><a href={ getPersonLink(item.UUID) }>{item.firstName + " " + item.surname } </a></div>
                                <div className="col-1"><a href={ getPhoneLink(item.mobile, item.UUID) } aria-label={ "add number for" + item.firstName + " " + item.surname }> { item.mobile === "" ? <i className="fa-solid fa-circle-plus icon3"></i> : <i className="fa-solid fa-phone icon3"></i> }</a></div>
                                <div className="col-1"><a href={ getEmailLink(item.email, wedding, item.firstName) } aria-label={ "email " + item.firstName + " " + item.surname }><i className="fa-solid fa-envelope icon3"></i></a></div>
                                <div className="col-1"> { item.rsvp === "Not confirmed" ? <i className="fa-solid fa-circle-minus iconMinus" aria-label="Not confirmed" title="Not confirmed"></i> : item.rsvp === "Confirmed" ?  <i className="fa-solid fa-circle-check iconCheck" aria-label="Confirmed" title="Confirmed"></i> : <i className="fa-solid fa-circle-xmark iconCross" aria-label="Declined" title="Declined"></i>} </div>
                                
                                <div className="col-1"><i className="fa-solid fa-people-group icon4" aria-hidden="true" aria-label="Max guests" title="Max guests"></i>: { parseInt(item.maxGuests) + 1 }</div>
                                <div className="col-1" style={{"display":"flex", "alignItems": "centre"}}><div><i className="fa-solid fa-circle-check iconCheck2" aria-hidden="true" aria-label="Number confirmed" title="Number confirmed"></i></div>: <div>{ getConfirmed(item.rsvp, item.additionalGuestsSet, item.additionalGuestsNo, item.maxGuests) } </div></div>
                                <div className="col-1"><i className="fa-solid fa-circle-xmark iconCross2" aria-hidden="true" aria-label="Number declined" title="Number declined"></i>: { getDeclined(item.rsvp, item.additionalGuestsSet, item.additionalGuestsNo, item.maxGuests) }</div>
                                <div className="col-2">
                                    <button className="deleteButton" onClick={ deleteListItem } >Delete</button>
                                </div>
                                <div style={{display:"none"}}>
                                    { item.UUID }
                                </div>

                            </div>

                        )

                    }

                })


                
            }

            return htmlContent;

        }else{

            return <div><div>No guests in the list</div></div>

        }
        
    }
    

    const sortGuestList = (array, sortBy="surname", type="asc") => {

        if(sortBy === "surname"){

            if(type === "asc"){

                array.sort((a, b) => a.surname.localeCompare(b.surname)); 

            }else{

                array.sort((a, b) => b.surname.localeCompare(a.surname)); 

            }

        }else if(sortBy === "maxGuests"){

            if(type === "asc"){

                array.sort((a, b) => a.maxGuests - b.maxGuests); 

            }else{

                array.sort((a, b) =>  b.maxGuests - a.maxGuests); 

            }


        }else if(sortBy === "rsvp"){

            if(type === "asc"){

                array.sort((a, b) => a.rsvp.localeCompare(b.rsvp)); 

            }else{

                array.sort((a, b) => b.rsvp.localeCompare(a.rsvp)); 

            }

        }else if(sortBy === "First name"){

            if(type === "asc"){

                array.sort((a, b) => a.firstName.localeCompare(b.firstName)); 

            }else{

                array.sort((a, b) => b.firstName.localeCompare(a.firstName)); 

            }

        }

        return array;

    }

    return(

        <section id="guestListSection">

            <h2>Primary Guest List</h2>

            { guestList === "" ? <p>No guests in the list</p> : "" }

            <div id="guestList">

                { guestList !== "" ? getList(guestList.list) : "" }
            
            </div>
   
        </section>

    )
    
}