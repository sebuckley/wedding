import '../Dashboard.css';
import { useState } from 'react';
import DietSection from '../../PublicSite/Components/rsvp/dietrysection';
import dietry from '../../PublicSite/Components/Data/dietry';

export default function NewGuest(props){

    const [updated, setUpdated] = useState(0);
    const arrayNumber = props.guestNumber;
    const guestNumber = props.guestNumber + 1;
    const additionalGuests = props.additionalGuests;
    const onInputGuests = props.onInputGuests;
    const onChangeOptionGuest = props.onChangeOptionGuest;
    const getColor = props.getColor;

    const getNumber = (text, number) => {

        return text + " " + number;

    }

    

    return (

        <div className={ getNumber("addGuestGroup", arrayNumber) }> 

            <h2>Guest { guestNumber }</h2>

            <div className='row two'>

                <div className='inputGroup col-6'>
                    <i className="fa fa-user icon"></i>
                    <input type='text' className={ getNumber("inputBox", arrayNumber) } onInput={ onInputGuests } name='firstName' placeholder='first name' value={ additionalGuests[arrayNumber].firstName }></input>
                </div>
                <div className='inputGroup col-6'>
                    <i className="fa fa-user icon"></i>
                    <input type='text' className={ getNumber("inputBox", arrayNumber) } onInput={ onInputGuests }  name='surname' placeholder='surname' value={ additionalGuests[arrayNumber].surname }></input>
                </div>

            </div>

            <div className='row'>

                <div className='inputGroup col-12'>

                    <i className="fa-solid fa-circle-info icon"></i>
                    <select className={ getNumber("guestType", arrayNumber) }  name='guestType' style={getColor(additionalGuests[arrayNumber].guestType)} onChange={ onChangeOptionGuest } value={ additionalGuests[arrayNumber].guestType }>
                        <option value="" hidden className="noOption">please select age category...</option>
                        <option>Over 18</option>
                        <option>Under 18</option>
                        <option>Under 5</option>
                    </select>
                
                </div>

            </div>

            <DietSection diet={ dietry.dietry.diet } allergies={ dietry.dietry.allergies } showGuest={ "" } hideGuest={ "" } onChange={ onChangeOptionGuest } valueDiet={ additionalGuests[arrayNumber].diet } valueAllergies={ additionalGuests[arrayNumber].allergies } titleType={ "guest" } arrayNumber={ arrayNumber }/>

        </div>

    )

}