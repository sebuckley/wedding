import { useState, useEffect } from 'react';
import DietSection  from '../../PublicSite/Components/rsvp/dietrysection';
import dietry from '../../PublicSite/Components/Data/dietry';  
import WeddingClothingForm from '../Guests/clothing';
import { weddingClothingSizes } from '../../App/wedding_clothing_sizes_schema_with_gender';
import Email from '../../Wigits/contact/email';

export default function BridalPerson(props){

    const handleChange = props.handleChange;  
    const getColor = props.getColor;
    const getName = props.getName;
    const checkEmptyWedding = props.checkEmptyWedding;
    const [empty, setEmpty] = useState(0);
    let emptyText;

    const selection = props.selection;
    const bridalParty = props.bridalParty;
    const person = bridalParty[selection];
    const sizeSystem = props.bridalParty["weddingDetails"].sizeSystem;
    const religiousType = props.bridalParty["weddingDetails"].religiousType;
    const getRoles = props.getRoles  || "";
    const dietValue = person.diet || "";
    const allergiesValue = person.allergies || "";
    const disableItem = props.disableItem;

    const switchNum = {

        first: 1,
        second: 2,
        third: 3

    }
   
    const getClass = (name, num) => {

        return  "weddingDetails " + name + " " + num;

    }

     const checkEmpty = () => {
  
        const items = document.getElementsByClassName("checkPerson");

        let empty = 0;

        for(let i=0; i< items.length; i++){

            let value = items[i].value;
            
            if(value === ""){

                empty += 1;
                items[i].style.borderColor = "red";

            }else{

                items[i].style.borderColor = "var(--grey)";
                
            }

        }

        setEmpty(empty);

    }

    useEffect(() => {
      console.log("Initial check wedding called");
      checkEmptyWedding();
      checkEmpty();
    }, []);

    if(empty === 0){

      emptyText = "[completed]";

    }else{

      emptyText = "[" + empty + " incomplete]";

    }

    return(

        <>

            <h2 className="text-2xl font-semibold mb-4">{ getName(selection) +  " " + emptyText}</h2>

            <div className='row'>
            
              <div className='inputGroup col-12'>

                <i className="fa fa-user icon"></i>
                <input
                  type="text"
                  name="firstName"
                  value={ person.firstName }
                  onChange={handleChange}
                  className={getClass("checkPerson inputBox", selection)}
                  placeholder="first name (required)"
                  required
                />

              </div>

            </div>

            <div className='row'>
          
              <div className='inputGroup col-12'>

                <i className="fa fa-user icon"></i>
                <input
                  type="text"
                  name="surname"
                  value={person.surname}
                  onChange={handleChange} // Changed from onInput to onChange
                  className={getClass("checkPerson inputBox", selection)}
                  placeholder="surname (required)"
                  required
                />
              </div>
            </div>

            <div className='row'>
            
              <div className='inputGroup col-12'>

                  <i className="fa-solid fa-person-circle-question icon"></i>
               
                  <select id="mainRole" className={getClass("checkPerson guestType", selection)} style={ getColor(person.role) } name='role' onChange={ handleChange } value={ person.role }>
                      <option value="" hidden className="noOption">please select role... (required)</option>
                      <option>Guest</option>
                      { getRoles() }

                  </select>
                
              </div>

            </div>


            <Email 

              type="input"
              class={ getClass("checkPerson inputBox checkIcon", selection) }
              updateFunction={ handleChange }
              value={ person.email }
                
            />

            <div className='row'>
            
              <div className='inputGroup col-12'>

                <i className="fa-solid fa-venus-mars icon"></i>
                <select id="mainGender" className={getClass("checkPerson guestType", selection)} style={ getColor(person.gender) } name='gender' onChange={ handleChange } value={ person.gender }>
                  <option value="" hidden className="noOption">please select gender... (required)</option>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Non-binary">Non-binary</option>
                  <option value="Prefer-not-to-say">Prefer not to say</option>
                </select>

              </div>
            
            </div>


            <DietSection 
              
              diet={ dietry.dietry.diet } 
              allergies={ dietry.dietry.allergies } 
              bridal={ selection } 
              showGuest={ "" } 
              onChange={ handleChange } 
              valueDiet={ dietValue } 
              valueAllergies={ allergiesValue }
              name={  person.surname ? person.firstName + " " + person.surname : person.firstName }
              weddingClothingSizes={ weddingClothingSizes }
              
            />

            <WeddingClothingForm 
              
              gender={ person.gender } 
              getColor={ getColor } 
              sizeSystem={ sizeSystem } 
              religiousType={ religiousType } 
              guestList={ person } 
              index={ switchNum[selection] } 
              checkEmpty={ checkEmpty } 
              disableItem={ disableItem } 
              name={ person.firstName + " " + person.surname } 
              location={"bridalParty"}
              weddingClothingSizes={ weddingClothingSizes }
              role={ person.role }
              bridalParty={ bridalParty }
              selection={ selection }
            
            />



        </>

       

    )


    

}

