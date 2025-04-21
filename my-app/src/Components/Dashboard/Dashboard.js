import './Dashboard.css';
import Login from '../Login/Login';
import ListItems from '../PublicSite/Wigits/list';
import data from '../App/mainData';
import Header from '../PublicSite/Components/Header/header';

export default function Dashboard(props){
  
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


        </div>

      </div>
       
    )
    
}