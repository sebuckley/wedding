import '../Dashboard.css';
import { useEffect, useState } from 'react';
import { useLocation, useSearchParams  } from 'react-router-dom';
import Login from '../../Login/Login';
import Header from '../../Wigits/Header/header';
import AddSupplier from './addSupplier';
import Loading from '../../PublicSite/Components/loading/loading';
import { getTaskIndex } from '../../Wigits/dataFunctions-taskList';
import SupplierList from './suppliersList';
import SupplierFilter from './supplierFilter';
import SupplierSort from './supplierSort';
import { saveSupplierList } from '../../Wigits/dataFunctions-suppliers';

export default function Suppliers(props){

    const location = useLocation();

    const settings = props.settings;
    const setSettings = props.setSettings;


    const [supplierFilterState, setSupplierFilterState] = useState("All");
    const [supplierFilterTask, setSupplierFilterTask] = useState("");
    const [taskIndex, setTaskIndex] = useState("");
    const [taskName, setTaskName] = useState("");
    const [taskTypeID, setTaskTypeID] = useState("");
    const [display, setDisplay] = useState("");
    const [supplierSortedBy, setSupplierSortedBy] = useState(settings["suppliers"].sort.supplierSortedBy);
    const [supplierSorted, setSupplierSorted] = useState(settings["suppliers"].sort.supplierSorted);
    const [stateChange, setStateChange] = useState(0);

    const user = props.user;
    const setUser = props.setUser;
    const loading = props.loading;
    const setLoading = props.setLoading;
    const loggedIn = props.loggedIn;
    const setLoggedin = props.setLoggedin;
    const taskList = props.taskList;
    const setTaskList = props.setTaskList;
    const supplierBooked = props.supplierBooked;
   
    const bridalParty = props.bridalParty;
    const wedding = props.wedding;
    const setSupplierList = props.setSupplierList;
    const supplierList = props.supplierList;
    const supplierStatuses = props.supplierStatuses;  
    const detailsLocation = bridalParty.weddingDetails.location;
    let currentDisplay;

    let paramID;
    let paramName;
    let filterName;
    let filterName2;

    // check if display param exists
    if(display !== ""){

      currentDisplay = display;

    }else{

      currentDisplay = false;

    }

    if(display === "" || display !== currentDisplay){

      setDisplay(currentDisplay);

    }

    // get and clear params on load
    useEffect(() => {

      
      const search = location.search; // e.g., #/path?param1=value1&param2=value2
      let filterParam = search.split("=")[1];
      let filterAdd = search.split("=")[0];
      let getTaskTypeID;

      if (filterParam) {

          let url = new URL(window.location.href);

          const a = url.href.split('?');
            // Clear the search query  
          window.history.replaceState({}, document.title, a[0]);

          if(taskList){

            const index = getTaskIndex(taskList, filterParam);
            setTaskIndex(index);
            getTaskTypeID = taskList.list[index].taskID;
            setTaskTypeID(getTaskTypeID);
            setTaskName(taskList.list[index].taskName);

            if(filterAdd === "?add"){

              currentDisplay = true;
              setDisplay(currentDisplay);

            }else{

              currentDisplay = display;
              setDisplay(currentDisplay);

            }

          }


      }


    if(filterParam){

      setSupplierFilterState(settings["suppliers"].filter.state);
      setSupplierFilterTask(getTaskTypeID);

    }else{

      setSupplierFilterState(settings["suppliers"].filter.state);
      setSupplierFilterTask(settings["suppliers"].filter.type);

    }

    }, []);

   
    const getSearchText = (data) => {

        if(typeof data === "undefined" || data === null){

            return "";  

        }

        let searchName = data.split(" ").join("+");
        searchName = searchName + "+" + detailsLocation;

        return searchName;

    }

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

              <AddSupplier 

                  setSupplierList={ setSupplierList } 
                  supplierList={ supplierList } 
                  taskList={ taskList } 
                  setTaskList={ setTaskList } 
                  setStateChange={ setStateChange } 
                  stateChange={ stateChange } 
                  supplierStatuses={ supplierStatuses } 
                  user={ user }
                  display={ display } 
                  setDisplay={ setDisplay } 
                  taskName={ taskName } 
                  taskID={ taskTypeID } 
                  location={ detailsLocation } 
                  getSearchText={ getSearchText }

                />

              <SupplierFilter setSupplierFilter={ setSupplierFilterState } filterName={ supplierFilterState } settings={ settings } setSettings={ setSettings }  />
              <SupplierSort setSupplierSorted={ setSupplierSorted } supplierSorted={ supplierSorted } setSupplierSortedBy={ setSupplierSortedBy } supplierSortedBy={ supplierSortedBy } setSupplierFilterTask={ setSupplierFilterTask } supplierFilterTask={ supplierFilterTask } taskList={ taskList } setStateChange={ setStateChange } stateChange={ stateChange } settings={ settings } setSettings={ setSettings } />
              
              { taskName !== "" && !display ? <a href={ "https://www.google.com/search?q=" + getSearchText(taskName) } target="_blank" >Search for { taskName }</a> : "" }
            

              { supplierList.length === 0 ? "No suppliers in list": "" }
              { supplierList.length > 0 ? <SupplierList 
                                              wedding={ wedding } 
                                              setSupplierList={ setSupplierList } 
                                              supplierList={ supplierList } 
                                              supplierFilter={ supplierFilterState } 
                                              supplierFilterTask={ supplierFilterTask } 
                                              supplierSorted={ supplierSorted } 
                                              supplierSortedBy={ supplierSortedBy } 
                                              setStateChange={ setStateChange } 
                                              stateChange={ stateChange } 
                                              supplierStatuses={ supplierStatuses }
                                              user={ user }
                                              setTaskList={ setTaskList }
                                              taskList={ taskList }
                                              taskType={ supplierFilterTask }
                                              supplierBooked={ supplierBooked }
                                            /> : "" }
              
               
            </div>

        </div>
    
       
    )
    
}