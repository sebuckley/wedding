import { useState } from "react";
import '../Dashboard.css';
import { getGuestIndex, deleteGuestListItem } from '../../Wigits/dataFunctions-guestList';
import { bridalParty } from "../../PublicSite/Components/Data/data";
import GuestDataRow from "./guestRowData";

export default function DietryList(props){
  
    const guestList = props.guestList;
    const setGuestList = props.setGuestList;
    const wedding = props.wedding;
    const guestFilter = props.guestFilter;
    const guestsSorted = props.guestSorted;
    const guestsSortedBy = props.guestSortedBy;
    const bridalParty = props.bridalParty;

    const loadAdditionalGuests = (guests, guestSet) => {

        let addGuests = [];

        if(guests.length > 0 && guestSet === true){

            for(let i = 0; i < guests.length; i++){

                if(guests[i].firstName !== "" && guests[i].surname !== "" && guests[i].diet !== "No dietry requirements" || guests[i].firstName !== "" && guests[i].surname !== "" && guests[i].allergies !== "No allergies" ){

                    addGuests.push(

                        <GuestDataRow 
            
                            order={ 1 }
                            wedding={ wedding }
                            bridalPartyPerson={ false }
                            displayBridalContact= { false } 

                            //the columns to be displayed
                            person={ guests[i] }
                            displayRole = { true }
                            displayDiet={ true }
                            displayAllergies={ true }
                            
                        />

                    )

                }

            }

        }

        return addGuests;

    }

    const checkMain = (item, index) => {

        if(item.diet === "" && item.allergies === "") return null;

        if(item.diet !== "No dietry requirements" || item.allergies !== "No allergies"){

            return (

                  <GuestDataRow 
                
                    order={ 1 }
                    wedding={ wedding }
                    bridalPartyPerson={ false }
                    displayBridalContact= { false } 

                    //the columns to be displayed
                    person={ item }
                    displayRole = { true }
                    displayDiet={ true }
                    displayAllergies={ true }
                    
                />

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

                            <GuestDataRow 
                
                                order={ index }
                                wedding={ wedding }
                                bridalPartyPerson={ true }
                                displayBridalContact= { false } 

                                //the columns to be displayed
                                person={ item }
                                displayRole = { true }
                                diet={ true }
                                allergies={ true }
                                
                            />

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

    const getBrideGroom = (selection) => {

        const checkPerson = bridalParty[selection];

        if(checkPerson.diet == "" && checkPerson.allergies === "") return null

        if(checkPerson.diet !== "No dietry requirements" || checkPerson.allergies !== "No allergies"){

            return (

                 <GuestDataRow 
                
                    order={ 1 }
                    wedding={ wedding }
                    bridalPartyPerson={ true }
                    displayBridalContact= { false } 

                    //the columns to be displayed
                    person={ checkPerson }
                    displayRole = { true }
                    diet={ true }
                    allergies={ true }
                    
                />

            )

        }

    }

    return(

        <section id="guestListSection">

            <h2>Dietry List</h2>

            { guestList === "" ? <p>No guests in the list</p> : "" }

            <div id="guestList">

                { getBrideGroom("first") }
                { getBrideGroom("second") }

                { guestList !== "" ? getList(guestList.list) : "" }
            
            </div>
   
        </section>

    )
    
}