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
    const roles = props.roles;
    const getRoles = props.getRoles;
    const disableItem = props.disableItem;

    const role = typeof additionalGuests[arrayNumber].role === "undefined" ? "Guest" : additionalGuests[arrayNumber].role;

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
                
                    <i className="fa-solid fa-person-circle-question icon"></i>
                    <select id="guestRole" className={ getNumber("guestType", arrayNumber) }  style={ getColor(role) } name='role' onChange={ onChangeOptionGuest } value={ additionalGuests[arrayNumber].role } disabled={ disableItem } >
                        <option value="" hidden className="noOption">please select role... (required)</option>
                        <option>Guest</option>
                        { getRoles(roles) }

                    </select>
                    
                </div>

            </div>

            <div className='row'>

                <div className='inputGroup col-12'>

                    <i className="fa-solid fa-circle-info icon"></i>
                    <select className={ getNumber("guestType", arrayNumber) }  name='guestType' style={getColor(additionalGuests[arrayNumber].guestType)} onChange={ onChangeOptionGuest } value={ additionalGuests[arrayNumber].guestType }>
                        <option value="" hidden className="noOption">please select age category...</option>
                        <option>Over 18</option>
                        <option>17</option>
                        <option>16</option>
                        <option>15</option>
                        <option>14</option>
                        <option>13</option>
                        <option>12</option>
                        <option>11</option>
                        <option>10</option>
                        <option>9</option>
                        <option>8</option>
                        <option>7</option>
                        <option>6</option>
                        <option>5</option>
                        <option>4</option>
                        <option>3</option>
                        <option>2</option>
                        <option>1</option>
                        <option>Under 1</option>
                    </select>
                
                </div>

            </div>

            <DietSection diet={ dietry.dietry.diet } allergies={ dietry.dietry.allergies } showGuest={ "" } hideGuest={ "" } onChange={ onChangeOptionGuest } valueDiet={ additionalGuests[arrayNumber].diet } valueAllergies={ additionalGuests[arrayNumber].allergies } titleType={ "guest" } arrayNumber={ arrayNumber }/>

        </div>

    )

}