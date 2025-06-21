import '../Dashboard.css';
import { useState } from 'react';
import Login from '../../Login/Login';
import GuestFilter from './guestFilter';
import GuestSort from './guestSort';
import Header from '../../Wigits/Header/header';
import { getGuestIndex, saveGuestListItem } from '../../Wigits/dataFunctions-guestList';
import AddGuest from './addGuest';
import ListType from './listType';
import PrimaryGuestList from './primaryGuestList';
import GuestList from './guestList';
import DietryList from './dietryList';

export default function Guests(props){
  
    const { token, setToken } = props.useToken();

    const bridalParty = props.bridalParty;
    const wedding = props.wedding;
    const setGuestList = props.setGuestList;
    const guestList = props.guestList;
    const [guestFilter, setGuestFilter] = useState('All');
    const [guestSortedBy, setGuestSortedBy] = useState("surname");
    const [guestSorted, setGuestSorted] = useState("asc");
    const [listType, setListType] = useState("Primary guests");

    const onChangeGuests = (e) => {

      const itemName = e.target.name;
      const itemValue = e.target.value;
      const personID = e.target.parentElement.nextSibling.nextSibling.innerText;
      const itemIndex = getGuestIndex(guestList,personID);

      if(itemIndex > -1){
      
        saveGuestListItem(guestList, itemIndex, itemName, itemValue);

      }else{

        console.log("fail");

      }
    
    }

    if(!token) {
  
      return <Login setToken={ setToken } bridalParty={ bridalParty } />
  
    }

    return(

        <div>

            <Header fName={bridalParty.groom.fName} sName={bridalParty.bride.fName}/>

            <div className="adminBody">

              <AddGuest />

              <ListType setListType={ setListType } />

              <GuestFilter setGuestFilter={ setGuestFilter } listType={ listType }/>
              <GuestSort setGuestSorted={ setGuestSorted } guestSorted={ guestSorted } setGuestSortedBy={ setGuestSortedBy } guestSortedBy={ guestSortedBy } listType={ listType }/>
              
              { guestList.length === 0 ? "No guests in list": "" }

              { guestList.length > 0 && listType === "Primary guests" ? <PrimaryGuestList wedding={ wedding } onChangeGuests={ onChangeGuests } setGuestList={ setGuestList } guestList={ guestList } guestFilter={ guestFilter } guestSorted={ guestSorted } guestSortedBy={ guestSortedBy }/> : "" }
              { guestList.length > 0 && listType === "Guest list" ? <GuestList wedding={ wedding } onChangeGuests={ onChangeGuests } setGuestList={ setGuestList } guestList={ guestList } guestFilter={ guestFilter } guestSorted={ guestSorted } guestSortedBy={ guestSortedBy }/> : "" }
              { guestList.length > 0 && listType === "Dietry list" ? <DietryList wedding={ wedding } onChangeGuests={ onChangeGuests } setGuestList={ setGuestList } guestList={ guestList } guestFilter={ guestFilter } guestSorted={ guestSorted } guestSortedBy={ guestSortedBy }/> : "" }
               
            </div>

        </div>
    
       
    )
    
}