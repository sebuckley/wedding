import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { isEmpty } from './Components/Wigits/dataFunctions';
import { titleCase, createClass, uuidv4 } from './Components/Wigits/dataFunctions';
import { getGuestList } from './Components/Wigits/dataFunctions-guestList';
import { getTaskList, saveTaskList } from './Components/Wigits/dataFunctions-taskList';

import Dashboard from './Components/Dashboard/Dashboard';
import Details from './Components/Dashboard/Details';
import Guests from './Components/Dashboard/Guests/Guests';
import Guest from './Components/Dashboard/Guests/Guest';
import Tasks from './Components/Dashboard/Tasks/Tasks';
import PublicSite from './Components/PublicSite/PublicSite';
import RSVPForm from './Components/PublicSite/rsvpform';
import PrivacyPolicy from './Components/Wigits/Privacy-Policy/privacy-policy';
import useToken from './Components/App/useToken';
import mainTaskData from './Components/App/mainData';
import { bridalParty, wedding,  weddingVenue, faq, weddingDayInvite, weddingReceptionInvite} from './Components/PublicSite/Components/Data/data';

function App() {

  const {token, setToken} = useToken();
  const [guestList, setGuestList] = useState("");
  const [guestListChecked, setGuestListChecked] = useState(0);
  const [taskList, setTaskList] = useState("");
  const [taskListChecked, setTaskListChecked] = useState(0);
  const [guestData, setGuestData] = useState({});
  const [taskData, setTaskData] = useState({});

  if(getTaskList() === null){

    let newList = [];

    for(let i = 0; i < mainTaskData.data.length; i ++){

      let newTask = {};

      let taskNanme = createClass(titleCase(mainTaskData.data[i]));
      let uuid = uuidv4();

      newTask["taskName"] = taskNanme;
      newTask["itemID"] = uuid;
      newTask["toDoDate"] = "";
      newTask["state"] = "To-do";
      newTask["activity"] = "Not started";
      newTask["created"] = new Date();
      newTask["createdBy"] = token.user;
      newTask["lastUpdated"] = new Date();
      newTask["lastUpdatedBy"] = token.user;
      newTask["history"] = [];

      newList.push(newTask);

    }

    const mainList = { 

      "listID": uuidv4(),
      "list": newList,
      "listCreated":  new Date()
      
    }

    saveTaskList(mainList);
    setTaskList(mainList);

  }

  const checkGuestList = async () => {

      if(guestList === "" && guestListChecked === 0){

        setGuestListChecked(1);

        const checkList = getGuestList();
    
        if(checkList !== null){

            setGuestList(checkList);

        }

      }
      
  }

  if(guestList === ""){

    checkGuestList();

  }

  const checkTaskList = async () => {

      if(taskList === "" && taskListChecked === 0){

        const checkList = getTaskList();
    
        if(checkList !== null){

            setTaskList(checkList);
            setTaskListChecked(1);

        }

      }
      
  }

  if(taskList === ""){

    checkTaskList();

  }

  useEffect(() => {

    const getGuestData = (data) => {

      let guestNumbers = 0;
      let guestNotResponded = 0;
      let notConfirmed = 0;
      let confirmed = 0;
      let declined = 0;
      let adults = 0;
      let children = 0;
      let infants = 0;
      let diet = 0;
      let allergies = 0;
      let dietList = [];
      let allergiesList = [];

      // console.log(data.length);

      for(let i = 0; i < data.length; i++){

          let UUID = data.list[i].UUID;
          let state = data.list[i].rsvp;
          let firstName = data.list[i].firstName;
          let surname = data.list[i].surname;
          let guestType = data.list[i].guestType;
          let fullName = firstName + " " + surname;
          let mainGuest = 1;
          let maxAdditionalGuests = parseInt(data.list[i].maxGuests);
          let addGuestSet = data.list[i].additionalGuestsSet;
          let additionalGuests = data.list[i].additionalGuests;
          let guestDiet = data.list[i].diet;
          let guestAllergies = data.list[i].allergies;
          let addGuestsNo;
          let outstanding;

          if(data.list[i].additionalGuestsNo === ""){

            addGuestsNo = 0;

          }else{

            addGuestsNo = parseInt(data.list[i].additionalGuestsNo);

          }

          if(state === "Not confirmed"){

            if(addGuestSet === false){

              outstanding =  mainGuest + maxAdditionalGuests;

            }else{

              outstanding =  mainGuest;

            }

          }else{

            outstanding = 0;

          }
          
          let remainingGuests = maxAdditionalGuests - addGuestsNo;

          guestNumbers += mainGuest + maxAdditionalGuests;
          guestNotResponded +=  outstanding;

          if(state === "Not confirmed"){

            notConfirmed += 1;
      
          }else if(state === "Confirmed"){
      
            confirmed += 1 + addGuestsNo;
      
          }else if(state === "Declined"){

      
            declined += 1;
            
          }

          if(remainingGuests > 0){

            if(addGuestSet === true){

              declined += remainingGuests;

            }

          }

          if(guestType === "Over 18"){

            adults += 1;

          }else if(guestType === "Under 18"){

            children += 1;

          }else if(guestType === "Under 5"){

            infants += 1;

          }

          if(guestDiet !== "No dietry requirements" && guestDiet !==""){

            let dietry = [fullName, guestDiet, UUID];
            diet += 1;
            dietList.push(dietry);

          }

          if(guestAllergies !== "No allergies" && guestAllergies !==""){

            let dietry = [fullName, allergies, UUID];
            allergies += 1;
            allergiesList.push(dietry);
            
          }

          if(additionalGuests.length > 0){

            for(let j = 0; j < additionalGuests.length; j++){


              let firstName = additionalGuests[j].firstName;
              let surname = data.list[i].surname;
              let fullName = firstName + " " + surname;
              let guestType2 = additionalGuests[j].guestType;
              let diet1 = additionalGuests[j].diet;
              let allergies1 = additionalGuests[j].allergies;

              if(guestType2 === "Over 18"){

                adults += 1;

              }else if(guestType2 === "Under 18"){

                children += 1;

              }else if(guestType2 === "Under 5"){

                infants += 1;

              }

              if(diet1 !== "No dietry requirements" && diet1 !== ""){

                let dietry = [fullName, diet1, UUID];
                diet += 1;
                dietList.push(dietry);

              }

              if(allergies1 !== "No allergies" && allergies1 !== ""){

                let dietry = [fullName, allergies1, UUID];
                allergies += 1;
                allergiesList.push(dietry);
                
              }

            }

          }


      }

      const dataObject = {

        guestNumbers: guestNumbers,
        guestNotResponded:guestNotResponded,
        notConfirmed: notConfirmed,
        confirmed: confirmed,
        declined: declined,
        adults, adults,
        children, children,
        infants, infants,
        diet: diet,
        allergies: allergies,
        dietList: dietList,
        allergiesList: allergiesList

      }

      setGuestData(dataObject);

    }

    const getTaskData = (data) => {

      let noTasks = 0;
      let toDo = 0;
      let inProgress = 0;
      let completed = 0;
      let notStarted = 0;
      let planned = 0;
      let researched = 0;
      let enquiry = 0;
      let selected = 0;
      

      // console.log(data.length);

      for(let i = 0; i < data.list.length; i++){

          let state = data.list[i].state;
          let activity = data.list[i].activity;

          // console.log(state);

          noTasks += 1;
          
          if(state === "To-do"){

            toDo += 1;
      
          }else if(state === "In-progress"){

            inProgress += 1;

          }else if(state === "Completed"){

            completed += 1;
            
          }

          if(activity === "Not started" || activity === ""){

            notStarted += 1;

          }else if(activity === "Researched"){
      
            researched += 1;
      
          }else if(activity === "Enquiry made"){
      
            enquiry += 1;
            
          }else if(activity === "Selected"){
      
            selected += 1;
            
          }else if(activity === "Planned"){
      
            planned += 1;
            
          }

      }

      const dataObject = {

          noTasks: noTasks,
          toDo: toDo,
          inProgress: inProgress,
          completed: completed,
          notStarted: notStarted,
          planned: planned,
          researched: researched,
          enquiry: enquiry,
          selected: selected

      }

      setTaskData(dataObject);

    }

    if(isEmpty(guestData)){

      getGuestData(guestList);

    }

    if(isEmpty(taskData)){

      getTaskData(taskList);

    }

  }, [guestList, guestData, taskList, taskData]);

  return (

    <div className="wrapper">

      <Router>

        <Routes>

          <Route path="/managemywedding/" element={<Dashboard useToken={ useToken } bridalParty={bridalParty} wedding={wedding} weddingVenue={weddingVenue} guestList={ guestList } guestData={ guestData } isEmpty={ isEmpty } taskData={ taskData }/>} />
          <Route path="/managemywedding/details" element={<Details useToken={ useToken } bridalParty={bridalParty} wedding={wedding} weddingVenue={weddingVenue} />} />
          <Route path="/managemywedding/guests" element={<Guests useToken={ useToken } bridalParty={bridalParty} wedding={wedding} weddingVenue={weddingVenue} guestList={ guestList } setGuestList={ setGuestList }/>} />
          <Route path="/managemywedding/guest" element={<Guest useToken={ useToken } bridalParty={bridalParty} wedding={wedding} weddingVenue={weddingVenue} guestList={ guestList } setGuestList={ setGuestList }/>} />
          <Route path="/managemywedding/tasks" element={<Tasks useToken={ useToken } bridalParty={bridalParty} wedding={wedding} weddingVenue={weddingVenue} taskList={ taskList } setTaskList={ setTaskList }/>} />
          <Route path="/" element={<PublicSite bridalParty={bridalParty} wedding={wedding} weddingVenue={weddingVenue} faq={ faq } weddingDayInvite={ weddingDayInvite } weddingReceptionInvite={ weddingReceptionInvite } />} />
          <Route path="/rsvp" element={<RSVPForm headerOn={true} bridalParty={bridalParty} wedding={wedding} weddingVenue={weddingVenue}/>} />
          <Route path="/privacy-policy" element={<PrivacyPolicy headerOn={true} bridalParty={bridalParty} />} />

        </Routes>

      </Router>

    </div>

  );

}

export default App;