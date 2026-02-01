import '../Dashboard.css';
import { useState, useEffect } from 'react';
import { uuidv4 } from '../../Wigits/dataFunctions';
import { saveSupplierList } from '../../Wigits/dataFunctions-suppliers';
import { splitByCapitalNums, updateSupplierTask } from '../../Wigits/dataFunctions';

export default function AddSuppliers(props) {

    const setSupplierList = props.setSupplierList;
    const supplierList = props.supplierList;
    const stateChange = props.stateChange;
    const setStateChange = props.setStateChange;
    const taskList = props.taskList;
    const setTaskList = props.setTaskList;
    const user = props.user;
    const setDisplay = props.setDisplay;
    const display = props.display;
    const taskName = props.taskName;
    const taskID = props.taskID;
    const location = props.location;
    const getSearchText = props.getSearchText;

    console.log(taskID);
   
    let object = {

        taskID: taskID,
        name: "",
        type: "",
        email: "",
        phone: "",
        website: "",
        status: ""

    };

    const [formData, setFormData] = useState(object);
 
    const getData = () => {

        const getData = JSON.parse(localStorage.getItem("supplierData"));

        if(getData !== null){

            setDisplay(true);
            setFormData(getData);

        }else{

            setFormData(object);
            
        }

    }

     useEffect(() => {
        
        getData();

    },[]);


    const checkPhone = (number) => {

        const getIcon = document.getElementsByClassName("phoneCheck")[0];
        const isValid = /^\d{11}$/.test(number);
        getIcon.style.color = isValid ? "var(--green)" : (number ? "var(--red)" : "var(--grey)");
        getIcon.className = `fa-solid ${isValid ? "fa-circle-check" : number ? "fa-circle-xmark" : "fa-circle-minus"} icon2 phoneCheck`;
    
    };

    const checkEmail = (email) => {

        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const getIcon = document.getElementsByClassName("emailCheck")[0];
        const isValid = regex.test(email);
        getIcon.style.color = isValid ? "var(--green)" : (email ? "var(--red)" : "var(--grey)");
        getIcon.className = `fa-solid ${isValid ? "fa-circle-check" : email ? "fa-circle-xmark" : "fa-circle-minus"} icon2 emailCheck`;

    };

    async function checkWebsiteURL(url) {

        try {

            // Add protocol if missing
            const fullUrl = url.startsWith('http') ? url : `https://${url}`;
            
            await fetch(fullUrl, { 
                method: 'GET', 
                mode: 'no-cors'
            });

            // With no-cors mode, we can't check response.ok, so any successful fetch is valid
            return true;

        } catch (error) {

            console.error(`Failed to fetch the website: ${error.message}`);
            return false;
            
        }

    }

    const checkWebsite = (website) => {

        const pattern = new RegExp(
            '^([a-zA-Z]+:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR IP (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', // fragment locator
            'i'
        );

        const char = website.length;
        const regexResult = pattern.test(website);;
        let testURL = false;

        if(regexResult){

            testURL = checkWebsiteURL(website).then((value) => {
                           testURL = value;
                         
                        })
                        .catch((error) => {
                            console.error(error); // Handles any errors
                        }); 

        }

        const getIcon = document.getElementsByClassName("websiteCheck")[0];

        if(char === 0){

            getIcon.style.color = "var(--grey)";
            getIcon.className = "fa-solid fa-circle-minus icon2 websiteCheck";

        }else if(regexResult && testURL){

            getIcon.style.color = "var(--green)";
            getIcon.className = "fa-solid fa-circle-check icon2 websiteCheck";

        }else if(testURL === false){

            getIcon.style.color = "var(--red)";
            getIcon.className = "fa-solid fa-circle-xmark icon2 websiteCheck";

        }else{

            getIcon.style.color = "var(--grey)";
            getIcon.className = "fa-solid fa-circle-minus icon2 websiteCheck";

        }

    }

    const onInput = (e) => {

        const item = e.target.name;
        let value = e.target.value;

        if(item === "type"){

            value = value.split("").join("");

        }

        let newObject = formData;

        newObject[item] = value;

        if (item === "phone") checkPhone(value);
        if (item === "email") checkEmail(value);
        if (item === "website") checkWebsite(value);

        setFormData({...formData, [item]: value});

        localStorage.setItem("supplierData", JSON.stringify(newObject));


    };

    const clearForm = () => {

        setFormData(object);
        resetIcons();
        localStorage.removeItem("supplierData");
        setDisplay(false);

    };

    const resetIcons = () => {

        const reset = (cls) => {

            const icon = document.getElementsByClassName(cls)[0];
            if (icon) {
                icon.style.color = "var(--grey)";
                icon.className = `fa-solid fa-circle-minus icon2 ${cls}`;
            }

        };

        reset("emailCheck");
        reset("phoneCheck");

    };

    const submitForm = () => {

        let errors = [];
        if (!formData.name) errors.push("Supplier name is required.");
        if (!formData.email || !document.getElementsByClassName("emailCheck")[0].className.includes("fa-circle-check")) errors.push("Valid email is required.");
        if (formData.phone && !document.getElementsByClassName("phoneCheck")[0].className.includes("fa-circle-check")) errors.push("Invalid phone number.");


        if (errors.length > 0) {

            alert("Please fix the following issues:\n\n" + errors.join("\n"));
            return;

        }

        const newSupplier = {

            name: formData.name, 
            taskTypeID: formData.taskID,
            address: "", 
            contactDetails:{ 
                email: formData.email, 
                phone: formData.phone, 
                website: formData.website, 
            },
            status: "Shortlisted",
            created: new Date().toISOString(),
            createdBy: user.email,
            updated: new Date().toISOString(),
            updatedBy: user.email,
            UUID: uuidv4()

        };

        // Create a new supplier list immutably to avoid mutating React state directly
        let newList = { ...supplierList, list: [ ...supplierList.list, newSupplier ] };
        newList.length = newList.list.length;

        // Update state and persist
        setSupplierList(newList);
        saveSupplierList(newList);
        setStateChange(stateChange + 1);

       // Update task list (this may mutate the supplier list object internally)
       let newTaskList = updateSupplierTask(newList, newSupplier["UUID"], "Shortlisted", taskList, newSupplier, user);
       setTaskList(newTaskList);

       // Ensure supplier state reflects any mutations made by updateSupplierTask
       setSupplierList({ ...newList });
       saveSupplierList(newList);

       clearForm();
       setDisplay(false);

    };

    const getColor = () => {

        let color;

        if(formData.taskID === ""){

            color = { color: "var(--grey)"}

        }else{

            color = { color: "var(--black)"}

        }

        return color;

    }

    const toggleDisplay = () => {
        
        setDisplay(prev => !prev);

    }

    const removeSpaces = (e) => {

        let value = e.target.value;
        console.log(value);
        value = value.split(" ").join("");

         // Update the state with the new value
        setFormData(prevData => ({
            ...prevData,
            phone: value // Assuming you're targeting the phone field
        }));

        e.target.value = value;
    
    };

    return (

        <section id="addSupplierSection">

            <i onClick={toggleDisplay} id="addSupplierIcon" className={`fa ${display ? "fa-circle-minus" : "fa-circle-plus"} iconHeader`}></i>
            <h1 onClick={toggleDisplay} id="addSupplierTitle">Add Supplier</h1>

            { taskName !== "" && display ? <a href={ "https://www.google.com/search?q=" + getSearchText(taskName) } target="_blank" >Search for { taskName }</a> : "" }

            <form id="supplierForm" style={{ display: display ? "" : "none" }}>
                <div className="row two">
                    <div className="inputGroup col-12">
                        <i className="fa fa-building icon"></i>
                        <input type="text" className="inputBox" name="name" placeholder="supplier name (required)" value={formData.name} onChange={onInput} />
                    </div>
                  
                </div>

                <div className="row">
                    <div className="inputGroup col-12">
                        <i className="fa-solid fa-circle-info icon"></i>
                        
                        <select className="guestType" name="taskID" value={ formData.taskID } onChange={ onInput } style={ getColor() }>
                            <option value="" hidden>Supplier type... (required)</option>
                            { 
                            
                                taskList.list.map((s, i) => (
                                    <option key={i} value={s.taskID}>{ s.taskName }</option>
                                ))
                            
                            }
                        </select>
                    </div>
                </div>

                <div className="row">
                    <div className="inputGroup col-12">
                        <i className="fa-solid fa-envelope icon"></i>
                        <input type="email" className="inputBox checkIcon" name="email" placeholder="email (required)" value={formData.email} onChange={onInput} />
                        <i className="fa-solid fa-circle-minus icon2 emailCheck"></i>
                    </div>
                </div>

                <div className="row">
                    <div className="inputGroup col-12">
                        <i className="fa-solid fa-phone icon"></i>
                        <input type="text" className="inputBox checkIcon" name="phone" placeholder="phone" value={formData.phone} onChange={(e) => {
                                                                                                                                    removeSpaces(e); // Call removeSpaces on change
                                                                                                                                    onInput(e); // Call your existing onInput function
                                                                                                                                }} />
                        <i className="fa-solid fa-circle-minus icon2 phoneCheck"></i>
                    </div>
                </div>

                <div className="row">
                    <div className="inputGroup col-12">
                        <i className="fa-solid fa-globe icon"></i>
                        <input type="text" className="inputBox checkIcon" name="website" placeholder="website" value={formData.website} onChange={onInput} />
                        <i className="fa-solid fa-circle-minus icon2 websiteCheck"></i>
                    </div>
                </div>

               

                <div className="row">
                    <div className="inputGroupColumn col-12">
                        <button type="button" className="button primary" onClick={submitForm}>Add Supplier</button>
                        <button type="button" className="button secondary" onClick={clearForm}>Clear Form</button>
                    </div>
                </div>
            </form>
        </section>

    );
}
