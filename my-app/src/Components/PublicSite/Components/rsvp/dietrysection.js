import React, { useState } from 'react';
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
    const disableItem = props.disableItem;
    let name = props.name;
    const [display, setDisplay] = useState("none")

    const addRSVPButton = () => {

        return (

             <div className="row">

                <div className="inputGroupHalf">

                    <label className='label'>{ disableItem ? "Are you " : "Is " + name } bringing a plus one:</label>
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
        let text = "Your ";
        name = name + "'s"

        if(type === "guest"){

            title = "Guests dietry requirements";

        }else{

            title = disableItem ? text + " dietry requirements" : name + " dietry requirements";

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

    const displayDiet = () => {

        const getIcon = document.getElementById("addDietIcon");

        if(display === ""){

            setDisplay("none");
            getIcon.className = "fa fa-circle-plus iconHeader2";

        }else{

            setDisplay("");
            getIcon.className = "fa fa-circle-minus iconHeader2";

        }


    }

    return(

        <>

            <h2 style={{textAlign: "left",width:"100%"}}><i onClick={ displayDiet } id="addDietIcon" className="fa fa-circle-plus iconHeader2"></i>{ getTitle(titleType) }</h2>

            <div className="dietRow" style={{display:display}}>

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

        </>



    )


}
