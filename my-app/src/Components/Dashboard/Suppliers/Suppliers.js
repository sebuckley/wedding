import '../Dashboard.css';
import { useState } from 'react';
import Login from '../../Login/Login';
import Header from '../../Wigits/Header/header';
import AddSupplier from './addSupplier';
import Loading from '../../PublicSite/Components/loading/loading';
import SupplierList from './suppliersList';
import SupplierFilter from './supplierFilter';
import SupplierSort from './supplierSort';

export default function Suppliers(props){
  
    const user = props.user;
    const setUser = props.setUser;
    const loading = props.loading;
    const setLoading = props.setLoading;
    const loggedIn = props.loggedIn;
    const setLoggedin = props.setLoggedin;
    const taskList = props.taskList;
    const setTaskList = props.setTaskList;

    const pathName = window.location.search;
    let filterName;
    let filterName2;

    if(pathName !== ""){

      const url = new URL(window.location.href);
      const params = new URLSearchParams(url.search);
      const firstKey = params.keys().next().value; // Get the first key
      const firstValue = params.get(firstKey);
      url.search = ''; // Clear the search query
      window.history.replaceState({}, document.title, url.toString());

      filterName = "All";
      filterName2 = firstValue;


    }else{

      filterName = "All";
      filterName2 = "All";

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

    const [stateChange, setStateChange] = useState(0);


    const onChangeSuppliers = (e) => {

      const itemName = e.target.name;
      const itemValue = e.target.value;
      const personID = e.target.parentElement.nextSibling.nextSibling.innerText;
    
    }

    if(loading){

      return <Loading bridalParty={ bridalParty } user={ user }/>

    }

    if(user === null) {
  
      return <Login setUser={ setUser } loading={loading} setLoading={ setLoading } bridalParty={ bridalParty } />
  
    }

    return(

        <div>

            <Header fName={ bridalParty.first.fName } sName={ bridalParty.second.fName } displayPublic={ false } loggedIn={ loggedIn } setLoggedin={ setLoggedin }/>

            <div className="adminBody">

              <AddSupplier setSupplierList={ setSupplierList } supplierList={ supplierList } taskList={ taskList } setTaskList={ setTaskList } setStateChange={ setStateChange } stateChange={ stateChange } supplierStatuses={ supplierStatuses } user={ user }/>

              {/* <ListType setListType={ setListType } listType={ listType } /> */}

              <SupplierFilter setSupplierFilter={ setSupplierFilter } filterName={ supplierFilter }/>
              <SupplierSort setSupplierSorted={ setSupplierSorted } supplierSorted={ supplierSorted } setSupplierSortedBy={ setSupplierSortedBy } supplierSortedBy={ supplierSortedBy } setSupplierFilter2={ setSupplierFilter2 } supplierFilter2={ supplierFilter2 }taskList={ taskList }/>
              

              { supplierList.length === 0 ? "No suppliers in list": "" }
              { supplierList.length > 0 ? <SupplierList wedding={ wedding } onChangeSuppliers={ onChangeSuppliers } setSupplierList={ setSupplierList } supplierList={ supplierList } supplierFilter={ supplierFilter } supplierFilter2={ supplierFilter2 } supplierSorted={ supplierSorted } supplierSortedBy={ supplierSortedBy } setStateChange={ setStateChange } stateChange={ stateChange } supplierStatuses={ supplierStatuses }/> : "" }
              
               
            </div>

        </div>
    
       
    )
    
}