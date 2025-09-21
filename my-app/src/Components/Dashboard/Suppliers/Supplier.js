import '../Dashboard.css';
import Login from '../../Login/Login';
import Header from '../../Wigits/Header/header';
import Loading from '../../PublicSite/Components/loading/loading';
import UpdateSupplier from './updateSupplier';

export default function Supplier(props){
  
    const user = props.user;
    const setUser = props.setUser;
    const loading = props.loading;
    const setLoading = props.setLoading;
    const loggedIn = props.loggedIn;
    const setLoggedin = props.setLoggedin;
    const supplierStatuses = props.supplierStatuses;
    const getSupplierData = props.getSupplierData;

    const bridalParty = props.bridalParty;
    const supplierList = props.supplierList;
    const setSupplierList = props.setSupplierList;
    const taskList = props.taskList;
    const setTaskList = props.setTaskList;
    const getRoles = props.getRoles;

    const index = props.index;

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
               
              <UpdateSupplier  setSupplierList={ setSupplierList } supplierList={ supplierList } index={ index } taskList={ taskList } setTaskList={ setTaskList } supplierStatuses={ supplierStatuses } user={ user } currency={ bridalParty.weddingDetails.currency } getSupplierData={ getSupplierData }/>
            
              {/* <FamilyList listObject={ listObject } wedding={ wedding } checkExists={ checkExists }/> */}
               
            </div>

        </div>
    
       
    )
    
}