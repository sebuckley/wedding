import '../Dashboard.css';
import { useState, useEffect } from 'react';
import { getGuestList, saveGuestList, checkExistingGuest } from '../../Wigits/dataFunctions-guestList';
import { roles } from '../../App/mainData';
import GenderDropdown from '../../Wigits/genderDropdown';
import { useNavigate } from 'react-router-dom';

// import { parsePhoneNumberFromString, isPossiblePhoneNumber, isValidPhoneNumber, validatePhoneNumberLength } from 'libphonenumber-js';

export default function AddGuests(props){

    const [firstName, setFirstName] = useState('');
    const [surname, setSurname] = useState('');
    const role = props.role;
    const setRole = props.setRole;
    const setGuestList = props.setGuestList;
    const [guestType, setguestType] = useState('');
    const [gender, setGender] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [maxGuests, setMaxGuests] = useState('');
    const [display, setDisplay]  = useState(false);
    const getRoles = props.getRoles;
    const user = props.user;
    const navigate = useNavigate();

    const checkPhone = (number) => {

        const char = number.length;
        let phoneNumber = number;
        let validNumber = false;
    
        if( isNaN(phoneNumber) === false && phoneNumber.length === 11){

            validNumber = true;

        }
        
        const getIcon = document.getElementsByClassName("phoneCheck")[0];

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

        const getEmailIcon = document.getElementsByClassName("emailCheck")[0];

        if(regexResult){

            getEmailIcon.style.color = "var(--green)";
            getEmailIcon.className = "fa-solid fa-circle-check icon2 emailCheck";

        }else if(char > 0){

            getEmailIcon.style.color = "var(--red)";
            getEmailIcon.className = "fa-solid fa-circle-xmark icon2 emailCheck";

        }else{

            getEmailIcon.style.color = "var(--grey)";
            getEmailIcon.className = "fa-solid fa-circle-minus icon2 emailCheck";

        }

    }

    const saveItem = (item, value) => {

        const checkItem = localStorage.getItem("addGuest");

        if(checkItem === null){

            const addGuest = {

                [item]: value

            }

            localStorage.setItem("addGuest", JSON.stringify(addGuest));

        }else{

            const list = JSON.parse(checkItem);

            Object.assign(list, { [item]: value });

            localStorage.setItem("addGuest", JSON.stringify(list));

        }

    }
  
    const onInput = (e) =>{

        const item = e.target.getAttribute("name");
        const value = e.target.value.trim();

        if(item === "email"){

            checkEmail(value);

        }

        if(item === "mobile"){

            checkPhone(value);

        }

        if(item === "guestType"){

            setguestType(value);

        }

        if(item === "role"){

            setRole(value);
        }

         if(item === "gender"){

            setGender(value);
        }


        saveItem(item, value);
        checkEmpty(e.target);

    }

    const checkForm = () => {

        let allowedEmpty = ["mobile"];

        const getForm = document.getElementById("inputForm");
        let empty = 0;

        for(let i = 0; i < getForm.length; i ++){

            let itemValue = getForm[i].value;
            let tagName = getForm[i].tagName;
            let itemName = getForm[i].name;

            if(tagName !== "BUTTON" && allowedEmpty.includes(itemName) === false && itemValue === ""){

                empty += 1;

                if(tagName === "SELECT"){

                    getForm[i].style.outline = "1px solid var(--red)";
    
                }else{
    
                    getForm[i].style.borderColor = "var(--red)";
    
                }
                                    
            }else{

                if(itemValue !== ""){

                    let index = allowedEmpty.indexOf(itemName);
                    if (index !== -1) {

                        allowedEmpty.splice(index, 1);

                    }

                }

            }

        }

        return [empty, allowedEmpty];

    }

    const submitForm = () => {

        const emptyInputs = checkForm();
        const validEmail = document.getElementsByClassName("emailCheck")[0].className.includes("fa-circle-plus");
        const validPhone = document.getElementsByClassName("phoneCheck");
        

        let checkInputs = false;

        if(validEmail !== false){

            checkInputs = true;

        }

        if(validPhone.value !== ""){

            if(validPhone[0].className.includes("fa-circle-plus") === false){

                checkInputs = false;

            }

        }

        const checkDuplicates = checkExistingGuest(firstName, surname, email);

        if(checkDuplicates[0] === 1){

            let alertText;

            if(checkDuplicates[1] === "email match"){

                alertText = email + "\n\nThis email already exists in the list, you are unable to add an email to more than one guest.";

            }else{

                alertText = firstName + " " +  surname + " and " + email + "\n\nThe full details have been found in the guest list";

            }

            alert(alertText);
            clearState();
            clearLocalAddGuest();
            clearForm();
            resetIcons();
            setDisplay(false);
            
            return;

        }

        if(checkDuplicates[0] > 1){

            let text = "We have found duplicate information if your list:\n";

            for(let i = 0; i < checkDuplicates[2].length; i++){


                text += "\n" + checkDuplicates[2][i];


            }

            text += "\n\nAre you sure you want to add this guest.";

            let confirmAction = window.confirm(text);

            if(!confirmAction){
            
                return;

            }

        }

        if(emptyInputs[0] === 0 && checkInputs === false){

            let newPerson = {};
            const personUUID = uuidv4();
            const formData = document.getElementById("inputForm");

            for(let i = 0; i < formData.length; i++){

                if(formData[i].tagName !== "BUTTON"){

                    newPerson[formData[i].getAttribute("name")] = formData[i].value;

                }

            }

            newPerson["rsvp"] = "Not confirmed";
            newPerson["created"] = new Date();
            newPerson["createdBy"] = user.user;
            newPerson["UUID"] = personUUID;
            newPerson["guestType"] = "Over 18";
            newPerson["additionalGuests"] = [];
            newPerson["additionalGuestsNo"] = 0;
            newPerson["additionalGuestsSet"] = false;

            let guestList;

            if(getGuestList() !== null){

                guestList = JSON.parse(localStorage.getItem("guestList"));
                guestList.length = guestList.length + 1;

            }else{

                const listUUID = uuidv4();

                guestList = {

                    listID: listUUID,
                    list: [],
                    length: 1
                
                };

            }

            guestList.list.push(newPerson);

            saveGuestList(guestList);
            setGuestList(guestList);
            
            clearLocalAddGuest();
            clearForm();
            resetIcons();
            clearState();

            navigate(`/managemywedding/guest/?personID=${personUUID}`);


        }else{

            const validEmail = document.getElementsByClassName("emailCheck")[0].className.includes("fa-circle-check");
            const validPhone = document.getElementsByClassName("phoneCheck")[0];
            let string = "Please resolve issues! \n";

            

            if(emptyInputs[0] > 0){

                  string += "\nYou have " + emptyInputs[0] + " empty required fields.";

            }

            if(validEmail === false){

                string += "\nYour email is invalid.";


            }

            if(validPhone.value !== ""){

                console.log(validPhone.className.includes("fa-circle-check"));

                if(validPhone.className.includes("fa-circle-check") === false){

                    string += "\nYour phone number is invalid.";

                }

            }


            alert(string);
            
        }

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

    const uuidv4 = () => {

        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {

            var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);

        });

    }

    const getData = () => {

        const getData = JSON.parse(localStorage.getItem("addGuest"));

        if(getData !== null){

            setDisplay(true);

            if(typeof getData["firstName"] !== 'undefined'){

                setFirstName(getData["firstName"]);

            }

            if(typeof getData["surname"] !== 'undefined'){

                setSurname(getData["surname"]);

            }

            if(typeof getData["guestType"] !== 'undefined'){

                setguestType(getData["guestType"]);

            }

            if(typeof getData["email"] !== 'undefined'){

                setEmail(getData["email"]);
                checkEmail(getData["email"])

            }

            if(typeof getData["mobile"] !== 'undefined'){

                setMobile(getData["mobile"]);
                checkPhone(getData["mobile"])

            }

            if(typeof getData["gender"] !== 'undefined'){

                setGender(getData["gender"]);

            }

             if(typeof getData["role"] !== 'undefined'){

                setRole(getData["role"]);

            }

          
        }
    }

    const clearState = () => {

        setFirstName('');
        setSurname('');
        setEmail('');
        setMobile('');
        setMaxGuests('');
        setguestType('');
      
    }

    const clearForm = () => {

        const getForm = document.getElementById("inputForm");

        for( let i = 0; i < getForm.length; i++){

            getForm[i].value = "";

        }

    }

    const clearLocalAddGuest = () => {

        localStorage.removeItem("addGuest");

    }

    const resetIcons = () => {

        document.getElementsByClassName("phoneCheck")[0].style.color = "var(--grey)";
        document.getElementsByClassName("phoneCheck")[0].className = "fa-solid fa-circle-minus icon2 phoneCheck";
        document.getElementsByClassName("emailCheck")[0].style.color = "var(--grey)";
        document.getElementsByClassName("emailCheck")[0].className = "fa-solid fa-circle-minus icon2 emailCheck";

    }

    const clearAddGuest = () => {

        const checkAction = window.confirm("Are you sure you want to clear the form?");

        if (checkAction === true) {
            
            clearLocalAddGuest();
            clearForm();
            resetIcons();
            clearState();

        } 

    }

    const getColor = () => {

        let color;

        if(guestType === ""){

            color = { color: "var(--grey)"}

        }else{

            color = { color: "var(--black)"}

        }

        return color;

    }

    useEffect(() => {
        
        getData();

    });

    const getCurrentDisplay = () => {

        let style;
        

        if(display){

            style = { display: "" }

        }else{

            style = { display: "none" }

        }

        return style;

    }

    const displayAddGuest = () => {

        const getIcon = document.getElementById("addGuestIcon");

        if(display){

            setDisplay(false);
            getIcon.className = "fa fa-circle-plus iconHeader";

        }else{

            setDisplay(true);
            getIcon.className = "fa fa-circle-minus iconHeader";

        }

    }


    return(

        <section id="addGuestSection">

            <i onClick={ displayAddGuest } id="addGuestIcon" className="fa fa-circle-plus iconHeader"></i>
            <h1 onClick={ displayAddGuest } id="addGuestTitle">Add Guest</h1>
            
            <form id='inputForm' style={ getCurrentDisplay() } target="_blank">
                <p>Guests added here will be listed as adults. If you're adding a child as a bridesmaid, please add their adult guest first, then add the child as the bridesmaid.</p>

                <div className='row two'>

                    <div className='inputGroup col-6'>
                        <i className="fa fa-user icon"></i>
                        <input type='text' className='inputBox' onInput={ onInput } onChange={ e => setFirstName( e.target.value )} name='firstName' placeholder='first name (required)' value={firstName}></input>
                    </div>
                    <div className='inputGroup col-6'>
                        <i className="fa fa-user icon"></i>
                        <input type='text' className='inputBox' onInput={ onInput }  onChange={ e => setSurname( e.target.value )} name='surname' placeholder='surname (required)' value={ surname }></input>
                    </div>

                </div>
                 
                <GenderDropdown getColor={ getColor } onChange={ onInput } value={ gender }/>

                <div className='row'>

                    <div className='inputGroup col-12'>
                    
                        <i className="fa-solid fa-person-circle-question icon"></i>
                        <select id="guestRole" className='guestType' style={ getColor(role) } name='role' onChange={ onInput } value={ role }>
                            <option value="" hidden className="noOption">please select role... (required)</option>
                            <option>Guest</option>
                            { getRoles(roles) }

                        </select>
                       
                    </div>

                </div>

                <div className='row'>

                    <div className='inputGroup col-12'>

                        <i className="fa-solid fa-envelope icon"></i>
                       
                        <input type='email' className='inputBox checkIcon' onInput={ onInput } onChange={ e => setEmail( e.target.value )} name='email' placeholder='email (required)' value={ email }></input>
                        <i className="fa-solid fa-circle-minus icon2 emailCheck"></i>
                       
                    </div>

                </div>

                <div className='row'>

                    <div className='inputGroup col-12'>
                        <i className="fa-solid fa-phone icon"></i>
                        <input type='text' className='inputBox checkIcon' onInput={ onInput } onChange={ e => setMobile( e.target.value )} name='mobile' placeholder='mobile' value={ mobile }></input>
                        <i className="fa-solid fa-circle-minus icon2 phoneCheck"></i>
                    </div>

                </div>

                <div className='row'>

                    <div className='inputGroup col-12'>
                        <i className="fa-solid fa-person-circle-plus icon"></i>
                        <input type='text' className='inputBox' onInput={ onInput } onChange={ e => setMaxGuests( e.target.value )} name='maxGuests' placeholder='How many additional guests can they bring? (required)' value={ maxGuests }></input>
                    </div>

                </div>

                <div className='row'>

                    <div className='inputGroup col-12'>
                        <button type='button' onClick={ submitForm } id='submitBtn' className='button primary'>Add guest</button>
                        <button type='button' onClick={ clearAddGuest } id='clearBtn' className='button secondary'>Clear form</button>
                    </div>

                </div>

            </form>

        </section>


    )


}