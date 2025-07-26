import DietSection  from '../../PublicSite/Components/rsvp/dietrysection';
import dietry from '../../PublicSite/Components/Data/dietry';  


export default function BridalPerson(props){

    const selection = props.selection
    const person = props.bridalParty[selection];
    const getName = props.getName;
    const handleChange = props.handleChange;
    const getRoles = props.getRoles;
    const getColor = props.getColor;
    const dietValue = person.diet || "";
    const allergiesValue = person.allergies || "";

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

            <h2 className="text-2xl font-semibold mb-4">{ getName(switchNum[selection]) }</h2>

            <div className='row'>
            
              <div className='inputGroup col-12'>

                <i className="fa fa-user icon"></i>
                <input
                  type="text"
                  name="fName"
                  value={person.fName}
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
                  name="lName"
                  value={person.lName}
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

            />

        </>

    )

}

