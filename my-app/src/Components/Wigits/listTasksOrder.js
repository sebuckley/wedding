import { useState } from "react";
import { Link  } from 'react-router-dom';

import { getTaskIndex, deleteTaskListItem } from "./dataFunctions-taskList";
import { getSupplierName } from "./dataFunctions-suppliers";
import { splitByCapitalNums } from "./dataFunctions";
import TaskRow from "./taskRow";


const ListTasks = (props) => {

  // Destructure props for easier access
  const taskList = props.taskList;
  const taskListConfirmed = taskList.listConfirmed;
  const setTaskList = props.setTaskList;
  const taskSorted = props.taskSorted;
  const taskSortedBy = props.taskSortedBy;
  const onChangeDate = props.onChangeDate;
  const taskFiltered = props.taskFiltered;
  const [taskListUpdated, setThisListUpdated] = useState(0);
  

  const sortList = (array, type="asc") => {

    if(type === "asc"){

      array.sort((a, b) => {

        return a.order - b.order;
      
      }); 

    }else{

      array.sort((a, b) => b.order - a.order); 

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
    const link = "/managemywedding/supplier/?supplierID=" + a;

    return <Link to={link}>{name}</Link>

  }

  const linkSuppliers = (name, state, activity, supplierID) => {

    let link;
    let newName;

    if(state === "In-progress" && activity === "Planned"){

      link = "/managemywedding/suppliers/?add=" + supplierID;
      newName = "Add suppliers for " + splitByCapitalNums(name);

    }else{

      link = "/managemywedding/suppliers/?filter=" + supplierID;
      newName = "Suppliers for " + splitByCapitalNums(name);

    }

    return <Link to={ link }>{ newName }</Link>

  }

  const generateList = (dataList) => {

    let itemList = sortList(dataList.list, taskSorted);

    itemList = itemList.map((value) => {

      let taskName;
      let taskNameSplit;
      let state;
      let activity;
      let toDoDate;
      let taskID;
      let updated;
      let supplierID

      taskName = value.taskName;
      taskNameSplit = splitByCapitalNums(taskName);
      taskID = value.taskID;
      state = value.state.trim();
      activity = value.activity.trim();
      updated = value.updated;
      toDoDate = value.toDoDate;
      supplierID = value.supplierID;




      if(taskFiltered === "All"){

          return(

             <TaskRow 

                taskID={ taskID }
                taskName={ taskName }
                state={ state }
                activity={ activity }
                toDoDate={ toDoDate }
                deleteTaskItem={ deleteTaskItem }
                onChangeDate={ onChangeDate }
                linkSuppliers={ linkSuppliers}
                getSupplierLink= { getSupplierLink }
                supplierID={ supplierID }
                taskListConfirmed ={ taskListConfirmed }
                
              ></TaskRow>
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

             <TaskRow 
             
              taskID={ taskID }
              taskName={ taskName }
              state={ state }
              activity={ activity }
              toDoDate={ toDoDate }
              deleteTaskItem={ deleteTaskItem }
              onChangeDate={ onChangeDate }
              linkSuppliers={ linkSuppliers}
              getSupplierLink= { getSupplierLink }
              taskListConfirmed ={ taskListConfirmed }

              ></TaskRow>

            )

          }

        }else{

          if(taskFiltered === value.activity){

            return(

             <TaskRow 
             
              taskID={ taskID }
              taskName={ taskName }
              state={ state }
              activity={ activity }
              toDoDate={ toDoDate }
              deleteTaskItem={ deleteTaskItem }
              onChangeDate={ onChangeDate }
              linkSuppliers={ linkSuppliers}
              getSupplierLink= { getSupplierLink }
              taskListConfirmed ={ taskListConfirmed }

              ></TaskRow>

            )

          }

        }

      }

    })

    return itemList;

  }
   
  return (

    <div> { generateList(taskList) } </div>

  )

};

export default ListTasks;