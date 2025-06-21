import './Dashboard.css';
import Login from '../Login/Login';
import ListItemsJSON from '../Wigits/listJSON';

import Header from '../Wigits/Header/header';

export default function Details(props){
  
    const { token, setToken } = props.useToken();
    const bridalParty = props.bridalParty;
    const wedding = props.wedding;
    const weddingVenue = props.weddingVenue;

    if(!token) {
  
      return <Login setToken={ setToken } bridalParty={ bridalParty } />
  
    }

    return(

      <div>

        <Header fName={bridalParty.groom.fName} sName={bridalParty.bride.fName}/>

        <div className="adminBody">

          <div className="weddingDetails">

            <h2>Wedding Details</h2>
            <ListItemsJSON data={ wedding }/>

          </div>

          <div className="weddingDetails">

            <h2>Wedding Venue Details</h2>
            <ListItemsJSON data={ weddingVenue }/>

          </div>

        </div>

      </div>
       
    )
    
}