
import React from 'react';
import Select from '../../../Wigits/select'

export default function OneAdditionalGuest(props){

    const diet = props.diet;
    const allergies = props.allergies;

    return(


        <div>
            
            <h2>Please enter your additional guest</h2>

            <div className="row">

                <div className="inputGroupHalf">
                    
                    <label className='label'>First name:</label>
                    <input type="text" className="firstName" name="fName"></input>

                </div>

                <div className="inputGroupHalf">

                    <label className='label'>Surname:</label>
                    
                    <input type="text" className="secondName" name="sName"></input>

                </div>

            </div>

            <div className="row">

                <div className="inputGroupHalf">
                    
                    <label className="label">Age:</label>
                    <Select name="age" arrayList={ ["under 5", "under 18", "over 18"] } blank={ true } none={ false } />

                </div>

                <div className="inputGroupHalf">
                
                    <label className="label">Diet:</label>
                    <Select name="dietGuest" arrayList={ diet } blank={ true } none={ true }/>

                </div>

                <div className="inputGroupHalf">

                    <label className="label">Allergies:</label>
                    <Select name="allergiesGuest" arrayList={ allergies } blank={ true } none={ true }/>

                </div>

            </div>

        </div>

       

    )

}