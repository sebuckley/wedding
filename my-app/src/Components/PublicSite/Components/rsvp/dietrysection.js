import React from 'react';
import Select from '../../../Wigits/select'

export default function DietSection(props){

    const diet = props.diet;
    const allergies = props.allergies;
    const bridal = props.bridal || false;
    const showGuest = props.showGuest;
    const onChange = props.onChange;
    const valueDiet = props.valueDiet;
    const valueAllergies = props.valueAllergies;
    const titleType = props.titleType;
    const arrayNumber = props.arrayNumber;

    const addRSVPButton = () => {

        return (

             <div className="row">

                <div className="inputGroupHalf">

                    <label className='label'>Are you bringing a plus one:</label>
                    <div className="btn-group" role="group" aria-label="Basic example">
                        <button type="button" className="btn btn-secondary btnLeft showGuest" onClick={ props.showGuest }>Yes</button>
                        <button type="button" className="btn btn-secondary btnRight hideGuest" onClick={ props.hideGuest }>No</button>
                    </div>
                    
                </div>

            </div>
        )

    }

    const getTitle = (type) => {

        let title;

        if(type === "guest"){

            title = "Guests dietry requirements";

        }else{

            title = "Your dietry requirements";

        }

        return title;

    }

    const getClassName = (name, bridal, number = "") => {

        let returnText;

        if(number === "" && bridal === false){

            returnText = name;

        } else if(number === "" && bridal){

            returnText = name +" " + bridal;

        }else{

            returnText = name + " " + arrayNumber;

        }

        return returnText;

    }

    return(

        <div className="dietRow">

            <h2>{ getTitle(titleType) }</h2>
    
            <div className="row">

                <div className="inputGroupHalf">
                
                    <label className="label">Diet:</label>

                    <Select className={ getClassName("diet",bridal, arrayNumber)} name="diet" arrayList={ diet } onChange={ onChange } value={ valueDiet }/>

                </div>

                <div className="inputGroupHalf">

                    <label className="label">Allergies:</label>

                    <Select className={ getClassName("allergies",bridal, arrayNumber)} name="allergies" arrayList={ allergies }  onChange={ onChange } value={ valueAllergies } />

                </div>

            </div>

           { showGuest !== "" ? addRSVPButton() : "" }

        </div>




    )


}
