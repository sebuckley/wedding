import React from 'react';
import Select from '../../Wigits/select'

export default function DietSection(props){

    const diet = props.diet;
    const allergies = props.allergies

    return(

        <div className="dietRow">

            <h2>Your dietry requirements</h2>
    
            <div className="row">

                <div className="inputGroupHalf">
                
                    <label className="label">Diet:</label>

                    <Select name="diet" arrayList={ diet } />

                </div>

                <div className="inputGroupHalf">

                    <label className="label">Allergies:</label>

                    <Select name="allergies" arrayList={ allergies } />

                </div>

            </div>

            <div className="row">

                <div className="inputGroupHalf">

                    <label className='label'>Are you bringing a plus one:</label>
                    <div className="btn-group" role="group" aria-label="Basic example">
                        <button type="button" className="btn btn-secondary btnLeft showGuest" onClick={ props.showGuest }>Yes</button>
                        <button type="button" className="btn btn-secondary btnRight hideGuest" onClick={ props.hideGuest }>No</button>
                    </div>
                    
                </div>

            </div>

        </div>




    )


}
