import { getTaskIndex, saveTaskList } from "./dataFunctions-taskList";
import { getSupplierIndex, saveSupplierList } from "./dataFunctions-suppliers";


const checkCapital = (str) => {

    let sL = str.length;
    let capital = false;
    let strPos = [0];

    for (let i = 0; i < sL; i++) {

        if (str.charAt(i) === str.charAt(i).toUpperCase()) {

        capital = true;
        strPos.push(i);
        
        }

    }

    return [capital, strPos];

}

function toProperCase(str) {

  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

}

const splitByCapitalNums = (Str) => {

    let split;

    if(Str !== "DJ" && Str !== "GuestBookorAlternative"){

        split = Str.split(/(?=\b(?:or|for)\b)|(?=[A-Z0-9&\-\/(]())/).join(" ");

        if(split.includes("for")){

            split = split.replace(/for/gi, ' for ')
            
        }

    }else{

      if(Str === "GuestBookorAlternative"){

         split = "Guest Book or Alternative";

      }else{

        split = Str;

      }

    }

    return split;

}

const titleCase = (s) => {

    let [capital,char] = checkCapital(s);

    let word = [];
    let wordSplit;

    if(capital === true){

        let createSplit = []

        for(let i = 0; i < char.length; i++){ 

            createSplit.push(s.slice(char[i],char[i + 1]));

        }

        wordSplit = createSplit;


    }else{

        wordSplit = [s];

    }

    for(let i = 0; i < wordSplit.length; i ++){

        let newWord = wordSplit[i].toString().toLowerCase().charAt(0).toUpperCase() + wordSplit[i].slice(1)
        word.push(newWord);

    }

    return word.join(' ').trim();

} 

const createClass = (key) => key.replace(/\s/g,"");

const isEmpty = (obj) => JSON.stringify(obj) === '{}';

const uuidv4 = () => {

    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {

        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);

    });

}

const updateSupplierTask = (supplierList, supplierID, status, taskList, supplierDetails, user) => {

    let taskID = supplierDetails["taskTypeID"];
    let taskIndex = getTaskIndex(taskList, taskID);

    let taskState;
    let taskActivity;
    let toDoDate = "";
    let tempTaskList;
    let newSupplierList = taskList.list[taskIndex]["supplierID"] || [];

    tempTaskList = taskList;

    if(status === "Booked"){

        toDoDate = supplierDetails?.payments?.dueDate || new Date();
        taskState = "Completed";
        taskActivity = "Booked";
        tempTaskList.list[taskIndex]["supplierID"] = supplierID;

    }else if(status === "Enquiry made"){

        if(!Array.isArray(newSupplierList)){

            newSupplierList = [];

        }

        if (!newSupplierList.includes(supplierID)) {
        
            newSupplierList.push(supplierID);

        }

        toDoDate = supplierDetails?.quote?.quoteDate 
            ? new Date(new Date(supplierDetails.quote.quoteDate).getTime() + 14 * 24 * 60 * 60 * 1000)
            : new Date(new Date().getTime() + 14 * 24 * 60 * 60 * 1000);
        taskState = "In-progress";
        taskActivity = "Enquiry made";

        tempTaskList.list[taskIndex]["supplierID"] = newSupplierList;

    }else if(status === "Quote recieved"){

         if(!Array.isArray(newSupplierList)){

            newSupplierList = [];

        }

        if (!newSupplierList.includes(supplierID)) {
        
            newSupplierList.push(supplierID);

        }

        toDoDate = supplierDetails?.quote?.quoteDate 
            ? new Date(new Date(supplierDetails.quote.quoteDate).getTime() + 14 * 24 * 60 * 60 * 1000)
            : new Date(new Date().getTime() + 14 * 24 * 60 * 60 * 1000);
        taskState = "In-progress";
        taskActivity = "Quote recieved";

        tempTaskList.list[taskIndex]["supplierID"] = newSupplierList;
       

    }else{

        if(!Array.isArray(newSupplierList)){

            newSupplierList = [];

        }
        
        if (!newSupplierList.includes(supplierID)) {
        
            newSupplierList.push(supplierID);

        }

        taskState = "In-progress";
        taskActivity = "Researching";
        toDoDate = new Date(new Date().getTime() + 14 * 24 * 60 * 60 * 1000);
        tempTaskList.list[taskIndex]["supplierID"] = newSupplierList;
        
    }

    tempTaskList.list[taskIndex]["toDoDate"] = toDoDate;
    tempTaskList.list[taskIndex]["state"] = taskState;
    tempTaskList.list[taskIndex]["activity"] = taskActivity;
    tempTaskList.list[taskIndex]["updated"] = new Date();
    tempTaskList.list[taskIndex]["updatedBy"] = user.email;

    saveTaskList(tempTaskList);

    let length = supplierList.length;

    if(status === "Booked"){

        for(let i = 0; i < length; i++){

            let taskIDCheck = supplierList.list[i].taskID;
            let supplierIDCheck = supplierList.list[i].supplierID;
      
            if(taskIDCheck === taskID && supplierID.trim() !== supplierIDCheck.trim()){

                supplierList.list[i].status = "Ruled out";
                supplierList.list[i]["updated"] = new Date();
                supplierList.list[i]["updatedBy"] = user.email;

            }

        }

    }

    return tempTaskList;

}

const deleteSupplierTaskItem = (taskList, UUID) => {

    let newList = { ...taskList };

    for(let i = 0; i < newList.list.length; i++){

        let supplierIDs = newList.list[i]["supplierID"];

        if(Array.isArray(supplierIDs)){

            let index = supplierIDs.indexOf(UUID);  

            if(index > -1){

                supplierIDs.splice(index, 1);

            }

            newList.list[i]["supplierID"] = supplierIDs;

        }else{

            if(supplierIDs === UUID){     

                newList.list[i]["supplierID"] = "";

            }

        }
    
    }

    saveTaskList(newList);
    return newList;

}

const getSettings = () => {

        const getList = JSON.parse(localStorage.getItem("settings"));
        return getList;

}

const saveSettings = (settings) => {

    const setItem = localStorage.setItem("settings", JSON.stringify(settings));

    if(setItem){

        return true;

    }else{

        return false;

    }

}

export { 

        checkCapital, 
        titleCase, 
        createClass, 
        isEmpty, 
        uuidv4, 
        splitByCapitalNums, 
        updateSupplierTask,
        toProperCase,
        deleteSupplierTaskItem,
        getSettings,
        saveSettings

 }