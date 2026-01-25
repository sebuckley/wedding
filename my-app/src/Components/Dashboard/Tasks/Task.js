import '../Dashboard.css';

import { useLocation  } from 'react-router-dom';
import Login from '../../Login/Login';
import Header from '../../Wigits/Header/header';
import UpdateTask from './updateTask';
import { getTaskIndex } from '../../Wigits/dataFunctions-taskList';
import Loading from '../../PublicSite/Components/loading/loading';
import { useState, useEffect} from 'react';

export default function Task(props){
  
    const user = props.user;
    const setUser = props.setUser;
    const loading = props.loading;
    const setLoading = props.setLoading;
    const loggedIn = props.loggedIn;
    const setLoggedin = props.setLoggedin;
    const getPhases = props.getPhases;
    const getGroups = props.getGroups;

    const getGuestData = props.getGuestData;

    const bridalParty = props.bridalParty;
    const taskList = props.taskList;
    const setTaskList = props.setTaskList;
    const getRoles = props.getRoles;

    const [selectedTaskId, setSelectedTaskId] = useState("");

    const location = useLocation();
    const search = location.search;
    const taskIDParam = search.split("=")[1];
    let index;


  
    if(selectedTaskId !==""){

      index = getTaskIndex(taskList, selectedTaskId);
      const task = taskList.list[index];

    }
    
    const handleTaskSelect = (e) => {

        console.log("Task selected:", e.target.value);
        const selectedId = e.target.value;
        setSelectedTaskId(selectedId);

    };

    console.log("Selected Task ID:", selectedTaskId);

    const selectedIndex = selectedTaskId !=="" ? getTaskIndex(taskList, selectedTaskId) : null;

    useEffect(() => {

        if (taskIDParam) {

            setSelectedTaskId(taskIDParam);
            let url = new URL(window.location.href);

            console.log(url)
            const a = url.href.split('?');
             // Clear the search query  
            window.history.replaceState({}, document.title, a[0]);

        }

    }, [selectedTaskId]);

    if(loading){
   
      return <Loading bridalParty={ bridalParty } user={ user }/>
   
    }

    if(user === null) {
  
      return <Login setUser={ setUser } loading={loading} setLoading={ setLoading } bridalParty={ bridalParty } />
  
    }


    return(

        <div>

            <Header 
              firstName={ bridalParty.first.firstName } 
              sName={ bridalParty.second.firstName } 
              displayPublic={ false } 
              loggedIn={ loggedIn } 
              setLoggedin={ setLoggedin }
            />

            <div className="adminBody">

              { console.log("Rendering UpdateTask with index:", selectedIndex) }
               
             { selectedTaskId !== "" ? <UpdateTask 

                taskIDParam={ selectedTaskId } 
                setTaskList={ setTaskList } 
                taskList={ taskList } 
                task={ taskList.list[index] }
                getPhases={ getPhases }
                getGroups={ getGroups }
                index={ index } 
                getRoles={ getRoles } 
                bridalParty={ bridalParty } 
                user={ user }
                loading={ loading }
                setLoading={ setLoading }
                getGuestData={ getGuestData }

              /> : (
                <div className="taskSelector">

                  <h2>Select a Task</h2>

                  <select value={ selectedTaskId } onChange={ handleTaskSelect }>
                    <option value="">-- Choose a task --</option>
                    
                    {taskList.list && taskList.list.map((task, idx) => (

                      

                      <option key={ idx } value={ task.taskID }>{ task.taskName }</option>

                    ))}

                  </select>
                  
                  { selectedIndex !== null && selectedTaskId && <UpdateTask 

                    taskIDParam={ selectedTaskId } 
                    setTaskList={ setTaskList } 
                    taskList={ taskList } 
                    index={ selectedIndex } 
                    getRoles={ getRoles } 
                    getGroups={ getGroups }
                    getPhases={ getPhases }
                    bridalParty={ bridalParty } 
                    user={ user }
                    loading={ loading }
                    setLoading={ setLoading }
                    getGuestData={ getGuestData }

                  /> }
                </div>
              ) }

            </div>

        </div>
    
       
    )
    
}