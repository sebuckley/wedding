import '../Dashboard.css';
import { useState, useEffect } from 'react';
import { useLocation  } from 'react-router-dom';
import { getSupplierIndex, updateSupplierObject, deleteSupplierListItem } from '../../Wigits/dataFunctions-suppliers';
import { splitByCapitalNums, updateSupplierTask } from '../../Wigits/dataFunctions';
import Notes from './notes';
import SupplierCostDetails from './supplierBooked';
import currencyList from '../Details/currencyList';

export default function UpdateSupplier(props){

    const location = useLocation();
    const search = location.search; // e.g., #/path?param1=value1&param2=value2
    const supplierIDParam = search.split("=")[1];

    const user = props.user;
    const supplierList = props.supplierList;
    const setSupplierList = props.setSupplierList;
    const taskList = props.taskList;
    const setTaskList = props.setTaskList;
    const supplierStatuses = props.supplierStatuses;
    const currency = props.currency;

    const object = {

        UUID: "",
        name: "",
        type: "",
        email: "",
        phone: "",
        website: "",
        status: "",
        address: "",
        roadName: "",
        town: "",
        postCode1: "",
        postCode2: ""

    }
 
    const [supplierID, setSupplierID] = useState('');
    const [formData, setFormData] = useState(object);
    const [updated, setUpdated] = useState(0);
    const [validEmail, setValidEmail] = useState(false);
    const [validPhone, setValidPhone] = useState(false);
    const [validWeb, setValidWeb] = useState(false);
    const [note, setNote] = useState('');
    const [formLength, setFormLength] = useState(0);

    const costValue = formData.status === "Booked" ? formData.cost : formData.quote;

    if(supplierID === ""){

        setSupplierID(supplierIDParam);
        
    }

    const index = getSupplierIndex(supplierID);

    const checkPhone = (number) => {

        const char = number.length;
        let phoneNumber = number;
        let validNumber = false;
    
        if( isNaN(phoneNumber) === false && phoneNumber.length === 11){

            validNumber = true;
            setValidPhone(true);

        }
        
        const getIcon = document.getElementsByClassName("phoneCheck")[0];

        if(validNumber){

            getIcon.style.color = "var(--green)";
            getIcon.className = "fa-solid fa-circle-check icon2 phoneCheck";

        }else if(char > 0){

            getIcon.style.color = "var(--red)";
            getIcon.className = "fa-solid fa-circle-xmark icon2 phoneCheck";
            setValidPhone(false);

        }else{

            getIcon.style.color = "var(--grey)";
            getIcon.className = "fa-solid fa-circle-minus icon2 phoneCheck";
            setValidPhone(false);

        }

        return validNumber;

    }

    const checkEmail = (email) => {

        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const char = email.length;
        const regexResult = regex.test(email);
        let validEmail = false;

        const getIcon = document.getElementsByClassName("emailCheck")[0];

        if(regexResult){

            getIcon.style.color = "var(--green)";
            getIcon.className = "fa-solid fa-circle-check icon2 emailCheck";
            validEmail = true;
            setValidEmail(true);

        }else if(char > 0){

            getIcon.style.color = "var(--red)";
            getIcon.className = "fa-solid fa-circle-xmark icon2 emailCheck";
            setValidEmail(false);

        }else{

            getIcon.style.color = "var(--grey)";
            getIcon.className = "fa-solid fa-circle-minus icon2 emailCheck";
            setValidEmail(false);

        }

        return validEmail;

    }

    const checkWebsite = (website) => {

        const regex = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w-]*)*(\?.*)?(#.*)?/;
        const char = website.length;
        const regexResult = regex.test(website);
        let validWebsite = false;

        const getIcon = document.getElementsByClassName("websiteCheck")[0];

        if(regexResult){

            getIcon.style.color = "var(--green)";
            getIcon.className = "fa-solid fa-circle-check icon2 websiteCheck";
            validWebsite = true;
            setValidWeb(true);

        }else if(char > 0){

            getIcon.style.color = "var(--red)";
            getIcon.className = "fa-solid fa-circle-xmark icon2 websiteCheck";
            setValidWeb(false);

        }else{

            getIcon.style.color = "var(--grey)";
            getIcon.className = "fa-solid fa-circle-minus icon2 websiteCheck";
            setValidWeb(false);

        }

        return validWebsite;

    }

    const removeNonNumbers = (input) => {

        return input.replace(/\D/g, ''); // \D matches any non-digit character

    };

    const onInput = (e) =>{

        const name = e.target.getAttribute("name");
        const value = e.target.value.trim();
        let newObject = formData;

        if(name === "quote" || name === "cost"){


            if(parseInt(value)){

                newObject[name] = parseFloat(value).toFixed(2).toString();

            }else if(value === ""){

                newObject[name] = "0.00";

            }else{

                let newValue = removeNonNumbers(value);
                newObject[name] = parseFloat(newValue).toFixed(2).toString();

            }

        }else{


            newObject[name] = value;

        }

        
        newObject["updated"] = new Date();
        newObject["updatedBy"] = user.email;

        let newSupplierList = updateSupplierObject(supplierList, index, newObject);
        setFormData(newObject);


        let newTaskList = updateSupplierTask(newSupplierList, supplierID, value, taskList, newObject["type"], user);
        setTaskList(newTaskList);
        setUpdated(updated + 1);

    }

    const onInputNote = (e) => {

        const value = e.target.value.trim();
        setNote(value);

    }

    const getSupplierData = (SupplierID) => {

        if(supplierList !== null){

            setFormData(supplierList.list[index]);

        }

    }

    const deleteListItem = (event) => {

        const checkAction = window.confirm("Are you sure you want to delete the supplier?");

        if(checkAction){

            event.preventDefault();
            deleteSupplierListItem(supplierList, index);
            const reDirectString = "/wedding/#/managemywedding/suppliers";
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

    const getWebLink = (link, type="input") => {

        let itemName;
        let item;

        if(type === "input"){

            itemName = "fa-solid fa-globe icon";

        }else{

            itemName = "fa-solid fa-globe icon3";

        }

        if(item !== "" && !validWeb){

            item = <a href={link}> <i className={ itemName }></i></a>;

        }else{

            item = <i className={ itemName }></i>;

        }

        return item;

    }

    const getPhoneLink = (num) => {

        let href = "tel:" + num;
        return <a href={href}> <i className="fa-solid fa-phone icon3"></i></a>
        
    }

    const getEmailLink = (email, type="input") => {

        let itemName;
        let item;

        if(type === "input"){

            itemName = "fa-solid fa-envelope icon";

        }else{

            itemName = "fa-solid fa-envelope icon3";

        }

         if(item !== "" && !validWeb){

            let href = "mailto:" + email;
        
            item = <a href={href}> <i className={ itemName }></i></a>;

        }else{

            item = <i className={ itemName }></i>;

        }

        return  item;
        
    }

    useEffect(() => {

        getSupplierData(supplierID);
        checkEmail(formData.email);
        checkPhone(formData.phone);
        checkWebsite(formData.website);

    }, [ getSupplierData, supplierID ]);


    const getClassName = (name) => {

        let className; 

        if(name === "Booked"){

            className = "fa-solid fa-circle-check icon";

        }else if(name === "Ruled out"){

            className = "fa-solid fa-circle-xmark icon";

         }else if(name === "Shortlisted"){

            className = "fa-solid fa-circle-question icon";

        }else{

            className = "fa-solid fa-circle-minus icon";

        }

        return className;

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

    const addNote = (e) => {

        e.preventDefault();

        let existingNotes;
        let note = document.getElementById("Note").value;

        let newObject = supplierList.list[index];
        existingNotes = newObject.notes;

        if(!Array.isArray(existingNotes)){

            existingNotes = [];

        }

        let newNote = {

            note,
            created: new Date(),
            createdBy: user.email

        }

        existingNotes.push(newNote);
        newObject["notes"] = existingNotes;

        updateSupplierObject(supplierList, index, newObject);
        setFormData(newObject);

        document.getElementById("Note").value = "";
        setUpdated(updated + 1);
        

    }

    const clearNote = (e) => {

        e.preventDefault();

        let confirm = window.confirm("Are you sure you want to clear the notes?");

        if(confirm){

            document.getElementById("Note").value = "";

        }

    }

    function isNotPromise(value) {

        return !(value && typeof value.then === 'function');

    }

    return(

        <div className='contentWrapper'>

            <section id="updateGuestSection">

                <div className='row two'>

                    

                    <div className='col-6'>
                    
                        <h2>{ formData.name }</h2>

                    </div>

                    <div className='topLinks col-6'>
                        
                        <div>{ formData.phone !== "" && validPhone ? getPhoneLink(formData.email) : "" }</div>
                        <div>{ formData.website !== "" && validWeb ? getWebLink(formData.website, "link") : "" }</div>
                        <div>{ formData.email !== "" && validEmail ? getEmailLink(formData.email, "link") : "" }</div>
                        <div><button className="deleteButton" onClick={ deleteListItem } >Delete</button></div>
                        <div style={{display:"none"}}>{ formData.UUID }</div>

                    </div>

                </div>

                <form id='inputForm'>

                    <div className='row'>

                        <div className='inputGroup col-12'>
                            <i className="fa fa-building icon"></i>
                            <input type='text' className='inputBox' name='name' placeholder='name' value={ formData.name } onInput={ onInput }></input>
                        </div>
                 
                    </div>

                      <div className='row'>

                    <div className='inputGroup col-12'>

                            <i className="fa-solid fa-circle-info icon"></i>
                            <select className='guestType' style={ getColor() } name='type'  onChange={ onInput } value={ formData.type }>
                                
                                {taskList.list.map((s, i) => (
                                    <option key={i} value={s.taskName}>{splitByCapitalNums(s.taskName)}</option>
                                ))}

                            </select>
                        
                        </div>

                    </div>

                    <div className='row'>

                        <div className='inputGroup col-12'>

                            { getEmailLink(formData.email) }
                            <input type='email' className='inputBox checkIcon' name='email' placeholder='email' value={ formData.email } onInput={ onInput }></input>
                            <i className="fa-solid fa-circle-minus icon2 emailCheck"></i>
                        
                        </div>

                    </div>

                    <div className='row'>

                        <div className='inputGroup col-12'>
                            <i className="fa-solid fa-phone icon"></i>
                            <input type='text' className='inputBox checkIcon' name='phone' placeholder='phone' value={ formData.phone } onInput={ onInput }></input>
                            <i className="fa-solid fa-circle-minus icon2 phoneCheck"></i>
                        </div>

                    </div>

                    <div className='row'>

                        <div className='inputGroup col-12'>
                            <i className="fa-solid fa-globe icon"></i>
                            <input type='text' className='inputBox checkIcon' name='website' placeholder='website' value={ formData.website } onInput={ onInput }></input>
                            <i className="fa-solid fa-circle-minus icon2 websiteCheck"></i>
                        </div>

                    </div>

                    <div className='row'>

                        <div className='inputGroup col-12'>
                            <i className="fa-solid fa-house icon"></i>
                            <input type='text' className='inputBox' name='number' placeholder='address' value={ formData.address } onInput={ onInput }></input>
                        </div>

                    </div>

                    { formData.status === "Enquiry made"  ? <SupplierCostDetails type="quote" onInput={ onInput } value={ costValue } currency={ currency } currencyList={ currencyList }/> : "" }

                    <div className='row'>

                        <div className='inputGroup col-12'>
                            <i className={getClassName(formData.status)}></i>
                            <select className="guestType" name="status"  style={ getColor(formData.status) } value={ formData.status } onChange={ onInput }>
                    
                                <option value="">None</option>
                                {supplierStatuses.map((s, i) => (
                                    <option key={i} value={s}>{s}</option>
                                ))}
               
                            </select>
                        </div>

                    </div>

                    { formData.status === "Booked"  ? <SupplierCostDetails type="booked" onInput={ onInput } value={ costValue } currency={ currency } currencyList={ currencyList }/> : "" }

                    <div className='row'>

                        <div className='inputGroup col-8'>
                            <i className="fa-solid fa-note-sticky icon"></i>
                            <textarea placeholder="add note" id="Note" onInput={ onInputNote } defaultValue={note}></textarea>
                            
                        </div>

                        <div className='inputGroup col-2'>
                               <button  className="primaryButton" onClick={ addNote } >add note</button>
                              
                            
                        </div>

                         <div className='inputGroup col-2'>
                               <button  className="secondaryButton" onClick={ clearNote } >clear note</button>
                              
                            
                        </div>

                         

                    </div>

                   
                    
                    { formData.name !== "" && typeof formData.notes !== "undefined" ? <Notes notes={ formData.notes } /> : <p style={{ width: "100%", textAlign:"left", paddingLeft: "20px"}}>No notes in system</p> }


                </form>

            </section>

        </div>

    )

}