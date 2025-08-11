import { useState } from "react";
import '../Dashboard.css';
import { getGuestIndex, deleteGuestListItem } from '../../Wigits/dataFunctions-guestList';
import GuestDataRow from "./guestRowData";

export default function GuestList(props){
  
    const guestList = props.guestList;
    const setGuestList = props.setGuestList;
    // const onChangeGuests = props.onChangeGuests;
    const wedding = props.wedding;
    const guestFilter = props.guestFilter;
    const guestsSorted = props.guestSorted;
    const guestsSortedBy = props.guestSortedBy;
    const bridalParty = props.bridalParty;

    const loadAdditionalGuests = (guests, guestSet, maxGuests) => {

        let addGuests = [];

        if(guests.length > 0 && guestSet === true){

            for(let i = 0; i < guests.length; i++){

                if(guests[i].firstName !== "" && guests[i].surname !== ""){

                    addGuests.push(

                        <GuestDataRow 
                                        
                            order={ 1 }
                            wedding={ wedding }
                            bridalPartyPerson={ false }
                            displayBridalContact= { false } 
        
                            //the columns to be displayed
                            person={ guests[i] }
                            displayAgeGroup={ true }
                            displayDiet={ true }
                            displayAllergies={ true }
                            
                        />
                    )

                }

            }

        }else if(guests.length > 0 && guestSet === false && maxGuests > 0){

             for(let i = 0; i < maxGuests; i++){

                addGuests.push(

                    <GuestDataRow 
                                    
                        order={ 1 }
                        wedding={ wedding }
                        bridalPartyPerson={ false }
                        displayBridalContact= { false } 
    
                        //the columns to be displayed
                        person={ guests[i] }
                        displayAgeGroup = { true }
                        displayDiet={ true }
                        displayAllergies={ true }
                        
                    />

                )

            }

        }

        return addGuests;

    }



    const getList = (array) => {

        array = sortGuestList(array, guestsSortedBy, guestsSorted);

        let htmlContent;

        if(array.length > 0){

            if(guestFilter === "All"){

                htmlContent =  array.map((item, index) => {

                    return (

                        <div>

                            <GuestDataRow 
                                    
                                order={ 1 }
                                wedding={ wedding }
                                bridalPartyPerson={ false }
                                displayBridalContact= { false } 
            
                                //the columns to be displayed
                                person={ item }
                                displayAgeGroup = { true }
                                displayDiet={ true }
                                displayAllergies={ true }
                                
                            />

                            { loadAdditionalGuests(item.additionalGuests, item.additionalGuestsSet, item.maxGuests) }

                        </div>

                    )

                })

            }else{

                htmlContent =  array.map((item, index) => {
        
                    if(guestFilter === item.rsvp){

                        return (

                            <GuestDataRow 
                                    
                                order={ 1 }
                                wedding={ wedding }
                                bridalPartyPerson={ false }
                                displayBridalContact= { false } 
            
                                //the columns to be displayed
                                person={ item }
                                displayAgeGroup = { true }
                                displayDiet={ true }
                                displayAllergies={ true }
                                
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

    return(

        <section id="guestListSection">

            <h2>Guest List</h2>

            { guestList === "" ? <p>No guests in the list</p> : "" }

            <div id="guestList">

                    <GuestDataRow 
                                    
                        order={ 1 }
                        wedding={ wedding }
                        bridalPartyPerson={ true }
                        displayBridalContact= { false } 
    
                        //the columns to be displayed
                        person={ bridalParty.first }
                        displayAgeGroup = { true }
                        displayDiet={ true }
                        displayAllergies={ true }
                        
                    />

                    <GuestDataRow 
                                    
                        order={ 1 }
                        wedding={ wedding }
                        bridalPartyPerson={ true }
                        displayBridalContact= { false } 
    
                        //the columns to be displayed
                        person={ bridalParty.second }
                        displayAgeGroup = { true }
                        displayDiet={ true }
                        displayAllergies={ true }
                        
                    />

                { guestList !== "" ? getList(guestList.list) : "" }
            
            </div>
   
        </section>

    )
    
}