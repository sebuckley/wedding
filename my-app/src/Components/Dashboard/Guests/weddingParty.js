import { useState } from "react";
import '../Dashboard.css';
import { getGuestIndexRole } from '../../Wigits/dataFunctions-guestList';
import { roles } from '../../App/mainData';

export default function WeddingParty(props){
  
    const guestList = props.guestList;
    const setGuestList = props.setGuestList;
    const bridalParty = props.bridalParty;
    const guestFilter = props.guestFilter;
    const guestsSorted = props.guestSorted;
    const guestsSortedBy = props.guestSortedBy;
    const setRole = props.setRole;


    const getPersonLink = (uuid) => {

        return "guest/?personID=" + uuid;

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

    const getRoleLink = (role, UUID, fName, surname) => {

            let link;

            if(role === "Bride" || role === "Groom"){

                link =<a href="./managemywedding/details">{ fName + " " + surname }</a>;

            }else{

                link =<a href={ getPersonLink(UUID) }>{ fName + " " + surname }</a>;

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

                            let fName = guestList.list[index].firstName;
                            let surname = guestList.list[index].surname;
                            let role = guestList.list[index].role;
                            let mobile = guestList.list[index].mobile;
                            let email = guestList.list[index].email;
                            let rsvp = guestList.list[index].rsvp;
                            let UUID = guestList.list[index].UUID;

                            return (

                                <div className={ "guestRow " + order} key={ UUID }>

                                    <div className="col-3">{ getRoleLink(role, UUID, fName, surname) }</div>
                                    <div className="col-3"> { role } </div>
                                    <div className="col-2">{ mobile }</div>
                                    <div className="col-3">{ email }</div>
                                    <div className="col-1"> { rsvp } </div>

                                </div>

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

            <div className={ "guestRow " + 1} key={ "first" }>

                <div className="col-3">{ bridalParty.first.fName + " " + bridalParty.first.lName } </div>
                <div className="col-3"> { bridalParty.first.role } </div>
                <div className="col-2"></div>
                <div className="col-3">{ bridalParty.first.email  }</div>
                <div className="col-1"></div>

            </div>

            
            <div className={ "guestRow " + 1} key={ "first" }>

                <div className="col-3">{ bridalParty.second.fName + " " + bridalParty.second.lName } </div>
                <div className="col-3"> { bridalParty.second.role } </div>
                <div className="col-2"></div>
                <div className="col-3">{ bridalParty.second.email  }</div>
                <div className="col-1"></div>

            </div>

          

            <div id="guestList">

                { getList(guestList.list) }
            
            </div>
   
        </section>

    )
    
}