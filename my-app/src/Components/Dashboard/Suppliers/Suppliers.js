import '../Dashboard.css';
import { useState } from 'react';
import { useLocation, useSearchParams  } from 'react-router-dom';
import Login from '../../Login/Login';
import Header from '../../Wigits/Header/header';
import AddSupplier from './addSupplier';
import Loading from '../../PublicSite/Components/loading/loading';
import SupplierList from './suppliersList';
import SupplierFilter from './supplierFilter';
import SupplierSort from './supplierSort';

export default function Suppliers(props){

    const location = useLocation();
    const search = location.search; // e.g., #/path?param1=value1&param2=value2
    let filterParam = search.split("=")[1];
    let filterAdd = search.split("=")[0];

    if(typeof filterParam === "undefined"){

      filterParam = "";

    }

    const user = props.user;
    const setUser = props.setUser;
    const loading = props.loading;
    const setLoading = props.setLoading;
    const loggedIn = props.loggedIn;
    const setLoggedin = props.setLoggedin;
    const taskList = props.taskList;
    const setTaskList = props.setTaskList;
    const [setType, setSetType] = useState(filterParam);

    const clearSearch = useSearchParams();

     { console.log(setType)}


    let filterName;
    let filterName2;
    let currentDisplay = false;

    if(setType !== ""){

      filterName = "All";
      filterName2 = filterParam;

    }else{

      filterName = "All";
      filterName2 = "All";

    }

    if(filterAdd === "?add"){

      currentDisplay = true;

    }

    const bridalParty = props.bridalParty;
    const wedding = props.wedding;
    const setSupplierList = props.setSupplierList;
    const supplierList = props.supplierList;
    const supplierStatuses = props.supplierStatuses;
    const [supplierFilter, setSupplierFilter] = useState(filterName);
    const [supplierFilter2, setSupplierFilter2] = useState(filterName2);
    const [supplierSortedBy, setSupplierSortedBy] = useState("name");
    const [supplierSorted, setSupplierSorted] = useState("asc");
    const [display, setDisplay] = useState(currentDisplay);

    const [stateChange, setStateChange] = useState(0);

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

              <AddSupplier setSupplierList={ setSupplierList } supplierList={ supplierList } taskList={ taskList } setTaskList={ setTaskList } setStateChange={ setStateChange } stateChange={ stateChange } supplierStatuses={ supplierStatuses } user={ user } display={ display } setDisplay={ setDisplay } setType={ setType } location={ bridalParty.weddingDetails.location }/>

              {/* <ListType setListType={ setListType } listType={ listType } /> */}

              <SupplierFilter setSupplierFilter={ setSupplierFilter } filterName={ supplierFilter }/>
              <SupplierSort setSupplierSorted={ setSupplierSorted } supplierSorted={ supplierSorted } setSupplierSortedBy={ setSupplierSortedBy } supplierSortedBy={ supplierSortedBy } setSupplierFilter2={ setSupplierFilter2 } supplierFilter2={ supplierFilter2 } taskList={ taskList }/>
              
            

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
                                              setType={ filterParam }
                                            /> : "" }
              
               
            </div>

        </div>
    
       
    )
    
}