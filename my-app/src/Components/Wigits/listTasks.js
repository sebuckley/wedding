import { useState } from "react";
import { splitByCapitalNums } from "./dataFunctions";
import { getTaskIndex, deleteTaskListItem } from "./dataFunctions-taskList";
import { getSupplierName } from "./dataFunctions-suppliers";


const ListTasks = (props) => {

  // Destructure props for easier access
  const taskList = props.taskList;
  const setTaskList = props.setTaskList;
  const taskSorted = props.taskSorted;
  const taskSortedBy = props.taskSortedBy;
  const onChange = props.onChange;
  const onChangeDate = props.onChangeDate;
  const taskFiltered = props.taskFiltered;
  const [taskListUpdated, setThisListUpdated] = useState(0);
  
  const selectOptionState = (className, state) => {

    let currentState;

    if(state ===""){

      currentState = "To-do";

    }else{
  
      currentState = state;

    }

    return(

      <select className={ className } onChange={ onChange } defaultValue={ currentState }>

        <option value="To-do">To-do</option>
        <option value="In-progress">In-progress</option>
        <option value="Completed">Completed</option>

      </select>

    )


  }

  const selectOptionActivity = (className, activity) => {

    let currentState;

    if(activity ===""){

      currentState = "Not started";

    }else{
  
      currentState = activity;

    }

    return(

      <select className={ className } onChange={ onChange } defaultValue={ currentState }>

        <option value="Not started">Not started</option>
        <option value="Planned">Planned</option>
        <option value="Researching">Researching</option>
        <option value="Enquiry made">Enquiry made</option>
        <option value="Selected">Selected</option>

      </select>

    )


  }

  const addDate = (date, type) => {

    let returnObject;
    let currentDate;

    if (date === "" || date === null) {

      currentDate = "";

    }else{

      if(type === "input"){

        currentDate = new Date(date).toISOString().split('T')[0];

      }else{

        currentDate = new Date(date);
        let year = currentDate.getFullYear();
        let month = currentDate.getMonth()+1;
        let dt = currentDate.getDate();

        if (dt < 10) {
          dt = '0' + dt;
        }
        if (month < 10) {
          month = '0' + month;
        }
        currentDate = dt + '/' + month + '/' + year;

      }
      
    }

    if(type === "input"){

      
      returnObject = <input type='date' onChange={ onChangeDate } className="dateInput inputBox2" value={ currentDate }></input>


    }else{

      returnObject = currentDate

    }

    return returnObject;

  }

  const sortList = (array, sortBy="taskName", type="asc") => {

      if(sortBy === "taskName"){

        if(type === "asc"){

          array.sort((a, b) => {

            return a.taskName.localeCompare(b.taskName);
          
          }); 

        }else{

          array.sort((a, b) => b.taskName.localeCompare(a.taskName)); 

        }

      }else if(sortBy === "date"){

        if(type === "asc"){

          array.sort((a, b) => new Date(a.updated) - new Date(b.updated)); 

        }else{

          array.sort((a, b) =>  new Date(b.updated) - new Date(a.updated)); 

        }


      }else if(sortBy === "type"){

        if(type === "asc"){

          array.sort((a, b) => a.state.localeCompare(b.state)); 

        }else{

          array.sort((a, b) => b.state.localeCompare(a.state)); 

        }

      }

      return array;

  }

  const deleteTaskItem = (event) =>{

     const checkAction = window.confirm("Are you sure you want to delete the guest?");

        if(checkAction){

            const UUID = event.target.parentNode.nextSibling.innerText;
            const itemIndex = getTaskIndex(taskList,UUID);
            const newList = deleteTaskListItem(taskList,itemIndex);

            setTaskList(newList);
            const newSate = taskListUpdated + 1;
            setThisListUpdated(newSate);

        }

  }

  const getSupplierLink = (a) => {

    const name = getSupplierName(a);
    const link = "./supplier/?supplierID=" + a;

    return <a href={link}>{name}</a>

  }

  const linkSuppliers = (a,name, state, activity) => {

    let link;
    let newName;

    if(state === "In-progress" && activity === "Planned"){

      link = "./suppliers/?add=" + a;
      newName = "Add suppliers for " + splitByCapitalNums(a);

    }else{

      link = "./suppliers/?filter=" + a;
      newName = "Suppliers for " + splitByCapitalNums(a);

    }

    return <a href={ link }>{ newName }</a>

  }

  const generateList = (dataList) => {

    let itemList = sortList(dataList.list, taskSortedBy, taskSorted);

    itemList = itemList.map((value) => {

      let taskName;
      let taskNameSplit;
      let state;
      let activity;
      let toDoDate;
      let itemID;
      let updated;
      let supplierID

      taskName = value.taskName;
      taskNameSplit = splitByCapitalNums(taskName);
      itemID = value.itemID;
      state = value.state.trim();
      activity = value.activity.trim();
      updated = value.updated;
      toDoDate = value.toDoDate;
      supplierID = value.supplierID;

      if(taskFiltered === "All"){

          return(

              <li key={ itemID }>

                <div className="col-4">
                  
                  { taskNameSplit }:

                </div>

                <div className="state col-1 state">
              
                  { state }
                
                </div>

                <div className="state col-1 activity">
              
                  { activity }
                
                </div>

                <div className="inputDateText col-2">
              
                  { addDate(updated,"text") }

                </div>

                <div className="inputDate col-2">
              
                  { state !== "Completed" ? addDate(toDoDate, "input") : getSupplierLink(supplierID, "Supplier Record") }

                </div>

                <div className="inputDelete col-2">
              
                  { state === "To-do" ? <button className="deleteButton" onClick={ deleteTaskItem }>Delete</button> : ""}
                  { state === "In-progress" ? linkSuppliers(taskName, "Suppliers", state, activity) : "" }

                </div>

                <div className="inputID" style={{"display": "none"}}>
              
                  { itemID }

                </div>

                <div className="taskName" style={{"display": "none"}}>
              
                  { taskName }

                </div>

              </li>

          )

      }else{

        let toDo;
        let filterType;

        if(taskFiltered === "To-do" || taskFiltered === "In-progress" || taskFiltered === "Completed"){

          filterType = "state";

        }else{

          filterType = "activity";

        }

        if(filterType === "state"){

          if(taskFiltered === value.state || toDo){

            return(

              <li key={ itemID }>

                  <div className="titleName col-3">
                    
                    { splitByCapitalNums(taskName) }:

                  </div>

                  <div className="state col-2">
                
                    { state }
                  
                  </div>

                  <div className="state col-2">
                
                    { activity }
                  
                  </div>

                  <div className="inputDate col-2">
                
                    { addDate(toDoDate) }

                  </div>

                  <div className="inputDelete col-2">
                
                    <button className="deleteButton" onClick={ deleteTaskItem }>Delete</button>

                  </div>

                  <div className="inputID" style={{"display": "none"}}>
                
                    { itemID }

                  </div>

                  <div className="taskName" style={{"display": "none"}}>
                
                    { taskName }

                  </div>

                </li>

            )

          }

        }else{

          if(taskFiltered === value.activity){

            return(

              <li key={ itemID }>

                  <div className="titleName col-3">
                    
                    { splitByCapitalNums(taskName) }:

                  </div>

                  <div className="state col-2">
                
                    { selectOptionState(taskName  + " state", state) }
                  
                  </div>

                  <div className="state col-2">
                
                    { selectOptionActivity(taskName + " activity", activity) }
                  
                  </div>

                  <div className="inputDate col-2">
                
                    { addDate(toDoDate) }

                  </div>

                  <div className="inputDelete col-2">
                
                    <button className="deleteButton" onClick={ deleteTaskItem }>Delete</button>

                  </div>

                  <div className="inputID" style={{"display": "none"}}>
                
                    { itemID }

                  </div>

                  <div className="taskName" style={{"display": "none"}}>
                
                    { taskName }

                  </div>

              </li>

            )

          }

        }

      }

    })

    return itemList;

  }
   
  return (

    <ul> { generateList(taskList) } </ul>

  )

};

export default ListTasks;