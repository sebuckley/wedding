import { Link } from 'react-router-dom';

export default function GuestDataRow(props){

    const bridalPartyPerson = props.bridalPartyPerson || false;
    const displayBridalContact = props.displayBridalContact;
    const person = props.person;

    const UUID = person.UUID;
    const firstName = person.firstName;
    const surname = person.surname;
    let guestType = person.guestType;
    let role = person.role;
    const mobile = person.mobile;
    const email = person.email;
    let rsvp = role === "bride" || role === "groom" ? true : person.rsvp;
    
    const ageGroup = person.guestType || "";
    const diet = person.diet || "";
    const allergies = person.allergies || "";

    const order = props.order;
    const wedding = props.wedding;

    const displayRole = props.displayRole || false;
    const displayEmail = props.displayEmail || false;
    const displayMobile = props.displayMobile || false;
    const displayRSVP = props.displayRSVP || false;
    const displayAgeGroup = props.displayAgeGroup || false;
    const displayDiet = props.displayDiet || false;
    const displayAllergies = props.displayDiet || false;

    const getBridalLink = (uuid) => {

        return "/managemywedding/details/?personID=" + uuid;

    }
   
    const getPersonLink = (uuid) => {

        return "/managemywedding/guest/?personID=" + uuid;

    }

     const getPhoneLink = (mobile, uuid) => {

        let link;

        if(mobile === ""){

            link = "guest/?personID=" + uuid;

        }else{

            link = "tel:" + mobile;

        }

        return link; 
        
    }

    const getRoleLink = (role, UUID, firstName, surname) => {

        let object;

        if(typeof UUID === "undefined" && bridalPartyPerson === false){

            object = firstName  + " " + surname;

        }else if(bridalPartyPerson === true && role === "" && surname === ""){

            object =<Link to={getBridalLink(UUID)}>{ firstName }</Link>;

        }else if(role === "Bride" || role === "Groom"){

            object =<Link to={getBridalLink(UUID)}>{ firstName + " " + surname }</Link>;

        }else{

            object =<Link to={ getPersonLink(UUID) }>{ firstName + " " + surname }</Link>;

        }
        
        return object;

    }

    const getEmailLink = (email, wedding, firstName) => {

        return "mailto:" + email + "?subject=" + encodeURIComponent(wedding.name) + "&body=Hi " + firstName + ",";

    }

    const getAgeGroup = (str) => {

        let returnText;

        if(str === "Over 18"){

            returnText = "Adult";

        }else if(str === "Under 18"){

            returnText = "Child";

        }else if(str === "Under 5"){

            returnText = "Infant";

        }else if(str === ""){

            returnText = "Unknown";

        }

        return returnText;

    }

    const getDiet = (str) => {

        let returnText;

        if(str === "No dietry requirements"){

            returnText = "None";

        }else if(str === ""){

            returnText = "Unknown";

        }else{

            returnText = str;

        }

        return returnText;


    }

    const getAllergies = (str) => {

        let returnText;

        if(str === "No allergies"){

            returnText = "None";


        }else if(str === ""){

            returnText = "Unknown";

        }else{

            returnText = str;

        }

        return returnText;


    }

    const returnRole = () => {

        if(role === "" && bridalPartyPerson === false){

            role = "Guest";

        }

        if(typeof role === "undefined" && bridalPartyPerson === false){

            role = "Guest";

        }

          if(role === "" && bridalPartyPerson === true){

            role = "Bride/Groom";

        }

        if(typeof role === "undefined" && bridalPartyPerson === true){

            role = "Bride/Groom";

        }
        

        return <div className="col-3"> { role } </div>;

    }

    const returnMobile = (mobile) => {

        let object;

        if(mobile !== ""){

            object = <div className="col-2">{ <a href={ getPhoneLink(mobile, UUID) } aria-label={ "phone " + firstName + " " + surname } title={ "phone " + firstName + " " + surname }><i className="fa-solid fa-phone icon3"></i></a> }</div>

        }else if (bridalPartyPerson === false){

            object = <div className="col-2">{ <a href={ getPersonLink(UUID) } aria-label={ "add phone number for " + firstName + " " + surname } title={ "add phone number for " + firstName + " " + surname }><i className="fa-solid fa-circle-plus icon3"></i></a> }</div>

        }else if (bridalPartyPerson === true && displayBridalContact === true){

            object = <div className="col-2">{ <a href={ getBridalLink(UUID) } aria-label={ "add phone number for " + firstName + " " + surname } title={ "add phone number for " + firstName + " " + surname }><i className="fa-solid fa-circle-plus icon3"></i></a> }</div>
        
        }else{

            object = <div className="col-2"></div>
        
        }

        return object;
        
    }

    const returnEmail = () => {

        let object;

        if(email !== "" && bridalPartyPerson === false){

            object = <div className="col-3">{ <a href={ getEmailLink(email, wedding, firstName) } aria-label={ "email " + firstName + " " + surname } title={ "email " + firstName + " " + surname }><i className="fa-solid fa-envelope icon3"></i></a> }</div>
        

        }else if (bridalPartyPerson === true && displayBridalContact === true){

            if(firstName === "Partner 1" || firstName === "Partner 2"){

                object = <div className="col-3">{ <a href={ getBridalLink(UUID) } aria-label={ "add email for " + firstName + " " + surname } title={ "add email for " + firstName + " " + surname }><i className="fa-solid fa-circle-plus icon3"></i></a> }</div>

            }else{

                 object = <div className="col-3">{ <a href={ getEmailLink(email, wedding, firstName) } aria-label={ "email " + firstName + " " + surname } title={ "email " + firstName + " " + surname }><i className="fa-solid fa-envelope icon3"></i></a> }</div>

            }

        
        }else{

            object = <div className="col-3"></div>
        
        }

        return object;

        
    }

     const returnRSVP = () => {

        if(bridalPartyPerson === true){

            rsvp = "Confirmed";

        }

        return <div className="col-1"> { rsvp === "Not confirmed" ? <i className="fa-solid fa-circle-minus iconMinus"  title="Not confirmed" role="img" aria-label="Not confirmed"></i> : rsvp === "Confirmed" ?  <i className="fa-solid fa-circle-check iconCheck" title="Confirmed" role="img" aria-label="Confirmed"></i> : <i className="fa-solid fa-circle-xmark iconCross" title="Declined" role="img" aria-label="Declined"></i>} </div>
        
    }

    const returnAgeGroup = () => {

        let object;

        if(guestType === "" && bridalPartyPerson === false){

            object = <div className="col-3">Age Group: unknown</div>
        
        }else if (bridalPartyPerson === true){

             object = <div className="col-3">Age Group: Adult</div>

        }else{

            object = <div className="col-3">Age Group: { getAgeGroup(guestType) }</div>

        }

        return object;
                           
    }

    const returnDiet = () => {

        return  <div className="col-3">Dietry: { getDiet(diet) }</div>
                            
    }

    const returnAllergies = () => {

        return <div className="col-3">Allergies: { getAllergies(allergies) }</div>
        
    }

    return (

        <div className={ "guestRow " + (order + 2)} key={ UUID }>

            <div className="col-3">{ getRoleLink(role, UUID, firstName, surname) }</div>

            { displayRole ? returnRole() : "" }
            
            { displayMobile ? returnMobile(mobile) : "" }

            { displayEmail ? returnEmail() : "" }

            { displayRSVP ? returnRSVP() : "" }

            { displayAgeGroup ? returnAgeGroup() : "" }

            { displayDiet ? returnDiet() : "" }

            { displayAllergies ? returnAllergies() : "" }

        </div>

    )

}