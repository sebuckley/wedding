import { getTaskIndexName, saveTaskList } from "./dataFunctions-taskList";
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

const updateSupplierTask = (supplierList, UUID, status, taskList, updatedObject, user) => {

    console.log(UUID);

    let taskName = updatedObject["type"];
    const hasWhiteSpace = /\s/.test(taskName);
    let taskIndex;

    if (hasWhiteSpace) {

        taskIndex = getTaskIndexName(taskList, taskName.replace(/\s/g,""));

    }else{

        taskIndex = getTaskIndexName(taskList, taskName);

    }

    console.log(updatedObject);

    let taskState;
    let taskActivity;
    let toDoDate = "";
    let newObject;
    let newList = taskList.list[taskIndex]["supplierID"] || [];

    newObject = taskList;

    if(status === "Booked"){

        toDoDate = updatedObject?.payments?.dueDate || new Date();
        taskState = "Completed";
        taskActivity = "Selected";
        newObject.list[taskIndex]["supplierID"] = UUID;

    }else if(status === "Enquiry made"){

        newList = taskList.list[taskIndex]["supplierID"];

        if(!Array.isArray(newList)){

            newList = [];

        }

        if (!newList.includes(UUID)) {
        
            newList.push(UUID);

        }

        toDoDate = new Date(new Date(updatedObject?.quote?.quoteDate).getTime() + 14 * 24 * 60 * 60 * 1000) || new Date();
        taskState = "In-progress";
        taskActivity = "Enquiry made";

        newObject.list[taskIndex]["supplierID"] = newList;
       

    }else{

        newList = taskList.list[taskIndex]?.supplierID || "";

        if(!Array.isArray(newList)){

            newList = [];

        }
        
        if (!newList.includes(UUID)) {
        
            newList.push(UUID);

        }

        taskState = "In-progress";
        taskActivity = "Researching";
        toDoDate = new Date();
        newObject.list[taskIndex]["supplierID"] = newList;
        
    }

    newObject.list[taskIndex]["toDoDate"] = toDoDate;
    newObject.list[taskIndex]["state"] = taskState;
    newObject.list[taskIndex]["activity"] = taskActivity;
    newObject.list[taskIndex]["updated"] = new Date();
    newObject.list[taskIndex]["updatedBy"] = user.email;

    saveTaskList(newObject);

    let length = supplierList.length;

    if(status === "Booked"){

        for(let i = 0; i < length; i++){

            let supplierID = supplierList.list[i].UUID;
            let supplierType = supplierList.list[i].type;

            if(supplierType === taskName && supplierID !== UUID){

                supplierList.list[i].status = "Ruled out";
                supplierList.list[i]["updated"] = new Date();
                supplierList.list[i]["updatedBy"] = user.email;

            }

        }

    }

    return newObject;

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

export { 

        checkCapital, 
        titleCase, 
        createClass, 
        isEmpty, 
        uuidv4, 
        splitByCapitalNums, 
        updateSupplierTask,
        toProperCase,
        deleteSupplierTaskItem

 }