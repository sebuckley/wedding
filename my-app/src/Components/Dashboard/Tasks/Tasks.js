import '../Dashboard.css';
import TaskFilter from './taskFilter.js';
import TaskSort from './taskSort.js';
import Login from '../../Login/Login';
import ListTasks from '../../Wigits/listTasks';
import { getTaskList, saveTaskListItem, getTaskIndex } from '../../Wigits/dataFunctions-taskList';
import { isEmpty } from '../../Wigits/dataFunctions';
import Header from '../../Wigits/Header/header';
import { useState, useEffect } from 'react';
import AddTask from './addTask.js';

export default function Tasks(props){
  
    const { token, setToken } = props.useToken();
    const bridalParty = props.bridalParty;
    const taskList = props.taskList;
    const setTaskList = props.setTaskList;

    const [taskListState, setTaskListState] = useState({});
    const [taskFiltered, setTaskFiltered] = useState("All");
    const [taskSortedBy, setTaskSortedBy] = useState("taskName");
    const [taskSorted, setTaskSorted] = useState("asc");

    const onChange = (e) => {

      const itemName = e.target.className;
      const itemValue = e.target.value;
      const itemSplit = itemName.split(" ");
      const currentDate = new Date();
      const user = token.user;
      let state;
      let taskName;
      let activity;
      let toDoDate;
      let note;

      if(itemSplit[itemSplit.length - 1] === "state"){

          taskName = e.target.parentNode.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.innerText;
          state = itemValue;
          activity = e.target.parentNode.nextSibling.querySelector(".activity").value;
          toDoDate  = e.target.parentNode.nextSibling.nextSibling.querySelector(".dateInput").value;
          const UUID = e.target.parentNode.nextSibling.nextSibling.nextSibling.nextSibling.innerText;
          const index = getTaskIndex(taskList, UUID);
          let noteStructure;

          note = window.prompt("Enter a note:");

          if(note){

            noteStructure = {

              date: new Date(),
              note: note

            }

          }else{

             noteStructure = {

              date: new Date(),
              note: "No note recorded"

            }

          }

          let notes = taskList.list[index].notes;

          if(typeof notes === "undefined"){

            notes = [];

          }

          notes.push(noteStructure);

          saveTaskListItem(taskList, index, "state", itemValue);
          saveTaskListItem(taskList, index, "toDoDate", currentDate);
          saveTaskListItem(taskList, index, "lastUpdatedBy", user);
          saveTaskListItem(taskList, index, "lastUpdated", currentDate);
          saveTaskListItem(taskList, index, "notes", notes);

          e.target.parentElement.nextSibling.nextSibling.children[0].value = currentDate.toISOString().split('T')[0];

      }else{

        const UUID = e.target.parentNode.nextSibling.nextSibling.nextSibling.innerText;
        const index = getTaskIndex(taskList, UUID);
        const currentState = taskList.list[index].state;
        taskName = e.target.parentNode.nextSibling.nextSibling.nextSibling.nextSibling.innerText;
        state = e.target.parentNode.previousSibling.querySelector(".state").value;
        activity = itemValue;


        let noteStructure;

        note = window.prompt("Enter a note:");

        if(note){

          noteStructure = {

            date: new Date(),
            note: note

          }

        }else{

            noteStructure = {

            date: new Date(),
            note: "No note recorded"

          }

        }

        let notes = taskList.list[index].notes;

        if(typeof notes === "undefined"){

          notes = [];

        }

        notes.push(noteStructure);

        let selectState = e.target.parentElement.previousSibling.querySelector(".state");

        

        if(currentState === "" || currentState === "To-do"){

          if(activity === "Selected"){

            selectState.value = "Completed";
            saveTaskListItem(taskList, index, "state", "Completed");

          }else{

            selectState.value = "In-progress";
            saveTaskListItem(taskList, index, "state", "In-progress");

          }
  
          saveTaskListItem(taskList, index, "activity", activity);
          saveTaskListItem(taskList, index, "toDoDate", currentDate);
          saveTaskListItem(taskList, index, "lastUpdatedBy", user);
          saveTaskListItem(taskList, index, "lastUpdated", currentDate);

        }else{

          if(activity === "Selected"){

            selectState.value = "Completed";
            saveTaskListItem(taskList, index, "state", "Completed");

          }

          saveTaskListItem(taskList, index, "activity", activity);
          saveTaskListItem(taskList, index, "toDoDate", currentDate);
          saveTaskListItem(taskList, index, "lastUpdatedBy", user);
          saveTaskListItem(taskList, index, "lastUpdated", currentDate);

        }

        saveTaskListItem(taskList, index, "note", notes);

        e.target.parentElement.nextSibling.children[0].value = currentDate.toISOString().split('T')[0];

      }

      let obj = {

        state: state,
        activity: activity,
        toDoDate: currentDate

      }

      setTaskListState({...taskListState, [taskName]:obj});

    }

    const onChangeDate = (e) => {

      const itemValue = e.target.value;
      const currentDate = new Date();
      const itemDate = new Date(itemValue);

      if(itemDate <= currentDate){

        if(itemDate === currentDate){

          alert("You can not put in todays date, please select a date in the future");

        }else{

          alert("You can not put in a past date, please select a date in the future");

        }

        return;
        
      }

      const user = token.user;
      const UUID = e.target.parentNode.nextSibling.nextSibling.innerText;
      const taskName = e.target.parentNode.nextSibling.nextSibling.nextSibling.innerText;
      const state = e.target.parentNode.previousSibling.previousSibling.querySelector(".state").value;
      let activity = e.target.parentNode.previousSibling.querySelector(".activity").value;
      const toDoDate  = itemDate;

      const index = getTaskIndex(taskList, UUID);
      const currentState = taskList.list[index].state;
      let note;
      let noteStructure;

      note = window.prompt("Enter a note:");

      if(note){

        noteStructure = {

          date: new Date(),
          note: note

        }

      }else{

          noteStructure = {

          date: new Date(),
          note: "No note recorded"

        }

      }

      let notes = taskList.list[index].notes;

      if(typeof notes === "undefined"){

        notes = [];

      }

      notes.push(noteStructure);

      if(currentState === "" || currentState === "To-do"){

        let stateSelector = e.target.parentElement.previousSibling.previousSibling.querySelector(".state");
        stateSelector.value = "In-progress";
        let activitySelector = e.target.parentElement.previousSibling.querySelector(".activity");
        activitySelector.value = "Planned";
        activity = "Planned";
        saveTaskListItem(taskList, index, "toDoDate", itemDate);
        saveTaskListItem(taskList, index, "state", "In-progress");
        saveTaskListItem(taskList, index, "activity", "Planned");
        saveTaskListItem(taskList, index, "lastUpdatedBy", user);
        saveTaskListItem(taskList, index, "lastUpdated", currentDate);

      }else{

        saveTaskListItem(taskList, index, "toDoDate", itemDate);
        saveTaskListItem(taskList, index, "lastUpdatedBy", user);
        saveTaskListItem(taskList, index, "lastUpdated", currentDate);

      }

      saveTaskListItem(taskList, index, "note", notes);

      let obj = {

        state: state,
        activity: activity,
        toDoDate: itemDate


      }

      setTaskListState({...taskListState, [taskName]:obj});

    }

    useEffect(() => {
          
      getTaskData();

    });

    if(!token) {
  
      return <Login setToken={ setToken } bridalParty={ bridalParty } />
  
    }

    const getTaskData = () =>{
      
      if(isEmpty(taskListState)){

        let getTaskData = getTaskList();

        setTaskList(getTaskData);

      }

    }

    return(

      <div>

        <Header fName={bridalParty.groom.fName} sName={bridalParty.bride.fName}/>

        <div className="adminBody">

        <AddTask setTaskList={ setTaskList }/>

        <TaskFilter setTaskFiltered={ setTaskFiltered }/>
        <TaskSort setTaskSorted={ setTaskSorted } taskSorted={ taskSorted } setTaskSortedBy={ setTaskSortedBy } taskSortedBy={ taskSortedBy } />

        <div id='tasks'>

            <h2>Tasks</h2>

            { taskList !== "" ? <ListTasks taskList={ taskList } onChange={ onChange } onChangeDate={ onChangeDate } taskFiltered={ taskFiltered } taskSorted={ taskSorted } taskSortedBy={ taskSortedBy } setTaskList={ setTaskList } taskListState={ taskListState } setTaskListState={ setTaskListState }/> : "" }

            </div>

        </div>

      </div>
       
    )
    
}