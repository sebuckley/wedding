import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { titleCase, createClass, uuidv4, isEmpty } from './Components/Wigits/dataFunctions';
import { getGuestList } from './Components/Wigits/dataFunctions-guestList';
import { getTaskList, saveTaskList } from './Components/Wigits/dataFunctions-taskList';
import { getBridalParty, saveBridalParty } from './Components/Wigits/dataFunctions-bridalParty';
import { getSupplierList, saveSupplierList } from './Components/Wigits/dataFunctions-suppliers';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../src/Components/Login/firebaseConfig'
import Header from './Components/Wigits/Header/header';
import Loading from './Components/PublicSite/Components/loading/loading';

import Dashboard from './Components/Dashboard/Dashboard';
import Details from './Components/Dashboard/Details/Details';
import Guests from './Components/Dashboard/Guests/Guests';
import Guest from './Components/Dashboard/Guests/Guest';
import Tasks from './Components/Dashboard/Tasks/Tasks';
import Suppliers from './Components/Dashboard/Suppliers/Suppliers';
import Supplier from './Components/Dashboard/Suppliers/Supplier';
import PublicSite from './Components/PublicSite/PublicSite';
import RSVPForm from './Components/PublicSite/rsvpform';
import PrivacyPolicy from './Components/Wigits/Privacy-Policy/privacy-policy';
import mainTaskData from './Components/App/mainData';
import { bridalParty as bridalOriginal , wedding as weddingOriginal,  weddingVenue, faq, weddingDayInvite, weddingReceptionInvite} from './Components/PublicSite/Components/Data/data';

function App() {

  const emptyBridal = {

      first: { 

        firstName: "Partner 1" ,
        surname: "",
        role: "",
        email: "",
        mobile: "",
        gender: "",
        diet: "",
        allergies: ""
        
      }, 
      second: { 

        firstName:"Partner 2",
        surname: "",
        role: "",
        email: "",
        mobile: "",
        gender: "",
        diet: "",
        allergies: "" 

      },
      weddingDetails: {

        maxGuests: "",
        dateTime: "",
        currency: "",
        country: "",
        budget: "",
        location: "",
        weddingStyle: "",
        sizeSystem: "",
        mainColor: ""

      }

  }

  const emptySuppliers = {

      listID: uuidv4(), 
      list: [],
      length: 0,
      checked: false

  }

  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [guestList, setGuestList] = useState("");
  const [guestListChecked, setGuestListChecked] = useState(0);
  const [taskList, setTaskList] = useState("");
  const [taskListChecked, setTaskListChecked] = useState(0);
  const [guestData, setGuestData] = useState({});
  const [taskData, setTaskData] = useState({});
  const [supplierData, setSupplierData] = useState({});
  const [bridalParty, setBridalParty] = useState(emptyBridal);
  const [bridalPartyChecked, setBridalPartyChecked] = useState(0);
  const [supplierList, setSupplierList] = useState(emptySuppliers);
  const [supplierListCheck, setSupplierListCheck] = useState(0);
  const [wedding, setWedding] = useState({});

  const supplierStatuses = ["Ruled out","Shortlisted", "Enquiry made", "Booked"];

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (data) => {

      if(typeof auth.currentUser !== "undefined"){

        if(auth.currentUser !== null){

          setUser(data);
          setLoading(false);
          setLoggedin(true);

        }else{

          setLoading(false);
          setLoggedin(false);

        }

      }else{

        setLoading(false);
        setLoggedin(false);

      }

    });

    return unsubscribe;

  }, []);

  const checkSupplierList = () => {

    if(supplierList.length === 0  && supplierListCheck === 0){

      const checkList = getSupplierList();

      if(checkList === null){

        saveSupplierList(supplierList);
        setSupplierListCheck(1);
        
      }else if(supplierListCheck === 0){

        setSupplierList(checkList);
        setSupplierListCheck(1);

      }

    }

  }

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
      newTask["createdBy"] = "system";
      newTask["updated"] = new Date();
      newTask["updatedBy"] = "system";
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

  if(isEmpty(wedding)){

    setWedding(weddingOriginal);

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

  if(supplierList.length === 0 && supplierListCheck === 0){

    checkSupplierList();

  }

  const checkTaskList = async () => {

      if(taskList === "" && taskListChecked === 0){

        const checkList = await getTaskList();
    
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

      if(data !== ""){

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

    }

    const getTaskData = (data) => {

      if(data !== ""){

        let noTasks = 0;
        let toDo = 0;
        let inProgress = 0;
        let completed = 0;
        let notStarted = 0;
        let planned = 0;
        let researched = 0;
        let enquiry = 0;
        let selected = 0;

        for(let i = 0; i < data.list.length; i++){

            let state = data.list[i].state;
            let activity = data.list[i].activity;

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

            }else if(activity === "Researching"){
        
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

    }

    const getSupplierData = (data) => {

      if(data !== ""){

        let noSuppliers = 0;
        let shortlisted = 0;
        let enquiryMade = 0;
        let booked = 0;
        let ruledOut = 0;

        let totalQuote = 0;
        let quoteObject = {};
        let totalCost = 0;
        let costObject = {}; 

        for(let i = 0; i < data.list.length; i++){

          let name = data.list[i].name;
          let uuid = data.list[i].UUID;
          let type = data.list[i].type;
          let state = data.list[i].status;
          let quote = data.list[i].quote || 0;
          let cost = data.list[i].cost || 0;

          if(cost !== 0 && state === "Booked"){

            costObject[type] = parseFloat(cost).toFixed(2);

          }

          if(quote !== 0 && state === "Enquiry made"){

            let newObject = {

              "uuid": uuid,
              "quote": quote,
              "name": name,

            }
            
            if(quoteObject[type] === undefined){

              quoteObject[type] = [ newObject ];    

            }else{

              quoteObject[type].push(newObject);

            }

          }

          noSuppliers += 1;

          if(state === "Shortlisted"){

            shortlisted += 1;
      
          }else if(state === "Enquiry made"){

            enquiryMade += 1;

          }else if(state === "Booked"){

            booked += 1;
            
          }else if(state === "Ruled out"){

            ruledOut += 1;
            
          }


        }

        for(let key in quoteObject){
 
          let highest; 
        
          for(let i = 0; i < quoteObject[key].length; i++){

            if(i === 0){

              highest = Number(quoteObject[key][i].quote);

            }else{


              if(Number(quoteObject[key][i].quote) > highest){

                highest = Number(quoteObject[key][i].quote);

              }

            }

          }

          totalQuote += highest;


        }

        for(let key in costObject){

          totalCost += Number(costObject[key]);

        }


        const dataObject = {

          noSuppliers: noSuppliers,
          shortlisted: shortlisted,
          enquiryMade: enquiryMade,
          booked: booked,
          ruledOut: ruledOut,
          totalQuote: parseFloat(totalQuote).toFixed(2),
          quoteObject: quoteObject,
          totalCost: parseFloat(totalCost).toFixed(2),
          costObject: costObject

        }

        setSupplierData(dataObject);

      }

    }

    if(isEmpty(guestData)){

      getGuestData(guestList);

    }

    if(isEmpty(taskData)){

      getTaskData(taskList);

    }

    if(isEmpty(supplierData)){

      getSupplierData(supplierList);

    }

  }, [guestList, guestData, taskList, taskData, supplierList, supplierData]);

  useEffect(() => {

    const checkBridalParty = () => {

      if(bridalParty.first.firstName === "Partner 1" && bridalPartyChecked === 0){

          const checkList = getBridalParty();

          if(checkList === null){

            setBridalParty(emptyBridal);
            saveBridalParty(emptyBridal);
            setBridalPartyChecked(1);

          }else{

            setBridalParty(checkList);
            setBridalPartyChecked(1);

          }

      }

    }

    if(bridalParty.first.firstName === "Partner 1"){

      checkBridalParty();
      setLoading(true);

    }

  }, []);

  const getRoles = (items) =>{
  
    items.sort((a,b) => a[0] - b[0]);

    const options = items.map((item) => {

        if(item[2] === true){
        
            return <option>{ item[0] }</option> ;

        }
    
    });

    return options;
  
  }

  return (

    <div className="wrapper">

      <Router>

        <Routes>

          <Route path="/managemywedding/" element={<Dashboard loading={loading} setLoading={ setLoading } user={ user } setUser={ setUser } bridalParty={bridalParty}  wedding={wedding} weddingVenue={weddingVenue} guestList={ guestList } guestData={ guestData } isEmpty={ isEmpty } taskData={ taskData } supplierData={ supplierData } loggedIn={ loggedIn } setLoggedin={ setLoggedin } />} />
          <Route path="/managemywedding/details" element={<Details loading={loading} setLoading={ setLoading } user={ user } setUser={ setUser }  bridalParty={bridalParty} setBridalParty={ setBridalParty } wedding={wedding} weddingVenue={weddingVenue} loggedIn={ loggedIn } setLoggedin={ setLoggedin }/>} />
          <Route path="/managemywedding/guests" element={<Guests loading={loading} setLoading={ setLoading } user={ user } setUser={ setUser }  bridalParty={bridalParty} wedding={wedding} weddingVenue={weddingVenue} guestList={ guestList } setGuestList={ setGuestList } getRoles={ getRoles } loggedIn={ loggedIn } setLoggedin={ setLoggedin }/>} />
          <Route path="/managemywedding/guest" element={<Guest loading={loading} setLoading={ setLoading } user={ user } setUser={ setUser }  bridalParty={bridalParty} wedding={wedding} weddingVenue={weddingVenue} guestList={ guestList } setGuestList={ setGuestList } getRoles={ getRoles } loggedIn={ loggedIn } setLoggedin={ setLoggedin }/>} />
          <Route path="/managemywedding/tasks" element={<Tasks loading={loading} setLoading={ setLoading } user={ user } setUser={ setUser }  bridalParty={bridalParty} wedding={wedding} weddingVenue={weddingVenue} taskList={ taskList } setTaskList={ setTaskList } loggedIn={ loggedIn } setLoggedin={ setLoggedin }/>} />
          <Route path="/managemywedding/suppliers" element={<Suppliers loading={loading} setLoading={ setLoading } user={ user } setUser={ setUser }  bridalParty={bridalParty} wedding={wedding} weddingVenue={weddingVenue} supplierList={ supplierList } setSupplierList={ setSupplierList } getRoles={ getRoles } loggedIn={ loggedIn } setLoggedin={ setLoggedin } taskList={ taskList } setTaskList={ setTaskList } supplierStatuses={ supplierStatuses }/>} />
          <Route path="/managemywedding/supplier" element={<Supplier loading={loading} setLoading={ setLoading } user={ user } setUser={ setUser }  bridalParty={bridalParty} wedding={wedding} weddingVenue={weddingVenue} supplierList={ supplierList } setSupplierList={ setSupplierList } getRoles={ getRoles } loggedIn={ loggedIn } setLoggedin={ setLoggedin } taskList={ taskList } setTaskList={ setTaskList } supplierStatuses={ supplierStatuses }/>} />
          
          
          <Route path="/" element={<PublicSite bridalParty={bridalParty} wedding={wedding} weddingVenue={weddingVenue} faq={ faq } weddingDayInvite={ weddingDayInvite } weddingReceptionInvite={ weddingReceptionInvite } loggedIn={ loggedIn } setLoggedin={ setLoggedin }/>} />
          <Route path="/rsvp" element={<RSVPForm headerOn={true} bridalParty={bridalParty} wedding={wedding} weddingVenue={weddingVenue}/>} />
          <Route path="/privacy-policy" element={<PrivacyPolicy headerOn={true} bridalParty={bridalParty} />} />

        </Routes>

      </Router>

    </div>

  );

}

export default App;