import React, { useState, useEffect } from 'react';
import Select from '../../../Wigits/select'

export default function DietSection(props){

    const diet = props.diet;
    const allergies = props.allergies;
    const bridal = props.bridal || false;
    const showGuest = props.showGuest;
    const onChange = props.onChange;
    const onInput = props.onInput;
    const valueDiet = props.valueDiet;
    const valueAllergies = props.valueAllergies;
    const titleType = props.titleType;
    const arrayNumber = props.arrayNumber;
    const guestNumber = arrayNumber + 1;
    const disableItem = props.disableItem;
    let name = props.name;
    const [display, setDisplay] = useState("none");
    const [empty, setEmpty] = useState(0);
    const [itemName, setItemName] = useState("");


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
        name = name + "'s";
        let emptyText;

        if(empty === 0){

            emptyText = "[completed]";

        }else{

            emptyText = "[" + empty + " incomplete]";
        }

        if(type === "guest"){

            title = "Additional Guest " + guestNumber + " dietry requirements"  + " " + emptyText;

        }else{

            title = disableItem ? text + " dietry requirements" : name + " dietry requirements" + " " + emptyText;

        }

        return title;

    }

    const getClassName = (name, bridal, number="") => {

        let nameClass = itemName;
        let returnText;

        if(itemName === ""){

            if(number === ""){

               nameClass = "dietryCheck " + name;

            }else{

                nameClass = "dietryCheck" + number.toString();

            }

            setItemName(nameClass);

        }

        if(number === "" && bridal === false){

            returnText = nameClass;

        } else if(number === "" && bridal){

            returnText = nameClass + " " + bridal;

        }else{

            returnText = nameClass + " " + number;

        }

        return returnText;

    }

    const displayDiet = () => {

        if(display === ""){

            setDisplay("none");

        }else{

            setDisplay("");

        }

    }

    const returnIcon = () => {

        let icon;

        if(display === "none"){

            icon = <i onClick={ displayDiet } id="addDietIcon" className="fa fa-circle-plus iconHeader2"></i>

        }else{

            icon = <i onClick={ displayDiet } id="addDietIcon" className="fa fa-circle-minus iconHeader2"></i>

        }

        return icon;

    }

    const addCommentsBox = () => {

        return (

            <div className="row">
                <div className="inputGroupFull">
                    <label className="label">Please provide more details:</label>
                    <textarea style={{width: "calc(100% - 20px)"}} className={ getClassName("comments",bridal, arrayNumber)} name="commentsDietry" onInput={ onInput } value={ props.valueComments || "" }></textarea>
                </div>
            </div>

        )

    }

    const checkEmpty = (item) => {

        const items = document.getElementsByClassName(item);

        let empty = 0;

        for(let i=0; i< items.length; i++){

            let value = items[i].value;
            
            if(value === ""){

                empty += 1;
                items[i].style.borderColor = "red";

            }else{

                items[i].style.borderColor = "var(--grey)";

            }

        }

        setEmpty(empty);

    }

    useEffect(() => {

        checkEmpty(itemName);

    });

    return(

        <>

            <h2 style={{textAlign: "left",width:"100%"}}>{ returnIcon() }{ getTitle(titleType) }</h2>

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

            { valueAllergies === "Complex" || valueAllergies === "Other"  ? addCommentsBox() : "" }

            { showGuest !== "" ? addRSVPButton() : "" }

            </div>

        </>



    )


}
