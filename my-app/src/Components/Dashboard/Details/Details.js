import React, { useState, useEffect } from "react";
import '../Dashboard.css';
import Login from '../../Login/Login';
import Loading from '../../PublicSite/Components/loading/loading';
import Header from '../../Wigits/Header/header';
import { saveBridalParty } from "../../Wigits/dataFunctions-bridalParty";
import { uuidv4 } from "../../Wigits/dataFunctions";
import BridalPerson from "./person";
import WeddingPlans from "./wedding";
import BridalFilter from "./bridalFilter";

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
    const [weddingFilter, setWeddingFilter] = useState("Wedding Plans");
    const [formEmpty, setFormEmpty] = useState(0);
    const [countryEmpty, setCountryEmpty] = useState(0);
    const [styleEmpty, setStyleEmpty] = useState(0);
    const [colorEmpty, setColorEmpty] = useState(0);
    const [initialEmptyCheck, setEmptyInitialCheck] = useState(false)

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

      const name = e.target.name;
      const value = e.target.value;
      const className = e.target.className;

      // console.log("Change detected:", name, value, className);

      const split = className.split(" ");
      const createName = split[split.length - 1];

      if (!("UUID" in bridalParty[createName])) {

        bridalParty[createName]["UUID"] = uuidv4();

      }

      bridalParty[createName][name] = value;

      if(name === "weddingStyle" && value !== "Religious Ceremony"){

        bridalParty[createName]["religiousType"] = "Humanist";

      }
   
      setBridalParty(bridalParty);
      saveBridalParty(bridalParty);
      setListUpdated(listUpdated + 1);
      checkEmptyWedding();
      checkEmpty(e.target);

    };

   

    const checkEmptyWedding = () => {

        if(initialEmptyCheck === false){

          setEmptyInitialCheck(true);

        }

        const items = document.getElementsByClassName("checkDetails");

        let empty = 0;

        for(let i=0; i< items.length; i++){

            let value = items[i].value;

            console.log(value);
            
            if(value === ""){

                empty += 1;
                items[i].style.borderColor = "red";

            }

        }

        setFormEmpty(empty);
        checkEmptyCountry();
        checkEmptyStyle();
        checkEmptyColor();

    }

    const checkEmptyCountry = () => {

        const items = document.getElementsByClassName("countrySize");

        let empty = 0;

        for(let i=0; i< items.length; i++){

            let value = items[i].value;

            console.log(value);
            
            if(value === ""){

                empty += 1;
                items[i].style.borderColor = "red";

            }

        }

        setCountryEmpty(empty);

    }

    const checkEmptyStyle = () => {

        const items = document.getElementsByClassName("style");

        let empty = 0;

        for(let i=0; i< items.length; i++){

            let value = items[i].value;

            console.log(value);
            
            if(value === ""){

                empty += 1;
                items[i].style.borderColor = "red";

            }

        }

        setStyleEmpty(empty);

    }

    const checkEmptyColor = () => {

        const items = document.getElementsByClassName("color");

        let empty = 0;

        for(let i=0; i< items.length; i++){

            let value = items[i].value;

            console.log(value);
            
            if(value === ""){

                empty += 1;
                items[i].style.borderColor = "red";

            }

        }

        setColorEmpty(empty);

    }

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

        if(role === "" || typeof role === "undefined"){

            color = { color: "var(--grey)"}

        }else{

            color = { color: "var(--black)"}

        }

        return color;

    }

    const disableItem = user ? false : true;

    const checkEmpty = (item) => {

        if(item.value !== ""){

            console.log(item)

            if(item.tagName === "SELECT"){

                item.style.outline = "none";
                item.style.borderColor = "var(--grey)";

            }else{

                item.style.borderColor = "var(--grey)";

            }

            item.style.color  = "var(--black)";

        }

    }

    const getName = (num) => {

      let text;

      if(num === "first"){
        
        text = "Partner 1";

        if(bridalParty["first"].firstName !== "" && bridalParty["first"].firstName !== "Partner 1"){

          text = typeof bridalParty["first"].surname !== "undefiened" ?  bridalParty["first"].firstName + " " + bridalParty["first"].surname : bridalParty["first"].firstName;

        }

      }else{

        text = "Partner 2";
        
        if(bridalParty["second"].firstName !== ""  && bridalParty["first"].firstName !== "Partner 2"){

          text = typeof bridalParty["second"].surname !== "undefiened" ?  bridalParty["second"].firstName + " " + bridalParty["second"].surname : bridalParty["second"].firstName;

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

    useEffect(() => {

      if(initialEmptyCheck === false){
      
        checkEmptyWedding();

      }

    }, []);

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

          <BridalFilter setWeddingFilter={ setWeddingFilter } filterName={ weddingFilter } />


          <form
            onSubmit={handleSubmit}
            id="detailsForm"
            className="detailsForm"
          >
          
           { weddingFilter === "Partner 1" ? <BridalPerson 

                                                  handleChange={ handleChange } 
                                                  getRoles={ getRoles } 
                                                  selection={ "first" } 
                                                  getName={ getName } 
                                                  bridalParty={ bridalParty } 
                                                  getColor={ getColor } 
                                                  checkEmpty={ checkEmpty }
                                                  

                                                /> : ""

            }

            {
            
            weddingFilter === "Partner 2" ? <BridalPerson 

                                                handleChange={ handleChange } 
                                                getRoles={ getRoles } 
                                                selection={ "second" } 
                                                getName={ getName } 
                                                bridalParty={ bridalParty } 
                                                getColor={ getColor } 
                                                checkEmpty={ checkEmpty }

                                              /> : ""

            }

            {

            weddingFilter === "Wedding Plans" ? <WeddingPlans 

                                                      handleChange={ handleChange } 
                                                      getRoles={ getRoles } 
                                                      getName={ getName } 
                                                      bridalParty={ bridalParty } 
                                                      getColor={ getColor } 
                                                      setBridalParty = { setBridalParty }
                                                      saveBridalParty = { saveBridalParty }
                                                      setListUpdated = { setListUpdated }
                                                      updated = { listUpdated }
                                                      formEmpty={ formEmpty }
                                                      checkEmpty={ checkEmpty }
                                                      initialEmptyCheck={ initialEmptyCheck }
                                                      countryEmpty={ countryEmpty }
                                                      styleEmpty={ styleEmpty }
                                                      colorEmpty={ colorEmpty }

                                                    /> : ""

            }
          
            {/* <button type="submit" className="className='button primary">Save</button>
            <button type='button' onClick={ clearNewForm } id='clearBtn' className='button secondary'>Clear form</button> */}

          </form>

        </div>

      </div>
       
    )
    
}


