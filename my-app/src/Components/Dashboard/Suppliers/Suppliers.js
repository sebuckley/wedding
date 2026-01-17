import '../Dashboard.css';
import { useState } from 'react';
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
    const search = location.search; // e.g., #/path?param1=value1&param2=value2
    let filterParam = search.split("=")[1];
    let filterAdd = search.split("=")[0];
    const user = props.user;
    const setUser = props.setUser;
    const loading = props.loading;
    const setLoading = props.setLoading;
    const loggedIn = props.loggedIn;
    const setLoggedin = props.setLoggedin;
    const taskList = props.taskList;
    const setTaskList = props.setTaskList;
    const supplierBooked = props.supplierBooked;
    const settings = props.settings;
    const setSettings = props.setSettings;
    let paramID;
    let paramName;
    let filterName;
    let filterName2;
    let currentDisplay;
    const [display, setDisplay] = useState("");

    if(typeof filterParam === "undefined" || filterParam === null){

      paramName = "";
      paramID = "";
      filterParam = "";

      if(display !== ""){

        currentDisplay = display;

      }else{

        currentDisplay = false;

      }
      

    }else{
      
      if(filterAdd === "?add"){

        currentDisplay = true;

        if(taskList){

          const index = getTaskIndex(taskList, filterParam);
          paramID = taskList.list[index].taskID;
          paramName = taskList.list[index].taskName;
          

        }else{

          paramName = "";
          paramID = "";

        }

      }else{

        currentDisplay = display;

        if(taskList){

          const index = getTaskIndex(taskList, filterParam);
          paramID = taskList.list[index].taskID;
          paramName = taskList.list[index].taskName;

        }else{

          paramName = "";
          paramID = "";

        }

      }


    }

    
    const [taskType, setTaskType] = useState(filterParam);
    const clearSearch = useSearchParams();

    if(taskType !== ""){

      filterName = settings["suppliers"].filter.state;
      filterName2 = filterParam;

    }else{

      filterName = settings["suppliers"].filter.state;
      filterName2 = settings["suppliers"].filter.type;

    }

    const bridalParty = props.bridalParty;
    const wedding = props.wedding;
    const setSupplierList = props.setSupplierList;
    const supplierList = props.supplierList;
    const supplierStatuses = props.supplierStatuses;  
    const detailsLocation = bridalParty.weddingDetails.location;
    const [supplierFilter, setSupplierFilter] = useState(filterName);
    const [supplierFilter2, setSupplierFilter2] = useState(filterName2);
    const [supplierSortedBy, setSupplierSortedBy] = useState(settings["suppliers"].sort.supplierSortedBy);
    const [supplierSorted, setSupplierSorted] = useState(settings["suppliers"].sort.supplierSorted);
    

    if(display === "" || display !== currentDisplay){

      setDisplay(currentDisplay);

    }

    const [stateChange, setStateChange] = useState(0);

    const getSearchText = (data) => {

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

              <AddSupplier setSupplierList={ setSupplierList } supplierList={ supplierList } taskList={ taskList } setTaskList={ setTaskList } setStateChange={ setStateChange } stateChange={ stateChange } supplierStatuses={ supplierStatuses } user={ user } display={ display } setDisplay={ setDisplay } taskName={ paramName } taskID={ paramID } location={ detailsLocation } getSearchText={ getSearchText }/>

              {/* <ListType setListType={ setListType } listType={ listType } /> */}

              <SupplierFilter setSupplierFilter={ setSupplierFilter } filterName={ supplierFilter } settings={ settings } setSettings={ setSettings }  />
              <SupplierSort setSupplierSorted={ setSupplierSorted } supplierSorted={ supplierSorted } setSupplierSortedBy={ setSupplierSortedBy } supplierSortedBy={ supplierSortedBy } setSupplierFilter2={ setSupplierFilter2 } supplierFilter2={ supplierFilter2 } taskList={ taskList } setStateChange={ setStateChange } stateChange={ stateChange } settings={ settings } setSettings={ setSettings } />
              
              { paramName !== "" && !display ? <a href={ "https://www.google.com/search?q=" + getSearchText(paramName) } target="_blank" >Search for { paramName }</a> : "" }
            

              { supplierList.length === 0 ? "No suppliers in list": "" }
              { supplierList.length > 0 ? <SupplierList 
                                              wedding={ wedding } 
                                              setSupplierList={ setSupplierList } 
                                              supplierList={ supplierList } 
                                              supplierFilter={ supplierFilter } 
                                              supplierFilter2={ supplierFilter2 } 
                                              supplierSorted={ supplierSorted } 
                                              supplierSortedBy={ supplierSortedBy } 
                                              setStateChange={ setStateChange } 
                                              stateChange={ stateChange } 
                                              supplierStatuses={ supplierStatuses }
                                              user={ user }
                                              setTaskList={ setTaskList }
                                              taskList={ taskList }
                                              taskType={ filterName2 }
                                              supplierBooked={ supplierBooked }
                                            /> : "" }
              
               
            </div>

        </div>
    
       
    )
    
}