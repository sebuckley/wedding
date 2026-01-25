import '../Dashboard.css';
import { useState, useEffect } from 'react';
import { useLocation  } from 'react-router-dom';
import { getSupplierIndex, updateSupplierObject, deleteSupplierListItem } from '../../Wigits/dataFunctions-suppliers';
import { saveBridalPartyItem } from '../../Wigits/dataFunctions-bridalParty';
import { splitByCapitalNums, updateSupplierTask } from '../../Wigits/dataFunctions';
import Notes from './notes';
import SupplierCostDetails from './supplierBooked';
import SupplierQuoteDetails from './supplierQuote';
import currencyList from '../Details/currencyList';
import Email, { checkValidEmail } from '../../Wigits/contact/email';
import Phone, { checkValidPhone } from '../../Wigits/contact/phone';
import PaymentHistory from './paymentHistory';

export default function UpdateSupplier(props){

    const location = useLocation();
    const search = location.search; // e.g., #/path?param1=value1&param2=value2
    // const supplierIDParam = search.split("=")[1];
    const getSupplierDataUpdate = props.getSupplierData;

    useEffect(() => {

        // Extract the ID from the URL search params
        const newSupplierID = search.split("=")[1];
        
        // Only update if it's different from current state
        if (newSupplierID && newSupplierID !== supplierID) {

            setSupplierID(newSupplierID);

        }

    }, [search]);  // Run whenever URL changes

    const user = props.user;
    const supplierList = props.supplierList;
    const setSupplierList = props.setSupplierList;
    const taskList = props.taskList;
    const setTaskList = props.setTaskList;
    const supplierStatuses = props.supplierStatuses;
    const currency = props.currency;
    const bridalParty = props.bridalParty;
    const supplierBooked = props.supplierBooked;

    const object = {

        UUID: "",
        name: "",
        taskTypeID: "",
        contactDetails: {

            email: "",
            phone: "",
            website: "",

        },
        status: "",
        address: {

            number: "",
            roadName: "",
            town: "",
            postCode1: "",
            postCode2: ""

        },
        payments: {

            totalCost: "0.00",
            dueDate: "",
            deposit: "0.00",    
            depositDate: "",
            depositPaidBy: "",
            depositPaymentType: "",
            balancePaymentType: "",
            balancePaidDate: "",
            balancePaidBy: ""


        },
        quote: {

            quoteValue: "",
            quoteDate: "",
            quoteBy: ""

        }
    }

    const [supplierID, setSupplierID] = useState("");
    const [formData, setFormData] = useState(object);
    const [updated, setUpdated] = useState(0);
    const [validEmail, setValidEmail] = useState(false);
    const [validPhone, setValidPhone] = useState(false);
    const [validWeb, setValidWeb] = useState(false);
    const [validLatLong, setValidLatLong] = useState("");
    const [note, setNote] = useState('');
    const [formLength, setFormLength] = useState(0);
    const [totalEmptyState, setTotalEmptyState] = useState(0);

    const quote = formData.quote?.quoteValue || "";
    const quoteDate = formData.quote?.quoteDate || "";
    const quoteBy = formData.quote?.quoteBy || "";
    const totalCost = formData.payments?.totalCost || "";
    const dueDate = formData.payments?.dueDate || "";
    const deposit = formData.payments?.depositValue || "";
    const depositDate = formData.payments?.depositDate || "";
    const depositPaidBy = formData.payments?.depositPaidBy || "";
    const balance = formData.payments?.balance || null;
    const depositPaymentType = formData.payments?.depositPaymentType || "";
    const balancePaymentType = formData.payments?.balancePaymentType || "";
    const balancePaidDate = formData.payments?.balancePaidDate || "";
    const balancePaidBy = formData.payments?.balancePaidBy || "";
    const costValue = formData.status === "Booked" ? totalCost : quote;
    const addressSearch = formData.address?.count ? formData.address.count >= 5 ? true : false : false;
    const longitude = formData.address?.longitude || "";
    const latitude = formData.address?.latitude || "";
    const name = formData.name || "";
    const email = formData.contactDetails?.email || "";
    const phone = formData.contactDetails?.phone || "";
    const website = formData.contactDetails?.website || "";
    const taskTypeID = formData.taskTypeID || "";
    const status = formData.status || "";
    const number = formData.address?.number || "";
    const roadName = formData.address?.roadName || "";
    const town = formData.address?.town || "";
    const postCode1 = formData.address?.postCode1 || "";
    const postCode2 = formData.address?.postCode2 || "";

    if(validLatLong === ""){

        if(latitude && longitude && isValidLatitude(parseFloat(latitude)) && isValidLongitude(parseFloat(longitude))){

            //console.log("valid lat long");
            setValidLatLong(true);

        }else{

             //console.log("invalid lat long");
            setValidLatLong(false);

        }

    }

    const checkPhone = (number) => {


        if(number !== "" && typeof number !== "undefined"){

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

    }

    const checkEmail = (email) => {

        if(email !== "" && typeof email !== "undefined"){

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

    }

    const checkWebsite = (website) => {

        if(website !== "" && typeof website !== "undefined"){

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

    }

    const removeNonNumbers = (input) => {

        return input.replace(/\D/g, ''); // \D matches any non-digit character

    };

    function isValidLatitude(latitude) {

        return typeof latitude === 'number' && !isNaN(latitude) && latitude >= -90 && latitude <= 90;

    }

    function isValidLongitude(longitude) {

        return typeof longitude === 'number' && !isNaN(longitude) && longitude >= -180 && longitude <= 180;

    }

    const onInput = (e) =>{

        const currentIndex = getSupplierIndex(supplierID, supplierList);

        const name = e.target.getAttribute("name");
        let value = e.target.value;
        let newObject = { ...formData };  // Create new object reference
        let weddingVenueDisplay = false;
        let weddingReceptionVenueDisplay = false;
        const itemType = document.getElementsByName("taskTypeID")[0];
        const itemOption = itemType.options[itemType.selectedIndex].text
        const itemStatus = document.getElementsByName("status")[0];
        const taskItemStatus = name === "status" ? value : itemStatus;

        if(itemOption === "Wedding Venue" && itemStatus.value === "Booked" || itemOption === "Wedding Reception Venue" && itemStatus.value === "Booked"){

            let itemBusinessName = document.getElementsByName("name")[0];
            let itemEmail = document.getElementsByName("email")[0];
            let itemPhone = document.getElementsByName("phone")[0];
            let itemWebsite = document.getElementsByName("website")[0];
            let itemNumber = document.getElementsByName("number")[0];
            let itemRoadName = document.getElementsByName("roadName")[0];
            let itemTown = document.getElementsByName("town")[0];
            let itemPostCode1 = document.getElementsByName("postCode1")[0];
            let itemPostCode2 = document.getElementsByName("postCode2")[0];
            let itemLatitude = document.getElementsByName("latitude")[0];   
            let itemLongitude = document.getElementsByName("longitude")[0];

            let checkCount;

            if(typeof itemLatitude === "undefined" || itemLatitude === null || itemLongitude === "undefined" || itemLongitude === null){

                checkCount = 0;

            }else{

                let fields = [itemBusinessName, itemEmail, itemPhone, itemWebsite, itemNumber, itemRoadName, itemTown, itemPostCode1, itemPostCode2, itemLatitude, itemLongitude];
                let allowedEmpty = ["website", "phone", "number"];

                checkCount = checkFields(fields, allowedEmpty, "address");

            }

            if(checkCount === 0 && itemOption === "Wedding Venue"){

               weddingVenueDisplay = true;

            }else{

                weddingVenueDisplay = false;

            }

            if(checkCount === 0 && itemOption === "Wedding Reception Venue"){

               weddingReceptionVenueDisplay = true;

            }else{

                weddingReceptionVenueDisplay = false;

            }

        }

        if(name === "status" && value === "Booked"){

            if (!newObject.payments) {

                newObject.payments = {};

            }

            newObject.payments.totalCost = newObject.quote?.quoteValue || "0.00";
            newObject.payments.dateBooked = new Date();
            newObject.payments.balance = newObject.payments.totalCost;
            newObject.payments.paymentsMade = [];

        }

        if(name === "quoteValue" || name === "totalCost" || name === "depositValue"){

            value = value.replace(/[£$€¥,.]/g, "");

            if(parseInt(value)){

                value = parseFloat(value).toFixed(2).toString();

            }else if(value === ""){

                value = "0.00";

            }else{

                value = parseFloat(value).toFixed(2).toString();

            }

            if(name === "quoteValue"){

                newObject["status"] = "Quote received";

            }

        }

        if(name === "number" || name === "roadName" || name === "town" || name === "postCode1" || name === "postCode2" || name === "latitude" || name === "longitude"){

            let addressObject = formData.address === "" || typeof  formData.address === "undefined" ? {} : formData.address;

            addressObject[name] = value;
            addressObject["count"] = Object.keys(addressObject).length;
            newObject["address"] = addressObject;

        }else if(name === "email" || name === "phone" || name === "website"){

            let contactObject = formData.contactDetails === "" || typeof  formData.contactDetails === "undefined" ? {} : formData.contactDetails;

            contactObject[name] = value;
            newObject["contactDetails"] = contactObject;

        }else if(name === "dueDate" || name === "totalCost" || name === "depositValue" || name === "depositDate" || name === "depositPaidBy" || name === "depositPaymentType" || name === "balancePaymentType" || name === "balancePaidDate" || name === "balancePaidBy" ){

            let paymentObject = formData.payments === "" || typeof  formData.payments === "undefined" ? {} : formData.payments;

            paymentObject[name] = value;

            if(name === "totalCost"){

                const checkArray = paymentObject["paymentsMade"]?.length || 0;

                if(checkArray === 0){

                    paymentObject["balance"] = parseInt(value).toFixed(2).toString();

                }else{

                    let totalPayments = 0;

                    for(let i=0; i < paymentObject["paymentsMade"].length; i++){
                        totalPayments += parseFloat(paymentObject["paymentsMade"][i].payment);
                    }

                    paymentObject["balance"] = parseFloat(parseFloat(value) - totalPayments).toFixed(2).toString();

                }

            }

            newObject["payments"] = paymentObject;

        }else if(name === "quoteValue" || name === "quoteDate" || name === "quoteBy" ){

            let quoteObject = formData.quote === "" || typeof  formData.quote === "undefined" ? {} : formData.quote;

            quoteObject[name] = value;
            newObject["quote"] = quoteObject;

        }else{

            newObject[name] = value;

        }

        newObject["updated"] = new Date();
        newObject["updatedBy"] = user.email;

        if(itemOption === "Wedding Venue" && itemStatus.value === "Booked"){

            if(weddingVenueDisplay){

                newObject["weddingVenueDisplay"] = true;

            }else{

                newObject["weddingVenueDisplay"] = false;

            }

            saveBridalPartyItem(bridalParty, "weddingVenue", newObject);

        }

        if(itemOption === "Wedding Reception Venue" && itemStatus.value === "Booked"){

            if(weddingReceptionVenueDisplay){

                newObject["weddingReceptionDisplay"] = true;

            }else{

                newObject["weddingReceptionDisplay"] = false;

            }

            saveBridalPartyItem(bridalParty, "weddingReceptionVenue", newObject);

        }

        let newSupplierList = updateSupplierObject(supplierList, currentIndex, newObject);

       

        setFormData(newObject);
        setSupplierList(newSupplierList);  // Update parent state with new list
        checkEmpty(e.target);

        getSupplierDataUpdate(newSupplierList);  // Pass UPDATED list, not old supplierList

        if(name === "status"){

            let newTaskList = updateSupplierTask(newSupplierList, supplierID, taskItemStatus, taskList, newObject, user);
            setTaskList(newTaskList);

        }

        setUpdated(updated + 1);

         if(name === "status" && value === "Booked"){

            supplierBooked(newSupplierList, newObject["taskTypeID"], newObject["UUID"])

        }

    }

    const onInputNote = (e) => {

        const value = e.target.value;
        setNote(value);

    }

    const onInputLatLong = (e) => {

        const value = e.target.value;
        const split = value.split(",");
        let latitude = split[0] ? split[0].trim() : "";
        let longitude = split[1] ? split[1].trim() : "";

        if(!isNaN(parseFloat(longitude)) && !isNaN(parseFloat(latitude))){

            let newObject = { ...formData };  // Create new object reference
            let addressObject = formData.address === "" || typeof  formData.address === "undefined" ? {} : formData.address;
            addressObject["longitude"] = parseFloat(longitude).toString();
            addressObject["latitude"] = parseFloat(latitude).toString();
            addressObject["count"] = Object.keys(addressObject).length;
            newObject["address"] = addressObject;
            newObject["updated"] = new Date();
            newObject["updatedBy"] = user.email;
            const currentIndex = getSupplierIndex(supplierID, supplierList);
            let newSupplierList = updateSupplierObject(supplierList, currentIndex, newObject);
            setFormData(newObject);
            setSupplierList(newSupplierList);  // Update parent state with new list
            setValidLatLong(true);

        }

    }

    const getSupplierData = (SupplierID) => {
       
        const currentIndex = getSupplierIndex(SupplierID, supplierList);

        if (currentIndex !== -1 && supplierList?.list[currentIndex]) {
            setFormData(supplierList.list[currentIndex]); 
        } else {
            console.error('Supplier not found for ID:', SupplierID);
        }

    }

    const deleteListItem = (event) => {

        const checkAction = window.confirm("Are you sure you want to delete the supplier?");
        const currentIndex = getSupplierIndex(supplierID, supplierList);

        if(checkAction){

            event.preventDefault();
            deleteSupplierListItem(supplierList, currentIndex);
            const reDirectString = "/wedding/#/managemywedding/suppliers";
            window.location.replace(reDirectString);

        }

    }

    const getColor = (value) => {

        let color;

        if(value === "" || value === "Not confirmed" || typeof value === "undefined"){

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

            item = <a href={link} > <i className={ itemName } title="website"></i></a>;

        }else{

            item = <i className={ itemName } title="website"></i>;

        }

        return item;

    }

    const getPhoneLink = (num, type="input") => {

        let itemName;
        let item = num;

         if(type === "input"){

            itemName = "fa-solid fa-phone icon";

        }else{

            itemName = "fa-solid fa-phone icon3";

        }

         if(item !== "" && validPhone){

            let href = "tel:" + num;
            item = <a href={href} > <i className={ itemName } title="phone"></i></a>

        }else{

            item = <i className={ itemName } title="phone"></i>;

        }

        return item;
        
    }

    const getEmailLink = (email, type="input") => {

        let itemName;
        let item;

        if(type === "input"){

            itemName = "fa-solid fa-envelope icon";

        }else{

            itemName = "fa-solid fa-envelope icon3";

        }

         if(item !== "" && validEmail){

            let href = "mailto:" + email;
        
            item = <a href={href} > <i className={ itemName } title="email"></i></a>;

        }else{

            item = <i className={ itemName } title="email"></i>;

        }

        return  item;
        
    }

    useEffect(() => {

        if (supplierID && supplierList?.list) {

            const currentIndex = getSupplierIndex(supplierID, supplierList);
            
            if (currentIndex !== -1 && supplierList.list[currentIndex]) {

                const newFormData = supplierList.list[currentIndex];
                setFormData(newFormData);
                
                checkEmail(newFormData.contactDetails?.email);
                checkPhone(newFormData.contactDetails?.phone);
                checkWebsite(newFormData.contactDetails?.website);

            } else {

                console.error('Invalid index or supplier not found:', supplierID, currentIndex);

            }
        }
        }, [supplierID, supplierList]);

    const getClassName = (name) => {

        let className; 

        if(name === "Booked"){

            className = "fa-solid fa-circle-check icon";

        }else if(name === "Ruled out"){

            className = "fa-solid fa-circle-xmark icon";

         }else if(name === "Shortlisted"){

            className = "fa-solid fa-circle-question icon";
        
        }else if(name === "Quote received"){

            className = "fa-solid fa-file-invoice icon";

        }else{

            className = "fa-solid fa-circle-minus icon";

        }

        return className;

    }

    const checkFields = (fields, allowedEmpty, address="Non-address") => {

        let count = 0;

        //console.log(fields);

        if(status !== "Ruled out"){

            let dueDateCheck;

            for(let i=0; i < fields.length; i++){

                let fieldName = fields[i].getAttribute('name');
                let fieldValue;

                if(fieldName === "dueDate"){

                    dueDateCheck = fields[i].value;

                }

                if(fields[i].tagName === "SELECT"){

                    fieldValue = fields[i].value;

                }else{

                    fieldValue = fields[i].value;

                    if(fieldValue === ""){

                        fieldValue = fields[i].value;
                    
                    }

                }

                if(fields[i].tagName === "SELECT"){

                    fields[i].style.outline = "none";

                }else{
                
                    fields[i].style.borderColor = "var(--grey)";

                }  

                if(allowedEmpty.includes(fieldName) === false){

                    console.log("empty field:", fieldName, fieldValue);

                    if(fieldValue === "" || fieldValue === "Not confirmed"){

                        if(fields[i].tagName === "SELECT"){

                            count += 1;
                            fields[i].style.outline = "1px solid red";

                        }else{

                            if(fieldName === "balancePaidDate"){

                                let todaysDate = new Date();
                                let dateCheck = new Date(dueDateCheck);

                                if(dateCheck > todaysDate && dueDateCheck !== ""){  

                                    fields[i].style.borderColor = "var(--grey)";

                                }else{

                                    count += 1;
                                    fields[i].style.borderColor = "red"; 
                                    
                                }

                            }else{

                                count += 1;
                                fields[i].style.borderColor = "red";

                            }

                        }
                        
                    }

                }

            }

        }

        return count;

    }

    const checkEmptyFields = () => {

        const itemType = document.getElementsByName("taskTypeID")[0] ? document.getElementsByName("taskTypeID")[0] : { value: "" };
        const itemOption = itemType.options[itemType.selectedIndex].text
        const itemStatus = document.getElementsByName("status")[0] ? document.getElementsByName("status")[0] : { value: "" };

        let allowedEmpty;

        if(itemOption === "Wedding Venue" || itemOption === "Wedding Reception Venue"){

            if(itemStatus.value === "Enquiry made"){

                allowedEmpty = ["number","website","paymentDate", "payment","paidBy","paymentMethod", "quoteValue", "quoteDate", "quoteBy"];

            }else{

                allowedEmpty = ["number","website","paymentDate", "payment","paidBy","paymentMethod"];

            }

        }else{

            if(itemStatus.value === "Enquiry made"){

                allowedEmpty = ["website", "phone", "number", "roadName", "town", "postCode1", "postCode2", "latitude","longitude","paymentDate", "payment","paidBy","paymentMethod", "quoteValue", "quoteDate", "quoteBy"];

            }else{

                allowedEmpty = ["website", "phone", "number", "roadName", "town", "postCode1", "postCode2", "latitude","longitude","paymentDate", "payment","paidBy","paymentMethod"];
            
            }

        }
        
        const inputs = document.getElementsByTagName("input");
        const selects = document.getElementsByTagName("select");

        const checkInputs = checkFields(inputs, allowedEmpty);
        const checkSelects = checkFields(selects, allowedEmpty);

        const totalEmpty = checkInputs + checkSelects;

        if(totalEmptyState !== totalEmpty){

            setTotalEmptyState(totalEmpty);
            
        }

       

    }

    const getEmptyFields = () => {

        let returnText;

        if(totalEmptyState === 0){

            if(status === "Booked"){

                returnText = <div style={{margin:"5px"}}> <span className='labelTag booked' title="current status"><i class="fa-solid fa-circle-check"></i> booked</span></div>;

            }else if(status === "Quote received"){

                returnText = <div style={{margin:"5px"}}><span className='labelTag quoted' title="current status"><i class="fa-solid fa-file-invoice"></i> quote recieved</span></div>;

            }else if(status === "Enquiry made"){

                returnText = <div style={{margin:"5px"}}><span className='labelTag enquiry' title="current status"><i class="fa-solid fa-phone"></i> enquiry made</span></div>;

            }else if(status === "Shortlisted"){

                returnText = <div style={{margin:"5px"}}><span className='labelTag shortlisted' title="current status"><i class="fa-solid fa-list"></i> shortlisted</span></div>;

            }else{

                returnText = <div style={{margin:"5px"}}><span className='labelTag ruledout' title="current status"><i class="fa-solid fa-circle-xmark"></i> ruled out</span></div>;

            }

        }else{

            if(status === "Ruled out"){

                returnText = <div style={{margin:"5px"}}><span className='labelTag ruledout' title="current status"><i class="fa-solid fa-circle-xmark"></i> ruled out</span></div>;

            }else{

                const getS = totalEmptyState > 1 ? "s" : "";

                returnText = <div style={{margin:"5px"}}><span className='labelTag empty' title="current status">{totalEmptyState + " required field" + getS}</span></div>;

            }

        }

        return returnText;

    }

    const addNote = (e) => {

        e.preventDefault();
        const currentIndex = getSupplierIndex(supplierID, supplierList);

        let existingNotes;
        let note = document.getElementById("Note").value;

        let newObject = supplierList.list[currentIndex];
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

        updateSupplierObject(supplierList, currentIndex, newObject);
        setFormData(newObject);

        setNote("");
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

    const getSearchAddress = () => {

        let search = "";

        if(formData.address?.number){

            if(formData.address.number !== ""){

                let number = formData.address.number

                if(search === ""){

                    search = number.replace(" ","+");

                }else{

                    search = search + "+" + number.replace(" ","+");
                }

            }

        }

        if(formData.address?.roadName){

            if(formData.address.roadName !== ""){

                let roadName = formData.address.roadName

                if(search === ""){

                    search = roadName.replace(" ","+");

                }else{

                    search = search + "+" + roadName.replace(" ","+");
                }

            }

        }

        if(formData.address?.town){

            if(formData.address.town !== ""){

                let town = formData.address.town;

                if(search === ""){

                    search = town.replace(" ","+");

                }else{

                    search = search + "+" + town.replace(" ","+");
                }

            }

        }

        if(formData.address?.postCode1){

            if(formData.address.postCode1 !== ""){

                let postCode1 = formData.address.postCode1;

                if(search === ""){

                    search = formData.address.postCode1;

                }else{

                    search = search + "+" + formData.address.postCode1;
                }

            }

        }

        if(formData.address?.postCode2){

            if(formData.address.postCode2 !== ""){

                if(search === ""){

                    search = formData.address.postCode2;

                }else{

                    search = search + "+" + formData.address.postCode2;
                }

            }

        }

        const href = "https://www.google.co.uk/maps/search/" + formData.name.replace(" ","+") + "+" + search;

        return href;

    }

    const displayLatLong = () => {

        return(

            <>

                <div className='row'>

                    <div className='inputGroupColumn col-12'>
                            <label className="block mb-2 font-semibold">
                            Latitude:
                        </label>
                        <div className="col-12">
                            <i className="fa-solid fa-location-crosshairs icon" title="latitude"></i>
                            <input type='text' className='inputBox' onChange={ onInput } name='latitude' placeholder='latitude' value={ latitude }></input>
                        </div>
                    </div>

                </div>

                <div className='row'>

                    <div className='inputGroupColumn col-12'>
                        <label className="block mb-2 font-semibold">
                            Longitude:
                        </label>
                        <div className="col-12">
                            <i className="fa-solid fa-location-crosshairs icon" title="longitude"></i>
                            <input type='text' className='inputBox' onChange={ onInput } name='longitude' placeholder='longitude' value={ longitude }></input>
                        </div>
                    </div>

                </div>

            </>

        );
    }

    const displayLatLongCapture = () => {

        return(

            <div className='row'>

                <div className='inputGroupColumn col-12'>
                        <label className="block mb-2 font-semibold">
                        Paste Latitude and Longitude from google link:
                    </label>
                    <div className="col-12">
                    <i className="fa-solid fa-location-crosshairs icon" title="latitude"></i>
                    <input type='text' className='inputBox' onChange={ onInputLatLong } name='atlongCapture' placeholder='Paste Latitude and Longitude from google link:' value={ "" }></input>
                    </div>
                </div>

            </div>

        );
    }

    // Run empty-field validation only when form data or status changes.
    // Use a short async delay so child components (Email/Phone) can sync their internal input values/icons first.
    useEffect(() => {

        const timeout = setTimeout(() => {
            checkEmptyFields();
        }, 0);

        return () => clearTimeout(timeout);

    }, [formData, status]);

    const getOutstandingBalance = () => {

        let returnText = "";

        if(status === "Booked" && formData.payments){

            const balance = parseFloat(formData.payments.balance || "0.00");

            if(balance > 0){

                returnText = <div style={{margin:"5px"}}><span className='labelTag balance' title="Outstanding balance"><i class="fa-solid fa-file-invoice"></i> { currencyList[currency].symbol }{ balance.toFixed(2) }</span></div>;
            }

        }

        return returnText;

    }

    return(

        <div className='contentWrapper'>

            <section id="updateGuestSection">

                <div className='row'>

                    <div className='col-4' style={{display:"flex",alignItems:"center",justifyContent:"left"}}>
                    
                        <h2>{ formData.name } </h2>
                        

                    </div>

                    <div className='col-4' style={{display:"flex",alignItems:"center",justifyContent:"left"}}>

                        <div style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"left"}} >{getEmptyFields()} {getOutstandingBalance()}</div>

                    </div>

                    <div className='topLinks col-4'>
                        
                        <div>{ phone !== "" && validPhone ? getPhoneLink(email, "link") : "" }</div>
                        <div>{ website !== "" && validWeb ? getWebLink(website, "link") : "" }</div>
                        <div>{ email !== "" && validEmail ? getEmailLink(email, "link") : "" }</div>
                        <div><button className="deleteButton" onClick={ deleteListItem } >Delete</button></div>
                        <div style={{display:"none"}}>{ formData.UUID }</div>

                    </div>

                </div>

                <form id='inputForm'>

                    <div className='row'>

                        <div className='inputGroup col-12'>
                            <i className="fa fa-building icon" title="Supplier name"></i>
                            <input type='text' className='inputBox' name='name' placeholder='name' value={ name } onInput={ onInput }></input>
                        </div>
                 
                    </div>

                    <div className='row'>

                        <div className='inputGroup col-12'>

                            <i className="fa-solid fa-circle-info icon" title="Supplier type"></i>

                            
                            <select className='guestType' style={ getColor(taskTypeID) } name='taskTypeID' onChange={ onInput } value={ taskTypeID }>
                                {taskList.list.map((s, i) => (
                               
                                    <option key={i} value={ s.taskID }>{ s.taskName }</option>
                                ))}
                            </select>
                        
                        </div>

                    </div>

                    {/* Email Section */}
                    <Email updateFunction={ onInput } value={ email } type="input" class='inputBox checkIcon' />

                     {/* Mobile Section */}
                    <Phone updateFunction={ onInput } value={ phone } type="input" numberType={ "phone" } lass='inputBox checkIcon' setRemoveSpaces={ true }/>
                    
                    {/* Website Section */}
                    <div className='row'>

                        <div className='inputGroup col-12'>
                            <i className="fa-solid fa-globe icon" title="Website"></i>
                            <input type='text' className='inputBox checkIcon' name='website' placeholder='website' value={ website } onInput={ onInput }></input>
                            <i className="fa-solid fa-circle-minus icon2 websiteCheck"></i>
                        </div>

                    </div>

                    {/* Address Section */}

                    <div className='row two'>

                        <div className='inputGroup col-4'>
                            <i className="fa-solid fa-house icon" title="Unit/Number"></i>
                            <input type='text' className='inputBox' onInput={ onInput } name='number' placeholder='Unit/number' value={ number }></input>
                        </div>

                        <div className='inputGroup col-8'>
                            <i className="fa-solid fa-road icon" title="Road name"></i>
                            <input type='text' className='inputBox' onInput={ onInput }  name='roadName' placeholder='road name' value={ roadName }></input>
                        </div>

                    </div>

                    {/* Town Section */}
                    <div className='row'>

                        <div className='inputGroup col-12'>
                            <i className="fa-solid fa-location-pin icon" title="Town"></i>
                            <input type='text' className='inputBox' onInput={ onInput } name='town' placeholder='town' value={ town }></input>
                        </div>

                    </div>

                    {/* Post code Section */}
                    <div className='row two'>

                        <div className='inputGroup col-2'>
                            <i className="fa-solid fa-signs-post icon" title="Post code part one XXXX"></i>
                            <input type='text' className='inputBox' onInput={ onInput } name='postCode1' placeholder='post (xxxx)' maxLength='4' value={ postCode1 }></input>
                        </div>
                        <div className='inputGroup col-3'>
                            <i className="fa-solid fa-signs-post icon" title="Post code part two XXX"></i>
                            <input type='text' className='inputBox' onInput={ onInput }  name='postCode2' placeholder='code (xxx)' maxLength='3' value={ postCode2 }></input>
                        </div>

                    </div>

                    { addressSearch && latitude === "" || addressSearch && longitude === "" ? <a href={ getSearchAddress() } target="_blank">Search to add logitude and latitude</a> : "" }
                    { addressSearch && latitude === "" && !validLatLong || addressSearch && longitude === "" && !validLatLong ? displayLatLongCapture() : "" }
                    { addressSearch && latitude !== "" && longitude !== "" ? displayLatLong() : "" }
                    
                     <div className='row'>

                        <div className='inputGroupColumn col-12'>

                             <label className="block mb-2 font-semibold">
                                Status:
                            </label>
                            <div className='col-12'>
                            <i className={getClassName(status)}></i>
                            <select className="guestType" name="status"  style={ getColor(status) } value={ status } onChange={ onInput }>
                    
                                <option defaultValue="">None</option>
                                {supplierStatuses.map((s, i) => (
                                    <option key={i} defaultValue={s}>{s}</option>
                                ))}
               
                            </select>
                            </div>
                        </div>

                    </div>

                    { formData.status === "Enquiry made" || formData.status === "Quote received" ? <SupplierQuoteDetails type="quote" onInput={ onInput } quote={ costValue } currency={ currency } currencyList={ currencyList } getColor={ getColor } quoteDate={ quoteDate } quoteBy={ quoteBy }/> : "" }
                    { formData.status === "Booked"  ?   <SupplierCostDetails 

                                                            type="booked" 
                                                            onInput={ onInput } 
                                                            defaultValue={ costValue } 
                                                            dueDate={ dueDate }
                                                            balance={ balance }
                                                            currency={ currency } 
                                                            currencyList={ currencyList } 
                                                            getColor={ getColor }                                                    
                        
                                                            user={ user }
                                                            supplierList={ supplierList }
                                                            setSupplierList={ setSupplierList }
                                                            taskList={ taskList }
                                                            setTaskList={ setTaskList }
                                                            supplierID={ supplierID }
                                                            payments={ typeof formData.payments.paymentsMade !== "undefined" ? formData.payments : [] }

                                                        /> : "" }

                    { formData.status === "Booked" && typeof formData.payments.paymentsMade !== "undefined" ? <PaymentHistory paymentsMade={ formData.payments.paymentsMade } /> : null }

                    <div className='row'>

                        <div className='inputGroup col-8'>
                            <i className="fa-solid fa-note-sticky icon"></i>
                            <textarea placeholder="add note" id="Note" onInput={ onInputNote } value={note}></textarea>
                            
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