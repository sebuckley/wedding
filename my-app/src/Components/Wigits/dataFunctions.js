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

    console.log(Str)

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

const updateSupplierTask = (supplierList, UUID, status, taskList, taskName, user) => {

    const taskIndex = getTaskIndexName(taskList, taskName);

    let taskState;
    let taskActivity;
    let newObject;
    let newList;

    newObject = taskList;

    if(status === "Booked"){

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

        taskState = "In-progress";
        taskActivity = "Enquiry made";

        newObject.list[taskIndex]["supplierID"] = newList;
       

    }else{

        newList = taskList.list[taskIndex]["supplierID"];

        if(!Array.isArray(newList)){

            newList = [];

        }
        
        if (!newList.includes(UUID)) {
        
            newList.push(UUID);

        }

        taskState = "In-progress";
        taskActivity = "Researching";
        newObject.list[taskIndex]["supplierID"] = newList;
        
    }

    

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


export { 

        checkCapital, 
        titleCase, 
        createClass, 
        isEmpty, 
        uuidv4, 
        splitByCapitalNums, 
        updateSupplierTask,
        toProperCase

 }