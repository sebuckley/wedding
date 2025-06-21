import { useState } from "react";
import '../Dashboard.css';
import { getGuestIndex, deleteGuestListItem } from '../../Wigits/dataFunctions-guestList';

export default function DietryList(props){
  
    const guestList = props.guestList;
    const setGuestList = props.setGuestList;
    const wedding = props.wedding;
    const guestFilter = props.guestFilter;
    const guestsSorted = props.guestSorted;
    const guestsSortedBy = props.guestSortedBy;
  
    const getPersonLink = (uuid) => {

        return "guest/?personID=" + uuid;

    }

    const getAgeGroup = (str) => {

        let returnText;

        if(str === "Over 18"){

            returnText = "Adult";

        }else if(str === "Under 18"){

            returnText = "Child";

        }else if(str === "Under 5"){

            returnText = "Infant";

        }else if(str === ""){

            returnText = "Unknown";

        }

        return returnText;


    }

    const getDiet = (str) => {

        let returnText;

        if(str === "No dietry requirements"){

            returnText = "None";

        }else if(str === ""){

            returnText = "Unknown";

        }else{

            returnText = str;

        }

        return returnText;


    }

    const getAllergies = (str) => {

        let returnText;

        if(str === "No allergies"){

            returnText = "None";


        }else if(str === ""){

            returnText = "Unknown";

        }else{

            returnText = str;

        }

        return returnText;


    }

    const checkName = (firstName, surname, guestSet) => {

        let text;
        let type = guestSet ? "(Guests Set)" : "(Guest not set)";


        if(firstName === "" && surname === ""){

            text = "Unknown " + type;

        }else{

            text = firstName + " " + surname;

        }

        return text;

    }

    const loadAdditionalGuests = (guests, guestSet) => {

        let addGuests = [];

        if(guests.length > 0 && guestSet === true){

            for(let i = 0; i < guests.length; i++){

                if(guests[i].firstName !== "" && guests[i].surname !== "" && guests[i].diet !== "No dietry requirements" || guests[i].firstName !== "" && guests[i].surname !== "" && guests[i].allergies !== "No allergies" ){

                    addGuests.push(

                        <div className={ "guestRow "} key={ i }>

                            <div className="col-3">{ checkName(guests[i].firstName, guests[i].surname, guestSet) }</div>
                            <div className="col-3">Age Group: { getAgeGroup(guests[i].guestType) }</div>
                            <div className="col-3">Dietry: { getDiet(guests[i].diet) }</div>
                            <div className="col-3">Allergies: { getAllergies(guests[i].allergies) }</div>

                        </div>
                    )

                }

            }

        }

        return addGuests;

    }

    const checkMain = (item, index) => {

        if(item.diet !== "No dietry requirements" || item.allergies !== "No allergies"){

            return (

                <div className={ "guestRow " + index} key={ item.UUID }>

                    <div className="col-3"><a href={ getPersonLink(item.UUID) }>{item.firstName + " " + item.surname } </a></div>
                    <div className="col-3">Age Group: { getAgeGroup(item.guestType) }</div>
                    <div className="col-3">Dietry: { getDiet(item.diet) }</div>
                    <div className="col-3">Allergies: { getAllergies(item.allergies) }</div>

                </div>

            )

        }

    }



    const getList = (array) => {

        array = sortGuestList(array, guestsSortedBy, guestsSorted);

        let htmlContent;

        if(array.length > 0){

            if(guestFilter === "All"){

                htmlContent =  array.map((item, index) => {

                    return (

                        <div>

                            { checkMain(item, index) }

                            { loadAdditionalGuests(item.additionalGuests, item.additionalGuestsSet, item.maxGuests) }

                        </div>

                    )

                })

            }else{

                htmlContent =  array.map((item, index) => {
        
                    if(guestFilter === item.rsvp){

                        return (

                            <div className={ "guestRow " + index} key={ item.UUID }>

                                <div className="col-3"><a href={ getPersonLink(item.UUID) }>{item.firstName + " " + item.surname } </a></div>
                                <div className="col-3">Age Group: { getAgeGroup(item.guestType) }</div>
                                <div className="col-3">Dietry: { getDiet(item.diet) }</div>
                                <div className="col-3">Allergies: { getAllergies(item.allergies) }</div>


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

            <h2>Dietry List</h2>

            { guestList === "" ? <p>No guests in the list</p> : "" }

            <div id="guestList">

                { guestList !== "" ? getList(guestList.list) : "" }
            
            </div>
   
        </section>

    )
    
}