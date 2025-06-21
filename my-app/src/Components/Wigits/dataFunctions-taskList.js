const  getTaskList = () => {

    const checkItem = JSON.parse(localStorage.getItem("taskList"));
    return checkItem;

}

const saveTaskList = (list) => {

    const setItem = localStorage.setItem("taskList", JSON.stringify(list));

    if(setItem){

        return true;

    }else{

        return false;

    }

}

const saveTaskListItem = (taskList, index, key, value) => {

    const setValue = taskList.list[index][key] = value;
    
    if(!setValue){

        throw Error;

    }
    const set = saveTaskList(taskList);

    if(set){

        return true;

    }else{

        return false;

    }

}

const checkExistingTask = (taskList, value) => {

    let existing = false

    for(let i = 0; i < taskList.length; i++){

        if(taskList.list[i].taskName === value){

            existing = true;
            break;

        }

    }

    return existing;

}

const getTaskIndex = (taskList, UUID) => {

    for(let i = 0; i < taskList.list.length; i++){

        if(taskList.list[i].itemID === UUID){

            return i;

        }

    }

}

const deleteTaskListItem = (taskList, index) =>{

    taskList.list.splice(index, 1);
    taskList.length = taskList.list.length;
    saveTaskList(taskList);
    
    return taskList;

}




export { getTaskList, checkExistingTask, saveTaskList, saveTaskListItem, getTaskIndex, deleteTaskListItem } 
  