import './Dashboard.css';
import Login from '../Login/Login';
import Header from '../Wigits/Header/header';
import ValueBox from "./Dashboard Wigits/valueBox";
// import Link from "./Dashboard Wigits/link";

export default function Dashboard(props){
  
    const { token, setToken } = props.useToken();

    const guestData = props.guestData;
    const taskData = props.taskData;
    const isEmpty = props.isEmpty;
    const bridalParty = props.bridalParty;

    if(!token) {
  
      return <Login setToken={ setToken } bridalParty={ bridalParty } />
  
    }

    return(

      <div>

        <Header fName={ bridalParty.groom.fName } sName={ bridalParty.bride.fName } displayPublic={ false }/>

        <div className="adminBody">

          <div id="dashboard">

            <h1>Guest data</h1>

            <div>

              { isEmpty(guestData) ? "Loading" : <ValueBox title={ "Total invited" } value={ guestData.guestNumbers } href={"managemywedding/guests"}/> }
              { isEmpty(guestData) ? "" : <ValueBox title={ "Outstanding responses" } value={ guestData.guestNotResponded } href={"managemywedding/guests"}/> }
              { isEmpty(guestData) ? "" : <ValueBox title={ "Confirmed" } value={ guestData.confirmed } href={"managemywedding/guests"}/> }
              { isEmpty(guestData) ? "" : <ValueBox title={ "Declined" } value={ guestData.declined } href={"managemywedding/guests"}/> }

            </div>

             <div>

              { isEmpty(guestData) ? "" : <ValueBox title={ "Adults" } value={ guestData.adults } href={"managemywedding/guests"}/> }
              { isEmpty(guestData) ? "" : <ValueBox title={ "Children" } value={ guestData.children } href={"managemywedding/guests"}/> }
              { isEmpty(guestData) ? "" : <ValueBox title={ "Infants" } value={ guestData.infants } href={"managemywedding/guests"}/> }
              { isEmpty(guestData) ? "" : <ValueBox title={ "Dierty Needs" } value={ guestData.diet } href={"managemywedding/guests"}/> }
              { isEmpty(guestData) ? "" : <ValueBox title={ "Allergies" } value={ guestData.allergies } href={"managemywedding/guests"}/> }

            </div>

            <h1>Task data</h1>

            <div>

              

              { isEmpty(taskData) ? "" : <ValueBox title={ "Task Numbers" } value={ taskData.noTasks } href={"managemywedding/tasks"}/> }
              { isEmpty(taskData) ? "" : <ValueBox title={ "To-do" } value={ taskData.toDo } href={"managemywedding/tasks"}/> }
              { isEmpty(taskData) ? "" : <ValueBox title={ "In-progress" } value={ taskData.inProgress } href={"managemywedding/tasks"}/> }
              { isEmpty(taskData) ? "" : <ValueBox title={ "Completed" } value={ taskData.completed } href={"managemywedding/tasks"}/> }
           

            </div>

            <div>

              { isEmpty(taskData) ? "" : <ValueBox title={ "Not started" } value={ taskData.notStarted } href={"managemywedding/tasks"}/> }
               { isEmpty(taskData) ? "" : <ValueBox title={ "Planned" } value={ taskData.planned } href={"managemywedding/tasks"}/> }
              { isEmpty(taskData) ? "" : <ValueBox title={ "Researched" } value={ taskData.researched } href={"managemywedding/tasks"}/> }
              { isEmpty(taskData) ? "" : <ValueBox title={ "Enquiry Made" } value={ taskData.enquiry } href={"managemywedding/tasks"}/> }
              { isEmpty(taskData) ? "" : <ValueBox title={ "Selected" } value={ taskData.selected } href={"managemywedding/tasks"}/> }

            </div>
         
          </div>

          {/* <div id="links">

            <Link title={ "Details" } href={ "managemywedding/details/" } />
            <Link title={ "Guest List" } href={ "managemywedding/guests/" } />
            <Link title={ "Tasks" } href={ "managemywedding/tasks/" } />

          </div> */}

        </div>

      </div>
       
    )
    
}