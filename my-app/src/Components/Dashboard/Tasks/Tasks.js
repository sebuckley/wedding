import '../Dashboard.css';
import TaskFilter from './taskFilter.js';
import TaskSort from './taskSort.js';
import Login from '../../Login/Login';
import ListTasks from '../../Wigits/listTasks';
import { getTaskList, saveTaskListItem, getTaskIndex, saveTaskList } from '../../Wigits/dataFunctions-taskList';
import { isEmpty } from '../../Wigits/dataFunctions';
import Header from '../../Wigits/Header/header';
import { useState, useEffect } from 'react';
import AddTask from './addTask.js';
import Loading from '../../PublicSite/Components/loading/loading';
import ListTasksGroupType from '../../Wigits/listTasksGroupType.js';
import ListTasksGroupPhase from '../../Wigits/listTasksGroupPhase.js';
import ListTasksOrder from '../../Wigits/listTasksOrder.js';
export default function Tasks(props){

    const user = props.user;
    const setUser = props.setUser;
    const loading = props.loading;
    const setLoading = props.setLoading;
    const loggedIn = props.loggedIn;
    const setLoggedin = props.setLoggedin;
    const settings = props.settings;
    const setSettings = props.setSettings;
    const getPhases = props.getPhases;
    const getGroups = props.getGroups;
  

    const pathName = window.location.search;
    let filterName;

    if(pathName !== ""){

      const url = new URL(window.location.href);
      url.search = ''; // Clear the search query
      window.history.replaceState({}, document.title, url.toString());

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
    const [taskFiltered, setTaskFiltered] = useState(settings["tasks"].filter.state);
    const [taskSortedBy, setTaskSortedBy] = useState(settings["tasks"].sort.taskSortedBy);
    const [taskSorted, setTaskSorted] = useState(settings["tasks"].sort.taskSorted);
    const [taskGroupBy, setTaskGroupBy] = useState(settings["tasks"].sort.taskGroupedBy);
    const [taskListConfirmed, setTaskListConfirmed] = useState("");

    if(taskListConfirmed === "" || taskListConfirmed === undefined){

      console.log(taskList.listConfirmed);

      setTaskListConfirmed(taskList.listConfirmed);

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

      const row = e.target.closest('.row');
      const inputID = row.querySelector('.inputID');
      const UUID = inputID.textContent || inputID.value;

      const task = row.querySelector('.taskName');
      const taskName = task.textContent || task.value;

      const s = row.querySelector('.state');
      const state = s.textContent || s.value;

      const a = row.querySelector('.activity');
      const activity = a.textContent || a.value;

      const toDoDate  = itemDate;

      const index = getTaskIndex(taskList, UUID);
      const currentState = taskList.list[index].state;
      let updatedTaskList = {...taskList};

      if(currentState === "" || currentState === "To-do"){ 

        updatedTaskList.list[index]["state"] = "In-progress";
        updatedTaskList.list[index]["activity"] = "Planned";
        updatedTaskList.list[index]["toDoDate"] = toDoDate;
        updatedTaskList.list[index]["lastUpdatedBy"] = user.email;
        updatedTaskList.list[index]["lastUpdated"] = currentDate;

      }else{

        updatedTaskList.list[index]["toDoDate"] = toDoDate;
        updatedTaskList.list[index]["lastUpdatedBy"] = user.email;
        updatedTaskList.list[index]["lastUpdated"] = currentDate;

      }

      setTaskList(updatedTaskList);
      saveTaskList(updatedTaskList);

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

  const confirmTasks = () => {

    setTaskListConfirmed(true);

    let newTaskList = { ...taskList, listConfirmed: true}

    setTaskList(newTaskList);
    saveTaskList(newTaskList);


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

        <AddTask setTaskList={ setTaskList } taskList={ taskList } user={ user } getGroups={ getGroups } getPhases={ getPhases }/>

        <TaskFilter setTaskFiltered={ setTaskFiltered } filterName={ taskFiltered } settings={ settings } setSettings={ setSettings }/>
        <TaskSort setTaskSorted={ setTaskSorted } taskSorted={ taskSorted } setTaskSortedBy={ setTaskSortedBy } taskSortedBy={ taskSortedBy } taskGroupBy={ taskGroupBy } setTaskGroupBy={ setTaskGroupBy } settings={ settings } setSettings={ setSettings }/>

        <div id='tasks'>

            <h2>Tasks</h2>

            { taskList !== "" && taskGroupBy === "none" ? <ListTasks taskList={ taskList } onChangeDate={ onChangeDate } taskFiltered={ taskFiltered } taskSorted={ taskSorted } taskSortedBy={ taskSortedBy } setTaskList={ setTaskList } taskListState={ taskListState } setTaskListState={ setTaskListState }/> : "" }

            { taskList !== "" && taskGroupBy === "group" ? <ListTasksGroupType taskList={ taskList } onChangeDate={ onChangeDate } taskFiltered={ taskFiltered } taskSorted={ taskSorted } taskSortedBy={ taskSortedBy } setTaskList={ setTaskList } taskListState={ taskListState } setTaskListState={ setTaskListState } getGroups={ getGroups }/> : "" }

            { taskList !== "" && taskGroupBy === "phase" ? <ListTasksGroupPhase taskList={ taskList } onChangeDate={ onChangeDate } taskFiltered={ taskFiltered } taskSorted={ taskSorted } taskSortedBy={ taskSortedBy } setTaskList={ setTaskList } taskListState={ taskListState } setTaskListState={ setTaskListState } getPhases={ getPhases }/> : "" }

            { taskList !== "" && taskGroupBy === "order" ? <ListTasksOrder taskList={ taskList } onChangeDate={ onChangeDate } taskFiltered={ taskFiltered } taskSorted={ taskSorted } taskSortedBy={ taskSortedBy } setTaskList={ setTaskList } taskListState={ taskListState } setTaskListState={ setTaskListState }/> : "" }

            { !taskListConfirmed ? <button className="deleteButton" onClick={ confirmTasks }>Confirm Tasks</button> : null }

        </div>

          

      </div>

    </div>
      
  )
    
}