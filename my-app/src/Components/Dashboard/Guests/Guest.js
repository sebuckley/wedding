import '../Dashboard.css';
import Login from '../../Login/Login';
import Header from '../../Wigits/Header/header';
import UpdateGuest from './updateGuest';
// import FamilyList from './familyList';
import { useState } from 'react';

export default function Guest(props){
  
    const { token, setToken } = props.useToken();
    const bridalParty = props.bridalParty;
    const guestList = props.guestList;
    const setGuestList = props.setGuestList;

    const index = props.index;

    // const weddingVenue = props.weddingVenue;

    // const onChange = (e) => {

    //   const itemName = e.target.className;
    //   const currentDate = new Date();
    //   const itemState = e.target.value;
    //   const user = "Stephen Buckley";
    //   let itemList;

    //   if (localStorage.getItem(itemName) !== null) {

    //     let array;
    //     const getItem =  localStorage.getItem(itemName);
    //     const currentItem = JSON.parse(getItem);

    //     const itemOld = {

    //       "state": currentItem.state,
    //       "dateStarted": currentItem.dateStarted,
    //       "updated": currentItem.updated,
    //       "updatedBy": currentItem.updatedBy,

    //     }

    //     if(typeof currentItem.history !== 'undefined'){
          
    //       array = currentItem.history;
    //       array.push(itemOld);

    //     }else{

    //       array = [];
    //       array.push(itemOld);

    //     }

    //     itemList = {

    //       "state": itemState,
    //       "dateStarted": currentItem.dateStarted,
    //       "updated": currentDate,
    //       "updatedBy": user,
    //       "history": array
          
    //     }

    //     setItem(itemName, itemList);

    //   } else {

    //     itemList = {

    //       "state": itemState,
    //       "dateStarted": currentDate,
    //       "updated": currentDate,
    //       "updatedBy": user,
    //       "history": [{

    //         "state": "To-do",
    //         "dateStarted": "-",
    //         "updated": "-",
    //         "updatedBy": "-",

    //       }]
  
    //     }

    //     setItem(itemName, itemList);

    //   }

    //   e.target.parentElement.nextSibling.children[0].value = currentDate.toISOString().split('T')[0];

    // }

    if(!token) {
  
      return <Login setToken={ setToken } bridalParty={ bridalParty } />
  
    }


    return(

        <div>

            <Header fName={bridalParty.groom.fName} sName={bridalParty.bride.fName}/>

            <div className="adminBody">
               
              <UpdateGuest  setGuestList={ setGuestList } guestList={ guestList } index={ index } />
            
              {/* <FamilyList listObject={ listObject } wedding={ wedding } checkExists={ checkExists }/> */}
               
            </div>

        </div>
    
       
    )
    
}