
import React from 'react';
import Select from '../../Wigits/select'

export default function MultipleAdditionalGuest(props){

    const diet = props.diet;
    const allergies = props.allergies;
    const maxGuests = parseInt(props.maxGuests);

    const addAdditionalGuest = (e) => {

        const currentNumber = parseInt(document.getElementById("addNumber").innerText);
        const newNumber = currentNumber + 1;

        console.log(currentNumber + " " + maxGuests);

        if(newNumber <= maxGuests){

            document.getElementById("addNumber").innerText = newNumber;
            const node = document.getElementById("additionalRowSection").lastChild;
            const clone = node.cloneNode(true);

            document.getElementById("additionalRowSection").appendChild(clone);

        }

    }

    const remnoveAdditionalGuest = (e) => {

        const currentNumber = parseInt(document.getElementById("addNumber").innerText);
        const newNumber = currentNumber - 1;

        if(newNumber > 0){

            document.getElementById("addNumber").innerText = newNumber;
            var removeGuets = document.getElementById('additionalRowSection');
            removeGuets.removeChild(removeGuets.lastChild);

        }else if(newNumber === 0){

            props.hideGuests();

        }

        
    }


    return(


        <div>

            <div className="row addGuestRow">

                <div id="addGuest" onClick={ addAdditionalGuest }><div>+</div></div>
                <div id="addNumber">1</div>
                <div id="minusGuest" onClick={ remnoveAdditionalGuest }><div>-</div></div>

            </div>
            
            <h2>Please enter your additional guest</h2>

            <div id="additionalRowSection">

                <div className="additionalRow">

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

            </div>

        </div>

       

    )

}