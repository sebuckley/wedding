import React from 'react';
import Select from '../../Wigits/select'
import AdditionalGuests from './additionalguests'

export default function PlusOne(props){

    const diet = props.diet;
    const allergies = props.allergies;
    const wedding = props.wedding;
    const weddingGuest = props.weddingGuest;
    const maxWeddingGuests = wedding.maxGuests;


    return(

        <div>

            <h2>Plus one</h2>

            <div className="row hidden">

                <div className="inputGroupHalf">
                    
                    <label className='label'>First name:</label>
                    <input type="text" className="firstName" name="fName"></input>

                </div>

                <div className="inputGroupHalf">

                    <label className='label'>Surname:</label>
                
                    <input type="text" className="secondName" name="sName"></input>

                </div>

            </div>

            <h2>Your plus one dietry requirements</h2>

            <div className="row hidden">

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

            { maxWeddingGuests > 1 ? <AdditionalGuests wedding={ wedding } weddingGuest={ weddingGuest } diet={ diet } allergies={ allergies }/>: "" }

        </div>


    )


}
