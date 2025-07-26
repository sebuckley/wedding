import React, { useState } from "react";
import '../Dashboard.css';
import Login from '../../Login/Login';
import Loading from '../../PublicSite/Components/loading/loading';
import Header from '../../Wigits/Header/header';
import { saveBridalParty } from "../../Wigits/dataFunctions-bridalParty";
import BridalPerson from "./person";
import WeddingPlans from "./wedding";


export default function Details(props){
  
    const user = props.user;
    const setUser = props.setUser;
    const loading = props.loading;
    const setLoading = props.setLoading;
    const loggedIn = props.loggedIn;
    const setLoggedin = props.setLoggedin;
    let bridalParty = props.bridalParty;
    const setBridalParty = props.setBridalParty;
    const [listUpdated, setListUpdated] = useState(0);

    const emptyDetails = {

      firstName: "",
      surname: "",
      weddingDate: "",
      email: "",
      gender: "",
      role: "",
      firstName2: "",
      surname2: "",
      email2: "",
      gender2: "",
      role2: "",

    }
    

    const handleChange = (e) => {

      const { name, value } = e.target;
      const className = e.target.className;

      console.log("Change detected:", name, value, className);

      const split = className.split(" ");
      const createName = split[split.length - 1];

      if (!(createName in bridalParty)) {

        bridalParty[createName] = {};

      }

      bridalParty[createName][name] = value;

      if(name === "weddingStyle" && value !== "Religious Ceremony"){

        bridalParty[createName]["religiousType"] = "Humanist";

      }
   
      setBridalParty(bridalParty);
      saveBridalParty(bridalParty);
      setListUpdated(listUpdated + 1);

    };

    const handleSubmit = (e) => {

      e.preventDefault();
      console.log("Form submitted:", bridalParty);
      // Add your submission logic here (e.g., API call)

    };

    const getRoles = () => {

        return (

          <>
           <optgroup label="🌍 Western">
              <option value="Bride">Bride</option>
              <option value="Groom">Groom</option>
            </optgroup>

            <optgroup label="🇮🇳 Hindi / Indian">
              <option value="Dulhan">Dulhan</option>
              <option value="Dulha">Dulha</option>
            </optgroup>

            <optgroup label="🇨🇳 Chinese">
              <option value="Xīnniáng">Xīnniáng</option>
              <option value="Xīnláng">Xīnláng</option>
            </optgroup>

            <optgroup label="🇯🇵 Japanese">
              <option value="Hanayome">Hanayome</option>
              <option value="Hanamuko">Hanamuko</option>
            </optgroup>

            <optgroup label="🇰🇷 Korean">
              <option value="Shinbu">Shinbu</option>
              <option value="Shinlang">Shinlang</option>
            </optgroup>

            <optgroup label="🇷🇺 Russian / Slavic">
              <option value="Nevesta">Nevesta</option>
              <option value="Zhenikh">Zhenikh</option>
            </optgroup>

            <optgroup label="🇸🇦 Arabic">
              <option value="Aroos">Aroos</option>
              <option value="Arees">Arees</option>
            </optgroup>

            <optgroup label="🇫🇷 French">
              <option value="Mariée">Mariée</option>
              <option value="Marié">Marié</option>
            </optgroup>

            <optgroup label="🇪🇸 Spanish">
              <option value="Novia">Novia</option>
              <option value="Novio">Novio</option>
            </optgroup>

            <optgroup label="🇹🇷 Turkish">
              <option value="Gelin">Gelin</option>
              <option value="Damat">Damat</option>
            </optgroup>

            <optgroup label="🇮🇱 Hebrew">
              <option value="Kalah">Kalah</option>
              <option value="Chatan">Chatan</option>
            </optgroup>

        </>
        )

    }

    const getColor = (role) => {

        let color;

        if(role === ""){

            color = { color: "var(--grey)"}

        }else{

            color = { color: "var(--black)"}

        }

        return color;

    }

    // const getChangeEnter = (e) => {

    //   if(e.target.value === ""){

    //     e.target.type = 'date';
      
    //   }

    // }

    // const getChangeExit = (e) => {

    //   if(e.target.value === ""){

    //     e.target.type = 'text';
      
    //   }
      
    // }

    const getName = (num) => {

      let text;

      if(num === 1){
        
        text= "Partner 1";

        if(bridalParty["first"].fName !== "" && bridalParty["first"].lName !== ""){

          text = bridalParty["first"].fName + " " + bridalParty["first"].lName;

        }

      }else{

        text= "Partner 2";
        
        if(bridalParty["second"].fName !== "" && bridalParty["second"].lName !== ""){

          text = bridalParty["second"].fName + " " + bridalParty["second"].lName;

        }


      }

      return text;

    }

    const clearNewForm = () => {

      const checkAction = window.confirm("Are you sure you want to clear the form?");

        if (checkAction === true) {
            
            clearForm();
            clearState();

        } 

    }

    const clearState = () => {

        console.log(emptyDetails);

    }

    const clearForm = () => {

        const getForm = document.getElementById("detailsForm");

        for( let i = 0; i < getForm.length; i++){

            getForm[i].value = "";

        }

        // localStorage.removeItem('newTask');

    }

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

          <form
            onSubmit={handleSubmit}
            id="detailsForm"
            className="detailsForm"
          >
            
          
            <BridalPerson 
              handleChange={ handleChange } 
              getRoles={ getRoles } 
              selection={ "first" } 
              getName={ getName } 
              bridalParty={ bridalParty } 
              getColor={ getColor } 
            />

            <BridalPerson 
              handleChange={ handleChange } 
              getRoles={ getRoles } 
              selection={ "second" } 
              getName={ getName } 
              bridalParty={ bridalParty } 
              getColor={ getColor } 
            />

            <WeddingPlans 
              handleChange={ handleChange } 
              getRoles={ getRoles } 
              getName={ getName } 
              bridalParty={ bridalParty } 
              getColor={ getColor } 
              setBridalParty = { setBridalParty }
              saveBridalParty = { saveBridalParty }
              setListUpdated = { setListUpdated }
              updated = { listUpdated }

            />
          
            <button type="submit" className="className='button primary">Save</button>
            <button type='button' onClick={ clearNewForm } id='clearBtn' className='button secondary'>Clear form</button>

          </form>

        </div>

      </div>
       
    )
    
}


