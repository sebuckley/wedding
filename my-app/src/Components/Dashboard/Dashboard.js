import './Dashboard.css';
import { React, useEffect } from 'react';
import Login from '../Login/Login';
import Header from '../Wigits/Header/header';
import { Link } from 'react-router-dom';
import ValueBox from "./Dashboard Wigits/valueBox";
import Loading from '../PublicSite/Components/loading/loading';
import currencyList from './Details/currencyList';
// import Link from "./Dashboard Wigits/link";

export default function Dashboard(props){
  
    const user = props.user;
    const loggedIn = props.loggedIn;
    const setLoggedin = props.setLoggedin;
    const setUser = props.setUser;
    const loading = props.loading;
    const setLoading = props.setLoading;
    const getGuestData = props.getGuestData;
    const getTaskData = props.getTaskData;
    const getSupplierData = props.getSupplierData;
    const guestList = props.guestList;
    const taskList = props.taskList;
    const supplierList = props.supplierList;

    const guestData = props.guestData;
    const taskData = props.taskData;
    const supplierData = props.supplierData
    const isEmpty = props.isEmpty;
    const bridalParty = props.bridalParty;
    const currency = bridalParty?.weddingDetails?.currency || "GBP";
    const budget = bridalParty?.weddingDetails?.budget|| 0;
    const remaining = parseFloat(bridalParty.weddingDetails?.budget) - parseFloat(supplierData?.totalCost) || 0;
    const remainingQuote = parseFloat(bridalParty?.weddingDetails?.budget) - parseFloat(supplierData?.totalCost) - parseFloat(supplierData?.totalQuote)|| 0;

    const getStatus = () => {

      let text;

      if(loading){

        text = "loading...";

      }else{

        text = <Link to="/managemywedding/guests/?add=guest">Please add guests...</Link>;

      }

      return text;

    }

    useEffect( () => {

      getGuestData(guestList);
      getTaskData(taskList);
      getSupplierData(supplierList);

    }    , []);

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

          <div id="dashboard">
            
            <h1>Budget ({currency})</h1>

            <table className="budgetTable">


              <tbody>
            
              <tr>
                <td>Budget <i class="fa-solid fa-circle-question hoverText" title="The total budget for the wedding."></i></td>
                <td>&nbsp;</td>
                <td> { currencyList[currency].symbol + " " +  parseFloat(budget).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') }</td>
              </tr>
              <tr>
                <td>Booked Total Amount <i class="fa-solid fa-circle-question hoverText" title="The total cost of all booked suppliers."></i></td>
                <td>&nbsp;</td>
                <td> { currencyList[currency].symbol + " " +  parseFloat(supplierData.totalCost).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')  }</td>
              </tr>
              <tr>
                <td>Paid Amount <i class="fa-solid fa-circle-question hoverText" title="The total amount paid to suppliers."></i></td>
                <td>&nbsp;</td>
                <td> { currencyList[currency].symbol + " " + parseFloat(supplierData.totalPaid).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') }</td>
              </tr>
              <tr>
                <td>Outstanding payments <i class="fa-solid fa-circle-question hoverText" title="The total amount still owed to suppliers booked."></i></td>
                <td>&nbsp;</td>
                <td> { currencyList[currency].symbol + " " + parseFloat(supplierData.totalCost - supplierData.totalPaid).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') }</td>
              </tr>
              <tr>
                <td>Remaining Budget <i class="fa-solid fa-circle-question hoverText" title="The remaining budget after all booked suppliers have been paid."></i></td>
                <td>&nbsp;</td>
                <td> { currencyList[currency].symbol + " " + parseFloat(remaining).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') }</td>
              </tr>
              <tr>
                <td>Quoted Amount <i class="fa-solid fa-circle-question hoverText" title="The total quoted amount from suppliers (highest amount from each category)."></i></td>
                <td>&nbsp;</td>
                <td> { currencyList[currency].symbol + " " +  parseFloat(supplierData.totalQuote).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')  }</td>
              </tr>
              <tr>
                <td>Remaining Budget (incl Quote) <i class="fa-solid fa-circle-question hoverText" title="The remaining budget after all booked suppliers have been paid, including quoted amounts."></i></td>
                <td>&nbsp;</td>
                <td>  { currencyList[currency].symbol + " " + parseFloat(remainingQuote).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') }</td>
              </tr>

              </tbody>


            </table>

            <h1>Guest data</h1>

            <div>

              
              { isEmpty(guestData) ? getStatus() : <ValueBox title={ "Total invited" } value={ guestData.guestNumbers } href={"/managemywedding/guests"}/> }
              { isEmpty(guestData) ? "" : <ValueBox title={ "Outstanding responses" } value={ guestData.guestNotResponded } href={"/managemywedding/guests"}/> }
              { isEmpty(guestData) ? "" : <ValueBox title={ "Confirmed" } value={ guestData.confirmed } href={"/managemywedding/guests"}/> }
              { isEmpty(guestData) ? "" : <ValueBox title={ "Declined" } value={ guestData.declined } href={"/managemywedding/guests"}/> }
              { isEmpty(guestData) ? "" : <ValueBox title={ "Remaining Guests" } value={ bridalParty.weddingDetails.maxGuests - guestData.guestNumbers } href={"/managemywedding/guests"}/> }

            </div>

             <div>

              { isEmpty(guestData) ? "" : <ValueBox title={ "Adults" } value={ guestData.adults } href={"/managemywedding/guests"}/> }
              { isEmpty(guestData) ? "" : <ValueBox title={ "Children" } value={ guestData.children } href={"/managemywedding/guests"}/> }
              { isEmpty(guestData) ? "" : <ValueBox title={ "Infants" } value={ guestData.infants } href={"/managemywedding/guests"}/> }
              { isEmpty(guestData) ? "" : <ValueBox title={ "Dietry Needs" } value={ guestData.diet } href={"/managemywedding/guests"}/> }
              { isEmpty(guestData) ? "" : <ValueBox title={ "Allergies" } value={ guestData.allergies } href={"/managemywedding/guests"}/> }

            </div>

            <h1>Task data</h1>

            <div>

              

              { isEmpty(taskData) ? "Loading..." : <ValueBox title={ "Task Numbers" } value={ taskData.noTasks } href={"/managemywedding/tasks"}/> }
              { isEmpty(taskData) ? "" : <ValueBox title={ "To-do" } value={ taskData.toDo } href={"/managemywedding/tasks"}/> }
              { isEmpty(taskData) ? "" : <ValueBox title={ "In-progress" } value={ taskData.inProgress } href={"/managemywedding/tasks"}/> }
              { isEmpty(taskData) ? "" : <ValueBox title={ "Completed" } value={ taskData.completed } href={"/managemywedding/tasks"}/> }
           

            </div>

            <div>

              { isEmpty(taskData) ? "" : <ValueBox title={ "Not started" } value={ taskData.notStarted } href={"/managemywedding/tasks"}/> }
              { isEmpty(taskData) ? "" : <ValueBox title={ "Planned Activity" } value={ taskData.planned } href={"/managemywedding/tasks"}/> }
              { isEmpty(taskData) ? "" : <ValueBox title={ "Researching" } value={ taskData.researched } href={"/managemywedding/tasks"}/> }
     

            </div>

            <h1>Supplier data</h1>

            <div>

              { isEmpty(supplierData) ? "Loading..." : <ValueBox title={ "Shortlisted" } value={ supplierData.shortlisted } href={"/managemywedding/suppliers"}/> }
              { isEmpty(supplierData) ? "" : <ValueBox title={ "Enquiry made" } value={ supplierData.enquiryMade } href={"/managemywedding/suppliers"}/> }
              { isEmpty(supplierData) ? "" : <ValueBox title={ "Quote received" } value={ supplierData.quoteReceived } href={"/managemywedding/suppliers"}/> }
              { isEmpty(supplierData) ? "" : <ValueBox title={ "Booked" } value={ supplierData.booked } href={"/managemywedding/suppliers"}/> }
           
            </div>
         
          </div>

        </div>

      </div>
       
    )
    
}