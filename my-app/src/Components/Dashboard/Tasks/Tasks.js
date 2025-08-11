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
import Loading from '../../PublicSite/Components/loading/loading';

export default function Tasks(props){

    const user = props.user;
    const setUser = props.setUser;
    const loading = props.loading;
    const setLoading = props.setLoading;
    const loggedIn = props.loggedIn;
    const setLoggedin = props.setLoggedin;

    const pathName = window.location.search;
    let filterName;

    if(pathName !== ""){

      const url = new URL(window.location.href);
      url.search = ''; // Clear the search query
      window.history.replaceState({}, document.title, url.toString());

      console.log(pathName);

      if(pathName === "?To-do"){

        filterName = "To-do";

      }else if(pathName === "?In-progress"){

        filterName = "In-progress";

      }else if(pathName === "?Completed"){

        filterName = "Completed";

      }else if(pathName === "?Not%20started"){

        filterName = "Not started";

      }else if(pathName === "?Planned"){

        filterName = "Planned";

      }else if(pathName === "?Researched"){

        filterName = "Researched";

      }else if(pathName === "?Enquiry%20Made"){

        filterName = "Enquiry made";

      }else if(pathName === "?Selected"){

        filterName = "Selected";

      }else{

        filterName = "All";

      }

    }else{

      filterName = "All";

    }
  

    const bridalParty = props.bridalParty;
    const taskList = props.taskList;
    const setTaskList = props.setTaskList;

    const [taskListState, setTaskListState] = useState({});
    const [taskFiltered, setTaskFiltered] = useState(filterName);
    const [taskSortedBy, setTaskSortedBy] = useState("taskName");
    const [taskSorted, setTaskSorted] = useState("asc");

    const onChange = (e) => {

      const itemName = e.target.className;
      const itemValue = e.target.value;
      const itemSplit = itemName.split(" ");
      const currentDate = new Date();
      let state;
      let taskName;
      let activity;
      let note;

      if(itemSplit[itemSplit.length - 1] === "state"){

          taskName = e.target.parentNode.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.innerText;
          state = itemValue;
          activity = e.target.parentNode.nextSibling.querySelector(".activity").value;
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

      const UUID = e.target.parentNode.nextSibling.nextSibling.innerText;
      const taskName = e.target.parentNode.nextSibling.nextSibling.nextSibling.innerText;
      console.log(e.target.parentNode.previousSibling.previousSibling.innerText)
      const state = e.target.parentNode.previousSibling.previousSibling.innerText;
      let activity = e.target.parentNode.previousSibling.innerText;
      const toDoDate  = itemDate;

      const index = getTaskIndex(taskList, UUID);
      const currentState = taskList.list[index].state;

      if(currentState === "" || currentState === "To-do"){

        let stateSelector = e.target.parentElement.previousSibling.previousSibling;
        stateSelector.innerText = "In-progress";
        let activitySelector = e.target.parentElement.previousSibling;
        activitySelector.innerText = "Planned";
        activity = "Planned";
        saveTaskListItem(taskList, index, "toDoDate", toDoDate);
        saveTaskListItem(taskList, index, "state", "In-progress");
        saveTaskListItem(taskList, index, "activity", "Planned");
        saveTaskListItem(taskList, index, "lastUpdatedBy", user.email);
        saveTaskListItem(taskList, index, "lastUpdated", currentDate);

      }else{

        saveTaskListItem(taskList, index, "toDoDate", toDoDate);
        saveTaskListItem(taskList, index, "lastUpdatedBy", user.email);
        saveTaskListItem(taskList, index, "lastUpdated", currentDate);

      }

      let obj = {

        state: state,
        activity: activity,
        toDoDate: toDoDate

      }

      setTaskListState({...taskListState, [taskName]:obj});

    }

  const getTaskData = () =>{
    
    if(isEmpty(taskListState)){

      let taskData = getTaskList();

      setTaskList(taskData);

    }

  }

  

    useEffect(() => {

      getTaskData();

    }, []);

    if(loading){

      return <Loading bridalParty={ bridalParty } user={ user }/>

    }

    if(user === null) {
  
      return <Login setUser={ setUser } loading={loading} setLoading={ setLoading } bridalParty={ bridalParty } />
  
    }

    return(

      <div>

         <Header firstName={ bridalParty.first.firstName } sName={ bridalParty.second.firstName } displayPublic={ false } loggedIn={ loggedIn } setLoggedin={ setLoggedin }/>

        <div className="adminBody">

        <AddTask setTaskList={ setTaskList }/>

        <TaskFilter setTaskFiltered={ setTaskFiltered } filterName={ taskFiltered }/>
        <TaskSort setTaskSorted={ setTaskSorted } taskSorted={ taskSorted } setTaskSortedBy={ setTaskSortedBy } taskSortedBy={ taskSortedBy } />

        <div id='tasks'>

            <h2>Tasks</h2>

            { taskList !== "" ? <ListTasks taskList={ taskList } onChange={ onChange } onChangeDate={ onChangeDate } taskFiltered={ taskFiltered } taskSorted={ taskSorted } taskSortedBy={ taskSortedBy } setTaskList={ setTaskList } taskListState={ taskListState } setTaskListState={ setTaskListState }/> : "" }

            </div>

        </div>

      </div>
       
    )
    
}