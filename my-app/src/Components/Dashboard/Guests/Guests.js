import '../Dashboard.css';
import { useState } from 'react';
import Login from '../../Login/Login';
import GuestFilter from './guestFilter';
import GuestSort from './guestSort';
import Header from '../../Wigits/Header/header';
import { getGuestIndex, saveGuestListItem } from '../../Wigits/dataFunctions-guestList';
import AddGuest from './addGuest';
import ListType from './listType';
import WeddingParty from './weddingParty';
import PrimaryGuestList from './primaryGuestList';
import GuestList from './guestList';
import DietryList from './dietryList';
import Loading from '../../PublicSite/Components/loading/loading';

export default function Guests(props){
  

    const user = props.user;
    const setUser = props.setUser;
    const loading = props.loading;
    const setLoading = props.setLoading;
    const loggedIn = props.loggedIn;
    const setLoggedin = props.setLoggedin;
    
    const [role, setRole] = useState("");

    const pathName = window.location.search;
    let filterName;
    let listTypeName;


    if(pathName !== ""){

      const url = new URL(window.location.href);
      url.search = ''; // Clear the search query
      window.history.replaceState({}, document.title, url.toString());

      if(pathName === "?Adults" || pathName === "?Children" || pathName === "?Infants"){

        listTypeName = "Guest list";
        filterName = "All";

      }else if(pathName === "?Dierty%20Needs" || pathName === "?Allergies"){

        listTypeName = "Dietry list";
        filterName = "All";

      }else if(pathName === "?Confirmed"){

        listTypeName = "Primary guests";
        filterName = "Confirmed";

      }else if(pathName === "?Declined"){

        listTypeName = "Primary guests";
        filterName = "Declined";

      }else if(pathName === "?Outstanding%20responses"){

        listTypeName = "Primary guests";
        filterName = "Not confirmed";

      }else{

        listTypeName = "Primary guests";
        filterName = "All";

      }

    }else{

      listTypeName = "Primary guests";
      filterName = "All";

    }

    const bridalParty = props.bridalParty;
    const wedding = props.wedding;
    const setGuestList = props.setGuestList;
    const guestList = props.guestList;
    const [guestFilter, setGuestFilter] = useState(filterName);
    const [guestSortedBy, setGuestSortedBy] = useState("surname");
    const [guestSorted, setGuestSorted] = useState("asc");
    const [listType, setListType] = useState(listTypeName);
    const getRoles = props.getRoles;

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

    if(loading){

      return <Loading bridalParty={ bridalParty } user={ user }/>

    }

    if(user === null) {
  
      return <Login setUser={ setUser } loading={loading} setLoading={ setLoading } bridalParty={ bridalParty } />
  
    }

    return(

        <div>

            <Header firstName={ bridalParty.first.firstName } sName={ bridalParty.second.firstName } displayPublic={ false } loggedIn={ loggedIn } setLoggedin={ setLoggedin }/>

            <div className="adminBody">

              <AddGuest user={ user } getRoles={ getRoles } role={ role } setRole={ setRole } setGuestList={ setGuestList }/>

              <ListType setListType={ setListType } listType={ listType } />

              { listType === "Primary guests" ? <GuestFilter setGuestFilter={ setGuestFilter } filterName={ guestFilter }/> : "" }
              <GuestSort setGuestSorted={ setGuestSorted } guestSorted={ guestSorted } setGuestSortedBy={ setGuestSortedBy } guestSortedBy={ guestSortedBy } listType={ listType }/>
              
              { guestList.length === 0 ? "No guests in list": "" }
              { listType === "Wedding party" ? <WeddingParty wedding={ wedding } onChangeGuests={ onChangeGuests } setGuestList={ setGuestList } guestList={ guestList } guestFilter={ guestFilter } guestSorted={ guestSorted } guestSortedBy={ guestSortedBy } setRole={ setRole } bridalParty={ bridalParty }/> : "" }
              { guestList.length > 0 && listType === "Primary guests" ? <PrimaryGuestList wedding={ wedding } onChangeGuests={ onChangeGuests } setGuestList={ setGuestList } guestList={ guestList } guestFilter={ guestFilter } guestSorted={ guestSorted } guestSortedBy={ guestSortedBy }/> : "" }
              { guestList.length > 0 && listType === "Guest list" ? <GuestList wedding={ wedding } onChangeGuests={ onChangeGuests } setGuestList={ setGuestList } guestList={ guestList } guestFilter={ guestFilter } guestSorted={ guestSorted } guestSortedBy={ guestSortedBy } bridalParty={ bridalParty }/> : "" }
              { guestList.length > 0 && listType === "Dietry list" ? <DietryList wedding={ wedding } onChangeGuests={ onChangeGuests } setGuestList={ setGuestList } guestList={ guestList } guestFilter={ guestFilter } guestSorted={ guestSorted } guestSortedBy={ guestSortedBy } bridalParty={ bridalParty }/> : "" }
               
            </div>

        </div>
    
       
    )
    
}