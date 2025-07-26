import '../Dashboard.css';
import Login from '../../Login/Login';
import Header from '../../Wigits/Header/header';
import UpdateGuest from './updateGuest';
import Loading from '../../PublicSite/Components/loading/loading';
// import FamilyList from './familyList';
// import { useState } from 'react';


export default function Guest(props){
  
    const user = props.user;
    const setUser = props.setUser;
    const loading = props.loading;
    const setLoading = props.setLoading;
    const loggedIn = props.loggedIn;
    const setLoggedin = props.setLoggedin;

    const bridalParty = props.bridalParty;
    const guestList = props.guestList;
    const setGuestList = props.setGuestList;
    const getRoles = props.getRoles;

    const index = props.index;



    if(loading){
   
      return <Loading bridalParty={ bridalParty } user={ user }/>
   
    }

    if(user === null) {
  
      return <Login setUser={ setUser } loading={loading} setLoading={ setLoading } bridalParty={ bridalParty } />
  
    }


    return(

        <div>

            <Header fName={ bridalParty.first.fName } sName={ bridalParty.second.fName } displayPublic={ false } loggedIn={ loggedIn } setLoggedin={ setLoggedin }/>

            <div className="adminBody">
               
              <UpdateGuest  setGuestList={ setGuestList } guestList={ guestList } index={ index } getRoles={ getRoles } bridalParty={ bridalParty } />


            
              {/* <FamilyList listObject={ listObject } wedding={ wedding } checkExists={ checkExists }/> */}
               
            </div>

        </div>
    
       
    )
    
}