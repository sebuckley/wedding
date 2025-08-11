import DietSection  from '../../PublicSite/Components/rsvp/dietrysection';
import dietry from '../../PublicSite/Components/Data/dietry';  
import WeddingClothingForm from '../Guests/clothing';
import { weddingClothingSizes } from '../../App/wedding_clothing_sizes_schema_with_gender'

export default function BridalPerson(props){

    const handleChange = props.handleChange;  
    const getColor = props.getColor;
    const getName = props.getName;

    const selection = props.selection;
    const bridalParty = props.bridalParty;
    const person = bridalParty[selection];
    const sizeSystem = props.bridalParty["weddingDetails"].sizeSystem;
    const religiousType = props.bridalParty["weddingDetails"].religiousType;
    const getRoles = props.getRoles  || "";
    const dietValue = person.diet || "";
    const allergiesValue = person.allergies || "";
    const disableItem = props.disableItem;
    const checkEmpty = props.checkEmpty;

    const switchNum = {

        first: 1,
        second: 2,
        third: 3

    }
   
    const getClass = (name, num) => {

        return name + " " + num;

    }

    return(

        <>

            <h2 className="text-2xl font-semibold mb-4">{ getName(selection) }</h2>

            <div className='row'>
            
              <div className='inputGroup col-12'>

                <i className="fa fa-user icon"></i>
                <input
                  type="text"
                  name="firstName"
                  value={person.firstName === "Partner 1" || person.firstName === "Partner 2" ? "": person.firstName }
                  onInput={handleChange}
                  className={getClass("inputBox", selection)}
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
                  onInput={handleChange}
                  className={getClass("inputBox", selection)}
                  placeholder="surname (required)"
                  required
                />
              </div>
            </div>

            <div className='row'>
            
              <div className='inputGroup col-12'>

                  <i className="fa-solid fa-person-circle-question icon"></i>
               
                  <select id="mainRole" className={getClass("guestType", selection)} style={ getColor(person.role) } name='role' onChange={ handleChange } value={ person.role }>
                      <option value="" hidden className="noOption">please select role... (required)</option>
                      <option>Guest</option>
                      { getRoles() }

                  </select>
                
              </div>

            </div>

            <div className='row'>
            
              <div className='inputGroup col-12'>

                <i className="fa-solid fa-envelope icon"></i>
                <input
                  type="email"
                  name="email"
                  value={person.email}
                  onInput={handleChange}
                  className={getClass("inputBox", selection)}
                  placeholder="email"
                  required
                />

              </div>

            </div>

            <div className='row'>
            
              <div className='inputGroup col-12'>

                <i className="fa-solid fa-venus-mars icon"></i>
                <select id="mainGender" className={getClass("guestType", selection)} style={ getColor(person.gender) } name='gender' onChange={ handleChange } value={ person.gender }>
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

