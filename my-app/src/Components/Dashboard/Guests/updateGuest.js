import '../Dashboard.css';
import { useState, useEffect } from 'react';
import { getGuestIndex, saveGuestList, saveGuestListItem, saveGuestListItemGuest, deleteGuestListItem } from '../../Wigits/dataFunctions-guestList';
import AddGuestDetails from './addGuestDetails';
import DietSection from '../../PublicSite/Components/rsvp/dietrysection';
import dietry from '../../PublicSite/Components/Data/dietry';
import { roles } from '../../App/mainData';
import WeddingClothingForm from './clothing';
import GenderDropdown from '../../Wigits/genderDropdown';
import { weddingClothingSizes } from '../../App/wedding_clothing_sizes_schema_with_gender';
import Email, { checkValidEmail } from '../../Wigits/contact/email';
import Phone, { checkValidPhone } from '../../Wigits/contact/phone';
// import { parsePhoneNumberFromString, isPossiblePhoneNumber, isValidPhoneNumber, validatePhoneNumberLength } from 'libphonenumber-js';

export default function UpdateGuest(props){

    const personIDParam =  props.personIDParam;
    const loading = props.loading;
    const setLoading = props.setLoading;

    const guestList = props.guestList;
    const setGuestList = props.setGuestList;
    const bridalParty = props.bridalParty;
    const user = props.user;

    const getGuestData = props.getGuestData;
 
    const [personID, setPersonID] = useState('');
    const [firstName, setFirstName] = useState('');
    const [surname, setSurname] = useState('');
    const [gender, setGender] = useState('')
    const [role, setRole] = useState('');
    const [guestType, setguestType] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');
    const [road, setRoad] = useState('');
    const [town, setTown] = useState('');
    const [postCode1, setPostCode1] = useState('');
    const [postCode2, setPostCode2] = useState('');
    const [rsvp, setRSVP] = useState('');
    const [maxGuests, setMaxGuests] = useState(0);
    const [additionalGuests, setAdditionalGuests] = useState([]);
    const [additionalGuestsState, setAdditionalGuestsState] = useState(false);
    const [noAdditionalGuests, setNoAdditionalGuests] = useState('');
    const [checkAdditionalGuestsSet, setCheckAdditionalGuestsSet] = useState(false);
    const [additionalGuestsSet, setAdditionalGuestsSet] = useState(false);
    const [valueDiet, setValueDiet] = useState('');
    const [valueAllergies, setValueAllergies] = useState('');
    const [dietComments, setDietComments] = useState('');
    const [UUID, setUUID] = useState('');
    const [updated, setUpdated] = useState(0);
    const [empty, setEmpty] = useState(0);
    const getRoles = props.getRoles;
    let validEmail = checkValidEmail(email);
    let validPhone = checkValidPhone(mobile);

    const disableItem = user ? false : true;

    if(personID === ""){

        setPersonID(personIDParam);

    }

    const getPersonData = (personID) => {
    
        if(guestList !== null){

            if(typeof guestList.list[index]["firstName"] !== 'undefined'){

                setFirstName(guestList.list[index]["firstName"]);

            }

            if(typeof guestList.list[index]["surname"] !== 'undefined'){

                setSurname(guestList.list[index]["surname"]);

            }

             if(typeof guestList.list[index]["gender"] !== 'undefined'){

                setGender(guestList.list[index]["gender"]);

            }

            if(typeof guestList.list[index]["role"] !== 'undefined'){

                setRole(guestList.list[index]["role"]);

            }

            if(typeof guestList.list[index]["guestType"] !== 'undefined'){

                setguestType(guestList.list[index]["guestType"]);

            }

            if(typeof guestList.list[index]["email"] !== 'undefined'){

                setEmail(guestList.list[index]["email"]);
               
               
            }

            if(typeof guestList.list[index]["mobile"] !== 'undefined'){

                setMobile(guestList.list[index]["mobile"]);
               

            }

            if(typeof guestList.list[index]["number"] !== 'undefined'){

                setNumber(guestList.list[index]["number"]);

            }

            if(typeof guestList.list[index]["roadName"] !== 'undefined'){

                setRoad(guestList.list[index]["roadName"]);

            }

            if(typeof guestList.list[index]["town"] !== 'undefined'){

                setTown(guestList.list[index]["town"]);

            }

            if(typeof guestList.list[index]["post-code-1"] !== 'undefined'){

                setPostCode1(guestList.list[index]["post-code-1"]);

            }

            if(typeof guestList.list[index]["post-code-2"] !== 'undefined'){

                setPostCode2(guestList.list[index]["post-code-2"]);

            }

            if(typeof guestList.list[index]["maxGuests"] !== 'undefined'){

                setMaxGuests(guestList.list[index]["maxGuests"]);

            }

            if(typeof guestList.list[index]["UUID"] !== 'undefined'){

                setUUID(guestList.list[index]["UUID"]);

            }

            if(typeof guestList.list[index]["rsvp"] !== 'undefined'){

                setRSVP(guestList.list[index]["rsvp"]);

            }

            if(typeof guestList.list[index]["additionalGuestsNo"] !== 'undefined'){

                setNoAdditionalGuests(guestList.list[index]["additionalGuestsNo"]);

            }

            if(typeof guestList.list[index]["diet"] !== 'undefined'){

                setValueDiet(guestList.list[index]["diet"]);

            }

            if(typeof guestList.list[index]["allergies"] !== 'undefined'){

                setValueAllergies(guestList.list[index]["allergies"]);

            }

             if(typeof guestList.list[index]["commentsDietry"] !== 'undefined'){

                setDietComments(guestList.list[index]["commentsDietry"]);

            }

        }

        setLoading(false);
        
    }

    useEffect(() => {

        setLoading(true);
        getPersonData(personID);

    }, [ getPersonData, personID ]);

    const index = getGuestIndex(guestList, personIDParam);

    if(!checkAdditionalGuestsSet){

        setAdditionalGuestsSet(guestList.list[index]?.additionalGuestsSet);
        setCheckAdditionalGuestsSet(true);

    }

    if(additionalGuests.length === 0 && checkAdditionalGuestsSet === true && noAdditionalGuests > 0 && additionalGuestsState === false){

        // Create a fresh array (don't reuse the reference) and include commentsDietry if present
        let newArray = [];

        for(let i = 0; i < noAdditionalGuests; i++){

            let checkExists = guestList.list[index].additionalGuests[i];
            let object = {};

            if(typeof checkExists !== "undefined"){

                object["firstName"] = guestList.list[index].additionalGuests[i].firstName;
                object["surname"] = guestList.list[index].additionalGuests[i].surname;
                object["guestType"] = guestList.list[index].additionalGuests[i].guestType;
                object["role"] = guestList.list[index].additionalGuests[i].role;
                object["diet"] = guestList.list[index].additionalGuests[i].diet;
                object["allergies"] = guestList.list[index].additionalGuests[i].allergies;
                object["commentsDietry"] = guestList.list[index].additionalGuests[i].commentsDietry || "";

            }else{

                object["firstName"] = "";
                object["surname"] = "";
                object["guestType"] = "";
                object["role"] = "Guest";
                object["diet"] = "";
                object["allergies"] = "";
                object["commentsDietry"] = "";

            }

            newArray.push(object);

        }

        setAdditionalGuests(newArray);
        setAdditionalGuestsState(true);
        guestList.list[index].additionalGuests = newArray;
        saveGuestList(guestList);

    }

    const onInputMainGuest = (e) =>{

        const itemName = e.target.getAttribute("name");
        const itemValue = e.target.value;
        const updateList = { ...guestList };
        updateList.list[index][itemName] = itemValue;

        if(itemName === "firstName"){

            setFirstName(itemValue);

        }

        setGuestList(updateList);
        saveGuestListItem(guestList, index, itemName, itemValue);
        checkEmpty(e.target);

    }

    const onInputGuests = (e) =>{

        const itemName = e.target.getAttribute("name");
        const itemValue = e.target.value;
        const className = e.target.className.split(" ");
        const guestIndex = parseInt(className[className.length - 1], 10);

        // Persist to storage
        saveGuestListItemGuest(guestList, index, guestIndex, itemName, itemValue);

        // Update component state immutably for the specific guest object
        let currentList = [ ...additionalGuests ];
        let guestObj = { ...(currentList[guestIndex] || {}) };
        guestObj[itemName] = itemValue;
        currentList[guestIndex] = guestObj;
        setAdditionalGuests(currentList);
        setUpdated(updated + 1);

    }

    const onChangeOptionGuest = (e) => {

        const itemName = e.target.getAttribute("name");
        const itemValue = e.target.value.trim();
        const className = e.target.className.split(" ");
         const guestIndex = parseInt(className[className.length - 1], 10);

         // Persist to storage
        saveGuestListItemGuest(guestList, index, guestIndex, itemName, itemValue);
      
        // Update component state immutably for the specific guest object
        let currentList = [ ...additionalGuests ];
        let guestObj = { ...(currentList[guestIndex] || {}) };
        guestObj[itemName] = itemValue;
        currentList[guestIndex] = guestObj;
        setAdditionalGuests(currentList);
        setUpdated(updated + 1);

        if(itemName === "diet"){

            e.target.style.color = "black";

        }

        if(itemName === "allergies"){

            e.target.style.color = "black";
            
        }

    }

    const deleteListItem = (event) => {

        const checkAction = window.confirm("Are you sure you want to delete the guest?");

        if(checkAction){

            event.preventDefault();

            const data = deleteGuestListItem(guestList, index);

            setGuestList(data);

            const reDirectString = "/wedding/#/managemywedding/guests";

            window.location.replace(reDirectString);

        }

        
     
    }

    const getColor = (value) => {

        let color;

        if(value === "" || value === "Not confirmed"){

            color = { color: "var(--grey)" }
           
        }else{

            color = { color: "var(--black)" }

        }

        return color;

    }

    const addGuest = (event) => {

        const addGuests = parseInt(event.target.value);
        const currentList = guestList.list[index].additionalGuests;
        const currentListState = guestList.list[index].additionalGuestsSet;
        setNoAdditionalGuests(addGuests);
        saveGuestListItem(guestList, index, "additionalGuestsNo", addGuests);
           
        if(currentListState === false || additionalGuestsSet === false){

            saveGuestListItem(guestList, index, "additionalGuestsSet", true);
            setAdditionalGuestsSet(true);
         
        }
       
    }

    const onChangeOption = (e) => {

        const itemName = e.target.getAttribute("name");
        const itemValue = e.target.value.trim();
        const updateList = { ...guestList };
        updateList.list[index][itemName] = itemValue;

        setGuestList(updateList);
        saveGuestListItem(guestList, index, itemName, itemValue);

        if(itemName === "rsvp"){

            setRSVP(itemValue);
            

        }



        if(itemName === "role"){

            setRole(itemValue);
            
        }

        if(itemName === "guestType"){

            setguestType(itemValue);
            
        }

        if(itemName === "diet"){

            setValueDiet(itemValue);
            e.target.style.color = "black";

        }

        if(itemName === "allergies"){

            setValueAllergies(itemValue);
            e.target.style.color = "black";
            
        }

        if(itemName === "gender"){

            setGender(itemValue);
            e.target.style.color = "black";

        }

        getGuestData(guestList); // Refresh guest data after RSVP change

    }

 

    const createAddList = (number) => {

        let options = [];

        for(let i = 0; i <= number; i++){

            if(i === 0){

                options.push(<option value={i} key={i}>I won't be brining a guest</option>);

            }else{

                let addS = i > 1 ? "s": "";
                let str = "I will be bringing " + i + " guest" + addS;

                options.push(<option value={i} key={i}>{ str }</option>);

            }

            
        }

        // console.log(options);

        return options;

    }

    const getClassNameAdd = (number) => {

        return "fa-solid fa-" + number +" icon";

    }

    const additionalGuestsOption = () => {

        let maxGuests = guestList.list[index]?.maxGuests || 0;
        let iconNumber;
        let selectValue;

        if(maxGuests === "" || isNaN(maxGuests) || parseInt(maxGuests) <= 0){

            return;

        }

        if(guestList.list[index].additionalGuestsSet === false){

            iconNumber = guestList.list[index].maxGuests;
            selectValue = "";

        }else{

            iconNumber = guestList.list[index].additionalGuestsNo;
            selectValue = noAdditionalGuests;

        }

        return  (

            <div className='row' key={ iconNumber }>

                        <div className='inputGroup col-12'>

                            <div>
                            
                                <i className={getClassNameAdd( iconNumber )}></i>
                                <select className='checkMain guestAdd'  name='guestAdd' style={ getColor(selectValue) } onChange={ addGuest } value={ selectValue } disabled={ disableItem }>
                                    <option value="" hidden className="noOption">please confirm additional guests...</option>
                                    { createAddList( maxGuests ) }
                                </select>

                            </div>
            
                        </div>

            </div>

            
        )

    }

    const listAdditionalGuests = (ListGuests) => {

        let newList = [];;

        for(let i =0; i < ListGuests; i++){

            newList.push(<AddGuestDetails guestNumber={i} additionalGuests={ additionalGuests }  onInputGuests={ onInputGuests } onChangeOptionGuest={ onChangeOptionGuest } getColor={ getColor } roles={ roles } getRoles={ getRoles } disableItem={ disableItem }/>);

        }

        return newList;

    }

    const getRSVPClassName = (rsvp) => {

        let className; 

        if(rsvp === "Confirmed"){

            className = "fa-solid fa-circle-check icon";

        }else if(rsvp === "Declined"){

            className = "fa-solid fa-circle-xmark icon";

        }else{

            className = "fa-solid fa-circle-minus icon";

        }

        return className;

    }

    const returnLinks = () =>{

        return (
  
            <div className='col-6 topLinks'> 

                <div>{ mobile !== "" && validPhone ? <Phone updateFunction={ onInputMainGuest } value={ mobile } type="icon" numberType={ "mobile" }/> : "" }</div>
                <div>{ email !== "" && validEmail ? <Email updateFunction={ onInputMainGuest } value={ email } type="icon" /> : "" }</div>

                <div>
                    <button className="deleteButton" onClick={ deleteListItem } >Delete</button>
                    <div style={{display:"none"}}>{ UUID }</div>
                </div>

            </div>

        )

    }

     const getTitle = (type) => {

        let title;
        let text = firstName + " " + surname + " details";
        let emptyText;

        if(empty === 0){

            emptyText = "[completed]";

        }else{

            emptyText = "[" + empty + " incomplete]";
        }

        title = text + " " + emptyText;

        return title;

    }

    const checkEmpty = (item) => {
    
        const items = document.getElementsByClassName(item);

        let empty = 0;

        for(let i=0; i< items.length; i++){

            let value = items[i].value;
            
            if(value === "" || value === "Not confirmed"){

                empty += 1;
                items[i].style.borderColor = "red";

            }else{

                items[i].style.borderColor = "var(--grey)";

            }

        }

        setEmpty(empty);

    }

    useEffect(() => {

        checkEmpty("checkMain");

    });

    return(

        <div className='contentWrapper'>

            <section id="updateGuestSection">

                <div className='row two'>
                    
                    <div className={ disableItem ? "col-12": "col-6" }>

                        <h2>

                        { getTitle()  }

                        </h2>

                    </div>
            
                    { disableItem ? "": returnLinks() }

                </div>
                    
                <form id='inputForm'>

                    <div className='row two'>

                        <div className='inputGroup col-6'>
                            <i className="fa fa-user icon"></i>
                            <input type='text' className='checkMain inputBox' onChange={ onInputMainGuest } name='firstName' placeholder='first name' value={ guestList.list[index].firstName }></input>
                        </div>
                        <div className='inputGroup col-6'>
                            <i className="fa fa-user icon"></i>
                            <input type='text' className='checkMain inputBox' onChange={ onInputMainGuest } name='surname' placeholder='surname' value={ guestList.list[index].surname }></input>
                        </div>

                    </div>

                    <GenderDropdown getColor={ getColor } guestList={ guestList } index={ index } value={ gender } onChange={ onChangeOption }/>

                    {/* Role Section */}
                    <div className='row'>

                        <div className='inputGroup col-12'>

                            <i className="fa-solid fa-person-circle-question icon"></i>
                            <select className='checkMain guestType' style={ getColor(role) } name='role'  onChange={ onChangeOption } value={ guestList.list[index].role } disabled={ disableItem }>
                                <option value="" hidden className="noOption">please select role...</option>
                                <option>Guest</option>
                                { getRoles(roles) }

                            </select>
                        
                        </div>

                    </div>

                    <div className='row'>

                        <div className='inputGroup col-12'>

                            <i className="fa-solid fa-circle-info icon"></i>

                            <select className='checkMain guestType'  name='guestType' style={ getColor(guestType) } onChange={ onChangeOption } value={ guestList.list[index].guestType } disabled={ disableItem }> 
                                <option value="" hidden className="noOption">please select age category...</option>
                                <option>Over 18</option>
                                <option>Under 18</option>
                                <option>Under 5</option>
                            </select>
                        
                        </div>

                    </div>

                    {/* Email Section */}
                    <Email updateFunction={ onInputMainGuest } value={ guestList.list[index].email } type="input" class='checkMain inputBox checkIcon'/>
                   
                    {/* Mobile Section */}
                    <Phone updateFunction={ onInputMainGuest } value={ guestList.list[index].mobile } type="input" numberType={ "mobile" } lass='checkMain inputBox checkIcon'/>

                    {/* Address Section */}

                    <div className='row two'>

                        <div className='inputGroup col-4'>
                            <i className="fa-solid fa-house icon"></i>
                            <input type='text' className='inputBox' onChange={ onInputMainGuest}name='number' placeholder='house name/number' value={ guestList.list[index].number }></input>
                        </div>

                        <div className='inputGroup col-8'>
                            <i className="fa-solid fa-road icon"></i>
                            <input type='text' className='inputBox' onChange={ onInputMainGuest} name='roadName' placeholder='road name' value={ guestList.list[index].roadName }></input>
                        </div>

                    </div>

                    {/* Town Section */}
                    <div className='row'>

                        <div className='inputGroup col-12'>
                            <i className="fa-solid fa-location-pin icon"></i>
                            <input type='text' className='inputBox' onChange={ onInputMainGuest} name='town' placeholder='town' value={ guestList.list[index].town }></input>
                        </div>

                    </div>

                    {/* Post code Section */}
                    <div className='row two'>

                        <div className='inputGroup col-2'>
                            <i className="fa-solid fa-signs-post icon"></i>
                            <input type='text' className='inputBox' onChange={ onInputMainGuest} name='postCode1' placeholder='post (xxxx)' maxLength='4' value={ guestList.list[index].postCode1 }></input>
                        </div>
                        <div className='inputGroup col-3'>
                            <i className="fa-solid fa-signs-post icon"></i>
                            <input type='text' className='inputBox' onChange={ onInputMainGuest} name='postCode2' placeholder='code (xxx)' maxLength='3' value={ guestList.list[index].postCode2 }></input>
                        </div>

                    </div>

                    {/* Max guests Section */}
                    <div className='row'>

                        <div className='inputGroup col-12'>
                        <i className="fa-solid fa-person-circle-plus icon"></i>
                        <input type='text' className='checkMain inputBox' onChange={ onInputMainGuest } name='maxGuests' placeholder='set the max number of guests' value={ guestList.list[index].maxGuests } disabled={ disableItem }></input>

                        </div>

                    </div>

                    {/* Select additional guests Section */}
                    { additionalGuestsOption() }

                  

                    {/* RSVP Section */}
                    <div className='row'>

                        <div className='inputGroup col-12'>
                            <i className={getRSVPClassName(rsvp)}></i>
                            <select className="checkMain rsvp" name="rsvp" onChange={ onChangeOption } style={ getColor(rsvp) } value={ guestList.list[index].rsvp }>
                                <option>Not confirmed</option>
                                <option>Confirmed</option>
                                <option>Declined</option>
                            </select>
                        </div>

                    </div>


                    { rsvp === "Confirmed" ? <DietSection diet={ dietry.dietry.diet } 
                                                          allergies={ dietry.dietry.allergies } 
                                                          showGuest={ "" } hideGuest={ "" } 
                                                          onChange={ onChangeOption }
                                                          onInput={ onInputMainGuest }
                                                          valueDiet={ guestList.list[index].diet } 
                                                          valueAllergies={ guestList.list[index].allergies } 
                                                          disableItem={ disableItem } 
                                                          name={ firstName + " " + surname }
                                                          valueComments={ guestList.list[index].dietComments }
                                                          
                                             /> : ""}

                    { guestType !== "Guest" && rsvp === "Confirmed" && role !== "Guest" ?   <WeddingClothingForm 

                                                                                                gender={ gender } 
                                                                                                getColor={ getColor } 
                                                                                                sizeSystem={ bridalParty["weddingDetails"].sizeSystem } 
                                                                                                religiousType={ bridalParty["weddingDetails"].religiousType } 
                                                                                                guestList={ guestList } index={ index } 
                                                                                                checkEmpty={ checkEmpty } 
                                                                                                disableItem={ disableItem } 
                                                                                                name={ guestList.list[index].firstName + " " + guestList.list[index].surname } 
                                                                                                weddingClothingSizes={ weddingClothingSizes }

                                                                                            /> : ""}

                </form>

            </section>

            <section className="additionalGuests">

                { !additionalGuestsSet && noAdditionalGuests > 0  ? <p style={{"textAlign": "center"}}>Please confirm your additional guest.</p>: "" }
                { noAdditionalGuests === 0 && additionalGuestsSet ? <p style={{"textAlign": "center"}}>You have selected not to bring any additional guests with you.</p>: "" }
                { noAdditionalGuests > 0 ? listAdditionalGuests(noAdditionalGuests) : "" }

            </section>

        </div>

    )

}