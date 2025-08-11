import { useState } from "react";
import '../Dashboard.css';
import { getGuestIndexRole } from '../../Wigits/dataFunctions-guestList';
import { roles } from '../../App/mainData';
import GuestDataRow from "./guestRowData";

export default function WeddingParty(props){
  
    const guestList = props.guestList;
    const setGuestList = props.setGuestList;
    const bridalParty = props.bridalParty;
    const guestFilter = props.guestFilter;
    const guestsSorted = props.guestSorted;
    const guestsSortedBy = props.guestSortedBy;
    const setRole = props.setRole;
    const wedding = props.wedding;


    const getPersonLink = (uuid) => {

        return "guest/?personID=" + uuid;

    }

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

        console.log(email)
        console.log(wedding)
        console.log(firstName)

        return "mailto:" + email + "?subject=" + encodeURIComponent(wedding.name) + "&body=Hi " + firstName + ",";

    }

    const addRole = (e) => {


       let clickIcon = document.getElementById("addGuestIcon");
       const currentDisplay = document.getElementById("inputForm");

       if(currentDisplay.style.display === "none"){

            clickIcon.click();

       }

       let addValue = document.getElementById("guestRole");
    
       const value = e.target.parentNode.nextSibling.innerText;
       setRole(value);
       const select = document.getElementById("guestRole");
       select.style.color = "var(--black)";

    }

    const getRoleLink = (role, UUID, firstName, surname) => {

            let link;

            if(role === "Bride" || role === "Groom"){

                link =<a href="./managemywedding/details">{ firstName + " " + surname }</a>;

            }else{

                link =<a href={ getPersonLink(UUID) }>{ firstName + " " + surname }</a>;

            }
            
            
            return link;

    }

    const getBlankRole = (role) => {

        let link;

        if(role === "Bride" || role ==="Groom"){

            link = <a href="./managemywedding/details">Please add...</a>;

        }else{

            link = <a href="#addGuestSection" onClick={ addRole }>Please add...</a>;

        }

        return link;

    }

    const getList = (array) => {

        roles.sort((a,b) => a[1] - b[1]);

        let htmlContent;
        let order = 0;

                htmlContent =  roles.map((item, index) => {

                    if(item[0] !== "Guest" && item[2] === true){

                        order += 1;

                        let [found, index] = getGuestIndexRole(guestList, item[0]);

                        if(found){


                            return (

                                <GuestDataRow 

                                    order={ order }
                                    wedding={ wedding }

                                    //the columns to be displayed
                                    person={ guestList.list[index] }
                                    displayRole = { true }
                                    displayMobile={ true }
                                    displayEmail={ true }
                                    displayRSVP={ true }


                                />

                            )

                        }else{

                            return (

                                <div className={ "guestRow " + order} key={ item }>

                                    <div className="col-3">{ getBlankRole(item[0]) }</div>
                                    <div className="col-3">{ item[0] }</div>
                                    <div className="col-2"></div>
                                    <div className="col-3"></div>
                                    <div className="col-1"> </div>

                                </div>

                            )


                        }

                    }

                });

                return htmlContent;

    
        
    }

    return(

        <section id="guestListSection">

            <h2>Wedding party</h2>

             <div id="guestList">

                <GuestDataRow 

                    order={ 1 }
                    wedding={ wedding }
                    bridalPartyPerson={ true }
                    displayBridalContact= { false } 

                    //the columns to be displayed
                    person={ bridalParty.first }
                    displayRole = { true }
                    displayMobile={ true }
                    displayEmail={ true }
                    displayRSVP={ true }


                />

                
                <GuestDataRow 

                    order={ 1 }
                    wedding={ wedding }
                    bridalPartyPerson={ true }
                    displayBridalContact= { false } 

                    //the columns to be displayed
                    person={ bridalParty.second }
                    displayRole = { true }
                    displayMobile={ true }
                    displayEmail={ true }
                    displayRSVP={ true }


                />

          
                { getList(guestList.list) }
            
            </div>
   
        </section>

    )
    
}