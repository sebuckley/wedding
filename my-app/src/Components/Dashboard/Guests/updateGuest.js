import '../Dashboard.css';
import { useState, useEffect } from 'react';
import { getGuestIndex, saveGuestList, saveGuestListItem, saveGuestListItemGuest, deleteGuestListItem } from '../../Wigits/dataFunctions-guestList';
import AddGuestDetails from './addGuestDetails';
import DietSection from '../../PublicSite/Components/rsvp/dietrysection';
import dietry from '../../PublicSite/Components/Data/dietry';
// import { parsePhoneNumberFromString, isPossiblePhoneNumber, isValidPhoneNumber, validatePhoneNumberLength } from 'libphonenumber-js';

export default function UpdateGuest(props){

    const personIDParam =  new URLSearchParams(window.location.search).get('personID');

    const guestList = props.guestList;
    const setGuestList = props.setGuestList;
 
    const [personID, setPersonID] = useState('');
    const [firstName, setFirstName] = useState('');
    const [surname, setSurname] = useState('');
    const [guestType, setguestType] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');
    const [road, setRoad] = useState('');
    const [town, setTown] = useState('');
    const [postCode1, setPostCode1] = useState('');
    const [postCode2, setPostCode2] = useState('');
    const [rsvp, setRSVP] = useState('');
    const [maxGuests, setMaxGuests] = useState('');
    const [additionalGuests, setAdditionalGuests] = useState([]);
    const [additionalGuestsState, setAdditionalGuestsState] = useState(false);
    const [noAdditionalGuests, setNoAdditionalGuests] = useState('');
    const [checkAdditionalGuestsSet, setCheckAdditionalGuestsSet] = useState(false);
    const [additionalGuestsSet, setAdditionalGuestsSet] = useState(false);
    const [valueDiet, setValueDiet] = useState('');
    const [valueAllergies, setValueAllergies] = useState('');
    const [UUID, setUUID] = useState('');
    const [updated, setUpdated] = useState(0);
    const [totalEmptyState, setTotalEmptyState] = useState(0);

    if(personID === ""){

        setPersonID(personIDParam);

    }

    const index = getGuestIndex(guestList, personIDParam);

    if(!checkAdditionalGuestsSet){

        setAdditionalGuestsSet(guestList.list[index].additionalGuestsSet);
        setCheckAdditionalGuestsSet(true);

    }

    if(additionalGuests.length === 0 && checkAdditionalGuestsSet === true && noAdditionalGuests > 0 && additionalGuestsState === false){

        let newArray = additionalGuests;

        for(let i = 0; i < noAdditionalGuests; i++){

            let checkExists = guestList.list[index].additionalGuests[i];
            let object = {};

            if(typeof checkExists !== "undefined"){

                object["firstName"] = guestList.list[index].additionalGuests[i].firstName;
                object["surname"] = guestList.list[index].additionalGuests[i].surname;
                object["guestType"] = guestList.list[index].additionalGuests[i].guestType;
                object["diet"] = guestList.list[index].additionalGuests[i].diet;
                object["allergies"] = guestList.list[index].additionalGuests[i].allergies;

            }else{

                object["firstName"] = "";
                object["surname"] = "";
                object["guestType"] = "";
                object["diet"] = "";
                object["allergies"] = "";

            }

            newArray.push(object);

        }

        setAdditionalGuests(newArray);
        setAdditionalGuestsState(true);
        guestList.list[index].additionalGuests = newArray;
        saveGuestList(guestList);

    }else if (additionalGuestsState === false && additionalGuests.length > 0){

        setAdditionalGuests(guestList.list[index].additionalGuests);

    }

    const checkPhone = (number) => {

        const char = number.length;
        let phoneNumber = number;
        let validNumber = false;
    
        if( isNaN(phoneNumber) === false && phoneNumber.length === 11){

            validNumber = true;

        }
        
        const getIcon = document.getElementsByClassName("phoneCheck")[0];

        // console.log(getIcon);

        if(validNumber){

            getIcon.style.color = "var(--green)";
            getIcon.className = "fa-solid fa-circle-check icon2 phoneCheck";

        }else if(char > 0){

            getIcon.style.color = "var(--red)";
            getIcon.className = "fa-solid fa-circle-xmark icon2 phoneCheck";

        }else{

            getIcon.style.color = "var(--grey)";
            getIcon.className = "fa-solid fa-circle-minus icon2 phoneCheck";

        }

    }

    const checkEmail = (email) => {

        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const char = email.length;
        const regexResult = regex.test(email);

        const getIcon = document.getElementsByClassName("emailCheck")[0];

        if(regexResult){

            getIcon.style.color = "var(--green)";
            getIcon.className = "fa-solid fa-circle-check icon2 emailCheck";

        }else if(char > 0){

            getIcon.style.color = "var(--red)";
            getIcon.className = "fa-solid fa-circle-xmark icon2 emailCheck";

        }else{

            getIcon.style.color = "var(--grey)";
            getIcon.className = "fa-solid fa-circle-minus icon2 emailCheck";

        }

    }

    const onInputMainGuest = (e) =>{

        const itemName = e.target.getAttribute("name");
        const itemValue = e.target.value.trim();

        if(itemName === "email"){

            checkEmail(itemValue);

        }

        if(itemName === "mobile"){

            checkPhone(itemValue);

        }

        saveGuestListItem(guestList, index, itemName, itemValue);
        checkEmpty(e.target);

    }

    const onInputGuests = (e) =>{

        const itemName = e.target.getAttribute("name");
        const itemValue = e.target.value.trim();
        const className = e.target.className.split(" ");
        const guestIndex = className[className.length - 1];

        saveGuestListItemGuest(guestList, index, guestIndex, itemName, itemValue);

        let currentList = additionalGuests;
        currentList[itemName] = itemValue;
        setAdditionalGuests(currentList);
        setUpdated(updated + 1);

    }

    const getPersonData = (personID) => {

        if(guestList !== null){

            if(typeof guestList.list[index]["firstName"] !== 'undefined'){

                setFirstName(guestList.list[index]["firstName"]);

            }

            if(typeof guestList.list[index]["surname"] !== 'undefined'){

                setSurname(guestList.list[index]["surname"]);

            }

            if(typeof guestList.list[index]["guestType"] !== 'undefined'){

                setguestType(guestList.list[index]["guestType"]);

            }

            if(typeof guestList.list[index]["email"] !== 'undefined'){

                setEmail(guestList.list[index]["email"]);
                checkEmail(guestList.list[index]["email"])

            }

            if(typeof guestList.list[index]["mobile"] !== 'undefined'){

                setMobile(guestList.list[index]["mobile"]);
                checkPhone(guestList.list[index]["mobile"])

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

        }
    }

    const deleteListItem = (event) => {

        const checkAction = window.confirm("Are you sure you want to delete the guest?");

        if(checkAction){

            event.preventDefault();

            const data = deleteGuestListItem(guestList, index);

            setGuestList(data);

            const reDirectString = "/managemywedding/guests";

            window.location.replace(reDirectString);

        }

        
     
    }

    const getColor = (value) => {

        let color;

        if(value === "" || value === "Not confirmed"){

            color = { color: "var(--grey)"}

        }else{

            color = { color: "var(--black)"}

        }

        return color;

    }

    const checkEmpty = (item) => {


        if(item.value !== ""){

            if(item.tagName === "SELECT"){

                item.style.outline = "none";

            }else{

                item.style.borderColor = "var(--grey)";

            }

            item.style.color  = "var(--black)";

        }

    }

    useEffect(() => {

        getPersonData(personID);

    }, [ getPersonData, personID ]);

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

        saveGuestListItem(guestList, index, itemName, itemValue);

        if(itemName === "rsvp"){

            setRSVP(itemValue);

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



    }

    const onChangeOptionGuest = (e) => {

        const itemName = e.target.getAttribute("name");
        const itemValue = e.target.value.trim();
        const className = e.target.className.split(" ");
        const guestIndex = className[className.length - 1];


        saveGuestListItemGuest(guestList, index, guestIndex, itemName, itemValue);

        let currentList = additionalGuests;
        currentList[itemName] = itemValue;
        setAdditionalGuests(currentList);
        setUpdated(updated + 1);

        if(itemName === "diet"){

            e.target.style.color = "black";

        }

        if(itemName === "allergies"){

            e.target.style.color = "black";
            
        }

    }

    const createAddList = (number) => {

        let options = [];

        for(let i = 0; i <= number; i++){

            if(i === 0){

                options.push(<option value={i}>I won't be brining a guest</option>);

            }else{

                let addS = i > 1 ? "s": "";
                let str = "I will be bringing " + i + " guest" + addS;

                options.push(<option value={i}>{ str }</option>);

            }

            
        }

        // console.log(options);

        return options;

    }

    const getClassNameAdd = (number) => {

        return "fa-solid fa-" + number +" icon";

    }

    const additionalGuestsOption = () => {

        let maxGuests = guestList.list[index].maxGuests;
        let iconNumber;
        let selectValue;

        if(guestList.list[index].additionalGuestsSet === false){

            iconNumber = guestList.list[index].maxGuests;
            selectValue = "";

        }else{

            iconNumber = guestList.list[index].additionalGuestsNo;
            selectValue = noAdditionalGuests;

        }

        return  (

            <div>
            
                <i className={getClassNameAdd( iconNumber )}></i>
                <select className='guestAdd'  name='guestAdd' style={ getColor(selectValue) } onChange={ addGuest } value={ selectValue }>
                    <option value="" hidden className="noOption">please confirm additional guests...</option>
                    { createAddList( maxGuests ) }
                </select>

            </div>

            
        )

    }

    const listAdditionalGuests = (ListGuests) => {

        let newList = [];;

        for(let i =0; i < ListGuests; i++){

            newList.push(<AddGuestDetails guestNumber={i} additionalGuests={ additionalGuests }  onInputGuests={ onInputGuests } onChangeOptionGuest={ onChangeOptionGuest } getColor={ getColor }/>);

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

    const checkEmptyFields = () => {

        const allowedEmpty = ["mobile", "number", "roadName", "town", "post-code-1", "post-code-2"];
        const inputs = document.getElementsByTagName("input");
        const selects = document.getElementsByTagName("select");

        const checkInputs = checkFields(inputs, allowedEmpty);
        const checkSelects = checkFields(selects, allowedEmpty);

        const totalEmpty = checkInputs + checkSelects;

        if(totalEmptyState !== totalEmpty){

            setTotalEmptyState(totalEmpty);
            
        }

        let returnText;

        if(totalEmpty === 0){

            returnText = " (completed)";

        }else{

            returnText = " (" + totalEmpty + " required fields)";

        }

        return returnText;

    }

    const checkFields = (fields, allowedEmpty) => {

        let count = 0;

        for(let i=0; i < fields.length; i++){

            let fieldName = fields[i].getAttribute('name');
            let fieldValue;

            if(fields[i].tagName === "SELECT"){

                fieldValue = fields[i].value;

            }else{

                fieldValue = fields[i].defaultValue;

                if(fieldValue === ""){

                    fieldValue = fields[i].value;
                
                }

            }

          

            if(fields[i].tagName === "SELECT"){

                fields[i].style.border = "1px solid var(--grey)";

            }else{
            
                fields[i].style.borderColor = "var(--grey)";

            }   

            if(allowedEmpty.includes(fieldName) === false){

                if(fieldValue === "" || fieldValue === "Not confirmed"){

                    count += 1;

                    if(fields[i].tagName === "SELECT"){

                        fields[i].style.border = " 1px solid red";
                    

                    }else{

                        fields[i].style.borderColor = "red";

                    }
                    
                    
                }

            }

        }

        return count;

    }


    return(

        <div className='contentWrapper'>

            <section id="updateGuestSection">

                <h2>{ firstName + " " + surname}

                    { maxGuests > 0 && additionalGuestsSet === false ? " " + checkEmptyFields() : "" }

                    { noAdditionalGuests > 0 && additionalGuestsSet === true ? checkEmptyFields() : "" }

                </h2>

                <form id='inputForm'>

                    <div className='row two'>

                        <div className='inputGroup col-6'>
                            <i className="fa fa-user icon"></i>
                            <input type='text' className='inputBox' onInput={ onInputMainGuest } onChange={ e => setFirstName( e.target.value )} name='firstName' placeholder='first name' value={ firstName }></input>
                        </div>
                        <div className='inputGroup col-6'>
                            <i className="fa fa-user icon"></i>
                            <input type='text' className='inputBox' onInput={ onInputMainGuest }  onChange={ e => setSurname( e.target.value )} name='surname' placeholder='surname' value={ surname }></input>
                        </div>

                    </div>

                    <div className='row'>

                        <div className='inputGroup col-12'>

                            <i className="fa-solid fa-circle-info icon"></i>
                            <select className='guestType'  name='guestType' style={ getColor(guestType) } onChange={ onChangeOption } value={ guestType }>
                                <option value="" hidden className="noOption">please select age category...</option>
                                <option>Over 18</option>
                                <option>Under 18</option>
                                <option>Under 5</option>
                            </select>
                        
                        </div>

                    </div>

                    <div className='row'>

                        <div className='inputGroup col-12'>

                            <i className="fa-solid fa-envelope icon"></i>
                        
                            <input type='email' className='inputBox checkIcon' onInput={ onInputMainGuest } onChange={ e => setEmail( e.target.value )} name='email' placeholder='email' value={ email }></input>
                            <i className="fa-solid fa-circle-minus icon2 emailCheck"></i>
                        
                        </div>

                    </div>

                    <div className='row'>

                        <div className='inputGroup col-12'>
                            <i className="fa-solid fa-phone icon"></i>
                            <input type='text' className='inputBox checkIcon' onInput={ onInputMainGuest } onChange={ e => setMobile( e.target.value )} name='mobile' placeholder='mobile' value={ mobile }></input>
                            <i className="fa-solid fa-circle-minus icon2 phoneCheck"></i>
                        </div>

                    </div>

                    <div className='row two'>

                        <div className='inputGroup col-4'>
                            <i className="fa-solid fa-house icon"></i>
                            <input type='text' className='inputBox' onInput={ onInputMainGuest } onChange={ e => setNumber( e.target.value )} name='number' placeholder='house name/number' value={ number }></input>
                        </div>

                        <div className='inputGroup col-8'>
                            <i className="fa-solid fa-road icon"></i>
                            <input type='text' className='inputBox' onInput={ onInputMainGuest } onChange={ e => setRoad( e.target.value )} name='roadName' placeholder='road name' value={ road }></input>
                        </div>

                    </div>

                    <div className='row'>

                        <div className='inputGroup col-12'>
                            <i className="fa-solid fa-location-pin icon"></i>
                            <input type='text' className='inputBox' onInput={ onInputMainGuest } onChange={ e => setTown( e.target.value )} name='town' placeholder='town' value={ town }></input>
                        </div>

                    </div>


                    <div className='row two'>

                        <div className='inputGroup col-2'>
                            <i className="fa-solid fa-signs-post icon"></i>
                            <input type='text' className='inputBox' onInput={ onInputMainGuest } onChange={ e => setPostCode1( e.target.value )} name='post-code-1' placeholder='post' maxLength='4' value={ postCode1 }></input>
                        </div>
                        <div className='inputGroup col-3'>
                            <i className="fa-solid fa-signs-post icon"></i>
                            <input type='text' className='inputBox' onInput={ onInputMainGuest } onChange={ e => setPostCode2( e.target.value )} name='post-code-2' placeholder='code' maxLength='3' value={ postCode2 }></input>
                        </div>

                    </div>

                    <div className='row'>

                        <div className='inputGroup col-12'>
                        <i className="fa-solid fa-person-circle-plus icon"></i>
                        <input type='text' className='inputBox' onInput={ onInputMainGuest } onChange={ e => setMaxGuests( e.target.value )} name='maxGuests' placeholder='set the max number of guests' value={ maxGuests }></input>

                        </div>

                    </div>

                    <div className='row'>

                        <div className='inputGroup col-12'>

                        { additionalGuestsOption() }

                      </div>

                    </div>

                    <div className='row'>

                        <div className='inputGroup col-12'>
                            <i className={getRSVPClassName(rsvp)}></i>
                            <select className="rsvp" name="rsvp" onChange={ onChangeOption } style={ getColor(rsvp) } value={ rsvp }>
                                <option>Not confirmed</option>
                                <option>Confirmed</option>
                                <option>Declined</option>
                            </select>
                        </div>

                    </div>


                    { rsvp === "Confirmed" ? <DietSection diet={ dietry.dietry.diet } allergies={ dietry.dietry.allergies } showGuest={ "" } hideGuest={ "" } onChange={ onChangeOption } valueDiet={ valueDiet } valueAllergies={ valueAllergies }/> : ""}

                 

                    <div className='row'>
                        <div className='inputGroup col-12'>

                            <button className="deleteButton" onClick={ deleteListItem } >Delete</button>
                            <div style={{display:"none"}}>{ UUID }</div>

                        </div>

                    </div>



                </form>

            </section>

            <section className="additionalGuests">

                { !additionalGuestsSet ? <p style={{"text-align": "center"}}>Please confirm your additional guest.</p>: "" }
                { noAdditionalGuests === 0 && additionalGuestsSet ? <p style={{"text-align": "center"}}>You have selected not to bring any additional guests with you.</p>: "" }
                { noAdditionalGuests > 0 ? listAdditionalGuests(noAdditionalGuests) : "" }

                

            </section>

        </div>

    )

}