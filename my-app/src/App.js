import './App.css';
import { useState, useEffect } from 'react';
import { HashRouter, Route, Routes } from "react-router-dom";
import { titleCase, createClass, uuidv4, isEmpty, getSettings, saveSettings } from './Components/Wigits/dataFunctions';
import { getGuestList } from './Components/Wigits/dataFunctions-guestList';
import { getTaskList, saveTaskList } from './Components/Wigits/dataFunctions-taskList';
import { getBridalParty, saveBridalParty } from './Components/Wigits/dataFunctions-bridalParty';
import { getSupplierList, saveSupplierList } from './Components/Wigits/dataFunctions-suppliers';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../src/Components/Login/firebaseConfig';
import baseSettings from './Components/Wigits/settings';
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
import { mainTaskData, weddingTasks } from './Components/App/mainData';
import { bridalParty as bridalOriginal , wedding as weddingOriginal,  weddingVenue, faqs as questionsOriginal , weddingDayInvite, weddingReceptionInvite} from './Components/PublicSite/Components/Data/data';

const supplierStatuses = ["To-do", "Ruled out","Shortlisted", "Enquiry made","Quote received", "Booked"];



export { supplierStatuses };

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

      },
      faqsSet: false,
      faqs: questionsOriginal,
      weddingVenue: ""

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
  const [faqs, setFaqs] = useState({});
  const [faqState, setFaqState] = useState(false);
  const [settings, setSettings] = useState(sessionStorage.getItem("settings") ? JSON.parse(sessionStorage.getItem("settings")) : localStorage.getItem("settings") ? JSON.parse(localStorage.getItem("settings")) : {});


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

    for(let i = 0; i < weddingTasks.length; i ++){

      let newTask = {};

      let uuid = uuidv4();

      newTask["taskName"] = weddingTasks[i].label;
      newTask["taskID"] = uuid;
      newTask["group"] = weddingTasks[i].group;
      newTask["phase"] = weddingTasks[i].phase;
      newTask["order"] = weddingTasks[i].order;
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
      "listConfirmed": false,
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
    
        //console.log(checkList);

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

            }else if(parseInt(guestType) > 5 && parseInt(guestType) <= 17){

              children += 1;

            }else{

              infants += 1;

            }

            if(guestDiet !== "No dietry requirements" && guestDiet !==""){

              let dietry = [fullName, guestDiet, UUID];
              diet += 1;
              dietList.push(dietry);

            }

            if(guestAllergies !== "No allergies" && guestAllergies !==""){

              let dietry = [fullName, guestAllergies, UUID];
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

                }else if(parseInt(guestType2) > 5 && parseInt(guestType2) <= 17){

                  children += 1;

                }else{

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
      let quoteReceived = 0;
      let booked = 0;
      let ruledOut = 0;

      let totalQuote = 0;
      let quoteObject = {};
      let totalCost = 0;
      let totalPaid = 0;
      let balance = 0;
      let costObject = {}; 

      for(let i = 0; i < data.list.length; i++){

        let name = data.list[i].name;
        let uuid = data.list[i].UUID;
        let type = data.list[i].type;
        let state = data.list[i].status;
        let quote = parseInt(data.list[i].quote?.quoteValue) || 0;
        let totalCost = parseInt(data.list[i].payments?.totalCost) || 0;
        let balance = data.list[i].payments?.balance || 0;
        let totalPaid;

        if(typeof data.list[i].payments?.paymentsMade?.length === "undefined" || data.list[i].payments?.paymentsMade.length === 0){

          totalPaid = 0;

        }else{

          totalPaid = data.list[i].payments?.paymentsMade.reduce((acc, payment) => acc + parseFloat(payment.payment), 0);

        }

        if(totalCost !== 0 && state === "Booked"){

           let newObject = {

            "uuid": uuid,
            "totalCost": totalCost,
            "outstanding": balance,
            "paid": totalPaid,
            "name": name,

          }

           if(costObject[type] === undefined){

            costObject[type] = [ newObject ];    

          }else{

            costObject[type].push(newObject);

          }

        }

        if(quote !== 0 && state === "Quote received"){

          quoteReceived += 1;

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

        for(let i = 0; i < costObject[key].length; i++){

          totalCost += Number(costObject[key][i].totalCost);
          totalPaid += Number(costObject[key][i].paid);
          balance += Number(costObject[key][i].outstanding);

        }

      }


      const dataObject = {

        noSuppliers: noSuppliers,
        shortlisted: shortlisted,
        enquiryMade: enquiryMade,
        quoteReceived: quoteReceived,
        booked: booked,
        ruledOut: ruledOut,
        totalQuote: parseFloat(totalQuote).toFixed(2),
        quoteObject: quoteObject,
        totalCost: parseFloat(totalCost).toFixed(2),
        totalPaid: parseFloat(totalPaid).toFixed(2),
        balance: parseFloat(balance).toFixed(2),
        costObject: costObject

      }

      setSupplierData(dataObject);

    }

  }

  const supplierBooked = (supplierList, taskTypeID, supplierIDBooked) => {
  
    let tempSupplierList = { ...supplierList, list: supplierList.list.map((item) => {

      if(item.taskTypeID === taskTypeID && item.UUID.trim() !== supplierIDBooked.trim()){

        return { ...item, status: "Ruled out", updated: new Date(), updatedBy: user.email };

      }

      return item;

    })};

    saveSupplierList(tempSupplierList);
    setSupplierList(tempSupplierList);
  
  }

  const getSettingsData = () => {

      const existingSettings = getSettings();

      if(existingSettings === null || isEmpty(existingSettings)){

        setSettings(baseSettings);
        saveSettings(baseSettings);
        sessionStorage.setItem("settings", JSON.stringify(baseSettings));

      }else{

        const getSessionSettings = JSON.parse(sessionStorage.getItem("settings"));

        if(getSessionSettings !== null){

          setSettings(getSessionSettings);

        }else{

          setSettings(existingSettings);
          sessionStorage.setItem("settings", JSON.stringify(existingSettings));

        }

      }

  }

  useEffect(() => {

    if(isEmpty(guestData)){

      getGuestData(guestList);

    }

    if(isEmpty(taskData)){

      getTaskData(taskList);

    }

    if(isEmpty(supplierData)){

      getSupplierData(supplierList);

    }

    if(isEmpty(settings)){

      getSettingsData();

    }



  }, [getTaskData, getTaskData, getSupplierData, getSettings, settings, guestList, guestData, taskList, taskData, supplierList, supplierData]);

  useEffect(() => {

    const checkBridalParty = () => {

      if(bridalParty.first.firstName === "Partner 1" && bridalPartyChecked === 0){

          const checkList = getBridalParty();

          if(checkList === null){

            setBridalParty(emptyBridal);
            saveBridalParty(emptyBridal);
            setFaqs(questionsOriginal);
            setBridalPartyChecked(1);
            setFaqState(false);

          }else{

            setBridalParty(checkList);
            setFaqs(checkList.faqs);
            setFaqState(checkList.faqsSet);
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

      <HashRouter>

        <Routes>

          <Route basename="/wedding" path="/">

            <Route index element={<PublicSite bridalParty={bridalParty} wedding={wedding} weddingVenue={weddingVenue} faq={ faqs } weddingDayInvite={ weddingDayInvite } weddingReceptionInvite={ weddingReceptionInvite } loggedIn={ loggedIn } setLoggedin={ setLoggedin }/>} />

            <Route path="managemywedding/" element={<Dashboard loading={loading} setLoading={ setLoading } user={ user } setUser={ setUser } bridalParty={bridalParty}  wedding={wedding} weddingVenue={weddingVenue} guestList={ guestList } guestData={ guestData } isEmpty={ isEmpty } taskData={ taskData } supplierData={ supplierData } loggedIn={ loggedIn } setLoggedin={ setLoggedin } />} />
            <Route path="managemywedding/details" element={<Details loading={loading} setLoading={ setLoading } user={ user } setUser={ setUser }  bridalParty={bridalParty} setBridalParty={ setBridalParty } wedding={wedding} weddingVenue={weddingVenue} loggedIn={ loggedIn } setLoggedin={ setLoggedin } faqs={ faqs } setFaqs={ setFaqs }  setFaqState={ setFaqState } faqState={ faqState } settings={ settings } setSettings={ setSettings } />} />
            <Route path="managemywedding/guests" element={<Guests loading={loading} setLoading={ setLoading } user={ user } setUser={ setUser }  bridalParty={bridalParty} wedding={wedding} weddingVenue={weddingVenue} guestList={ guestList } setGuestList={ setGuestList } getRoles={ getRoles } loggedIn={ loggedIn } setLoggedin={ setLoggedin } settings={ settings } setSettings={ setSettings }/>} />
            <Route path="managemywedding/guest" element={<Guest loading={loading} setLoading={ setLoading } user={ user } setUser={ setUser }  bridalParty={bridalParty} wedding={wedding} weddingVenue={weddingVenue} guestList={ guestList } setGuestList={ setGuestList } getRoles={ getRoles } loggedIn={ loggedIn } setLoggedin={ setLoggedin } getGuestData={ getGuestData}/>} />
            <Route path="managemywedding/tasks" element={<Tasks loading={loading} setLoading={ setLoading } user={ user } setUser={ setUser }  bridalParty={bridalParty} wedding={wedding} weddingVenue={weddingVenue} taskList={ taskList } setTaskList={ setTaskList } loggedIn={ loggedIn } setLoggedin={ setLoggedin } settings={ settings } setSettings={ setSettings }/>} />
            <Route path="managemywedding/suppliers" element={<Suppliers loading={loading} setLoading={ setLoading } user={ user } setUser={ setUser }  bridalParty={bridalParty} wedding={wedding} weddingVenue={weddingVenue} supplierList={ supplierList } setSupplierList={ setSupplierList } getRoles={ getRoles } loggedIn={ loggedIn } setLoggedin={ setLoggedin } taskList={ taskList } setTaskList={ setTaskList } supplierStatuses={ supplierStatuses } supplierBooked={ supplierBooked } settings={ settings } setSettings={ setSettings }/>} />
            <Route path="managemywedding/supplier" element={<Supplier loading={loading} setLoading={ setLoading } user={ user } setUser={ setUser }  bridalParty={bridalParty} wedding={wedding} weddingVenue={weddingVenue} supplierList={ supplierList } setSupplierList={ setSupplierList } getRoles={ getRoles } loggedIn={ loggedIn } setLoggedin={ setLoggedin } taskList={ taskList } setTaskList={ setTaskList } supplierStatuses={ supplierStatuses }  getSupplierData={ getSupplierData} supplierBooked={ supplierBooked }/>} />
            <Route path="wedding/rsvp" element={<RSVPForm headerOn={true} bridalParty={bridalParty} wedding={wedding} weddingVenue={weddingVenue}/>} />
            <Route path="wedding/privacy-policy" element={<PrivacyPolicy headerOn={true} bridalParty={bridalParty} />} />

          </Route>

        </Routes>

      </HashRouter>

    </div>

  );

}

export default App;