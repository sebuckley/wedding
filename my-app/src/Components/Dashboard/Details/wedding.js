import { useState } from 'react';
import WeddingColorSelector from "./weddingColors";
import WeddingStyleDropdown from "./weddingStyle";
import SizePreferenceList from "./country";
import CurrencySelector from "./currency"; 
import currencyList from "./currencyList";
import { wedding } from '../../PublicSite/Components/Data/data';


export default function WeddingPlans(props){

    const setBridalParty = props.setBridalParty;
    const saveBridalParty = props.saveBridalParty;
    const setListUpdated = props.setListUpdated;
    const bridalParty = props.bridalParty;
    const listUpdated = props.listUpdated;
    const details = bridalParty["weddingDetails"];
    const handleChange = props.handleChange;
    const getColor = props.getColor;
    const formEmpty = props.formEmpty;
    const checkEmpty = props.checkEmpty;
    const countryEmpty = props.countryEmpty;
    const styleEmpty = props.styleEmpty;
    const colorEmpty = props.colorEmpty;
    let budget = 0;
    let country;
    let sizeSystem
    let location;
    let dateWedding;
    let receptionDate;
    let dateTimeEnd;
    let rsvpDate;
    let mainColor;
    let accentColor;
    let weddingStyle;
    let weddingStyleDescription;
    let religiousType;
    let maxGuests;
    let currency;
    let disableItem = true;
    let initialEmptyCheck;

    if(typeof details !== "undefined"){

        dateWedding = details?.dateTime;
        rsvpDate = details?.dateTimeRSVP || "";
        receptionDate = details?.dateTimeReception || "";
        dateTimeEnd = details?.dateTimeEnd || "";
        budget = typeof details?.budget === "undefined" ? "" : details?.budget;
        country = details?.country || "";
        sizeSystem = details?.sizeSystem || "";
        location = details?.location || "";
        mainColor = details?.mainColor || "";
        accentColor = details?.mainColor || "";
        weddingStyle = details?.weddingStyle || "";
        weddingStyleDescription = details?.styleDescription || "";
        religiousType = details?.religiousType || "";
        maxGuests = details?.maxGuests  || "";
        currency = typeof details?.currency === "undefined" ? "" : details?.currency;
        disableItem = currency === "" ? true : false;
        initialEmptyCheck = props.initialEmptyCheck;


    }else{

        budget = ""; 
        dateWedding = "";
        receptionDate = "";
        rsvpDate = details?.dateTimeRSVP || "";
        dateTimeEnd = details?.dateTimeEnd || "";
        country = "";
        sizeSystem = ""
        location = "";   
        mainColor = "";
        accentColor = "";
        weddingStyle = "";
        religiousType = "";
        maxGuests = "";
        currency = "GBP";
        initialEmptyCheck = props.initialEmptyCheck;

    }

    const parseCost = (num) => {

        return currencyList[currency].symbol + parseFloat(num).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    }

    const changeToDate = () => {

        let item = document.getElementsByClassName("dateChange");
        item[0].type = 'datetime-local';
        if (item[0].value === "") {
            const date = new Date();
            date.setHours(13, 0);
            item[0].value = date.toISOString().slice(0, 16);
        }
        item[0].showPicker();

    }

    const changeToText = (e) => {

        const { name, value } = e.target;
        const className = e.target.className;
        
        const split = className.split(" ");
        const createName = split[split.length - 1];

        if (!(createName in bridalParty)) {

            bridalParty[createName] = {};

        }

        bridalParty[createName][name] = value;
    
        setBridalParty(bridalParty);
        saveBridalParty(bridalParty);
        setListUpdated(listUpdated + 1);
        checkEmpty(e.target);

    }

    const getDateValue = (date) => {

        let returnValue = "";

        if(date !== ""  && typeof date !== "undefined"){

            returnValue = date;

        }
        
        return returnValue;

    }

    const getRSVPDateValue = (date) => {

        let object;

        if (date === "" || typeof date === "undefined"){

            object = "";

        }else{

            if(rsvpDate === ""){

                rsvpDate = new Date(dateWedding);
                // Subtract 4 weeks (28 days)
                const daysToSubtract = 28;
                rsvpDate.setDate(rsvpDate.getDate() - daysToSubtract);
                rsvpDate = rsvpDate.toISOString().slice(0, 16);

                bridalParty["weddingDetails"]["dateTimeRSVP"] = rsvpDate;

                setBridalParty(bridalParty);
                saveBridalParty(bridalParty);
                setListUpdated(listUpdated + 1);

            }

            object =  <div className='row'>

                <div className='inputGroupColumn col-12'>
                    <label className="block mb-2 font-semibold">
                        RSVP:
                    </label>
                    <div class='col-12'>
                        <i className="fa-solid fa-calendar-day icon"></i>
                        <input type={ checkType(rsvpDate) } className='dateBox dateChange checkDetails weddingDetails' style={ getColor(rsvpDate) } name="dateTimeRSVP" placeholder="Proposed RSVP date and time" onFocus={ changeToDate } onBlur={ changeToText } defaultValue={ getDateValue(rsvpDate) }></input>
                    </div>
                </div>

            </div>

        }


        return object;

    }

    const getReceptionDateValue = (date) => {

        let object;

        if (date === "" || typeof date === "undefined"){

            object = "";

        }else{

            if(receptionDate === ""){

                receptionDate = new Date(dateWedding);
                receptionDate = receptionDate.toISOString().split('T')[0] + "T20:00";;

                bridalParty["weddingDetails"]["dateTimeReception"] = receptionDate;

                setBridalParty(bridalParty);
                saveBridalParty(bridalParty);
                setListUpdated(listUpdated + 1);

            }

            object =  <div className='row'>

                <div className='inputGroupColumn col-12'>
                    <label className="block mb-2 font-semibold">
                        Reception Date & Time:
                    </label>
                    <div class='col-12'>
                        <i className="fa-solid fa-calendar-day icon"></i>
                        <input type={ checkType(receptionDate) } className='dateBox dateChange checkDetails weddingDetails' style={ getColor(receptionDate) } name="dateTimeRSVP" placeholder="Proposed RSVP date and time" onFocus={ changeToDate } onBlur={ changeToText } defaultValue={ getDateValue(receptionDate) }></input>
                    </div>
                </div>

            </div>

        }


        return object;

    }

    const getEndDateValue = (date) => {

        let object;

        if (date === "" || typeof date === "undefined"){

            object = "";

        }else{

            if(dateTimeEnd === ""){

                dateTimeEnd = new Date(dateWedding);
                dateTimeEnd = dateTimeEnd.toISOString().split('T')[0] + "T23:59";;

                bridalParty["weddingDetails"]["dateTimeEnd"] = dateTimeEnd;

                setBridalParty(bridalParty);
                saveBridalParty(bridalParty);
                setListUpdated(listUpdated + 1);

            }

            object =  <div className='row'>

                <div className='inputGroupColumn col-12'>
                    <label className="block mb-2 font-semibold">
                        Wedding end date/time:
                    </label>
                    <div class='col-12'>
                        <i className="fa-solid fa-calendar-day icon"></i>
                        <input type={ checkType(dateTimeEnd) } className='dateBox dateChange checkDetails weddingDetails' style={ getColor(dateTimeEnd) } name="dateTimeEnd" placeholder="Proposed RSVP date and time" onFocus={ changeToDate } onBlur={ changeToText } defaultValue={ getDateValue(dateTimeEnd) }></input>
                    </div>
                </div>

            </div>

        }


        return object;

    }

    const checkType = (date) => {

        let returnValue;
        
        if(date === ""){

            returnValue = "text";

        }else{

            returnValue = "datetime-local";

        }

        return returnValue;

    }

    // const changeToNumber = () => {

    //     let item = document.getElementsByClassName("costChange");
    //     item[0].type = 'number';

    // }

    const changeToTextCost = (e) => {

        let item = document.getElementsByClassName("costChange");
        let currentValue = item[0].value;

        if(currentValue === ""){

            item[0].type = 'text'; 

        }else{

            item[0].type = 'text';
            

            const { name, value } = e.target;
            const className = e.target.className;
            
            const split = className.split(" ");
            const createName = split[split.length - 1];
    
            if (!(createName in bridalParty)) {
    
                bridalParty[createName] = {};
    
            }
    
            bridalParty[createName][name] = value;
        
            setBridalParty(bridalParty);
            saveBridalParty(bridalParty);
            setListUpdated(listUpdated + 1);
            checkEmpty(e.target);

            item[0].value = !isNaN(Number(currentValue)) ? parseCost(currentValue) : currentValue

        }

    }

    const getPlanStatus = () => {

        let object;

        if(typeof initialEmptyCheck === "undefined"){

            initialEmptyCheck = false;

        }

        if(initialEmptyCheck === false){

            object = "";

        }else{

            if(formEmpty === 0){

                object = <div style={{margin:"5px"}}><span className='labelTag booked' title="current status"><i class="fa-solid fa-circle-check"></i> completed</span></div>;


            }else{

                object = <div style={{margin:"5px"}}><span className='labelTag ruledout' title="current status"><i class="fa-solid fa-circle-xmark"></i>{formEmpty} required fields</span></div>;
            }
        }

        return object;

    }


    return(

        <>

            <div className='row'>
            
              <div className='inputGroup col-8'>

                <h2 className="font-semibold">Wedding Plans</h2>

              </div>

              <div className='col-4' style={{display:"flex",alignItems:"center",justifyContent:"right"}}>

                {  getPlanStatus() }

              </div>

            </div>

            <div className='row'>

                <div className='inputGroupColumn col-12'>
                    <label className="block mb-2 font-semibold">
                        Preferred date and time:
                    </label>
                    <div class='col-12'>
                        <i className="fa-solid fa-calendar-day icon"></i>
                        <input type={ checkType(dateWedding) } className='dateBox dateChange checkDetails weddingDetails' style={ getColor(dateWedding) } name="dateTime" placeholder="Proposed date and time" onFocus={ changeToDate } onBlur={ changeToText } defaultValue={ getDateValue(dateWedding) }></input>
                    </div>
                </div>

            </div>

    
            { getReceptionDateValue(dateWedding) }

             { getEndDateValue(dateWedding) }

            { getRSVPDateValue(dateWedding) }

            <CurrencySelector getColor={ getColor } handleChange={ handleChange } value={ currency }/>

            <div className='row'>

                <div className='inputGroupColumn col-12'>
                    <label className="block mb-2 font-semibold">
                        Budget:
                    </label>
                    <div class='col-12'>
                        { budget !== "" ? <i className="icon">{ currencyList[currency].symbol } </i>: <i className="fa-solid fa-sterling-sign icon"></i> }
                     
                        <input
                            type='text'
                            className='inputBox costChange checkDetails weddingDetails'
                            name="budget"
                            placeholder="£10,000.00 (budget) "
                            onBlur={changeToTextCost}
                            defaultValue={

                                budget === "" ? "" : parseCost(budget) 

                            }
                            disabled={ disableItem }
                        />
                    </div>
                </div>

            </div>

            <div className='row'>

                <div className='inputGroupColumn col-12'>
                    <label className="block mb-2 font-semibold">
                        Preferred location:
                    </label>
                    <div class='col-12'>
                        <i className="fa-solid fa-location-arrow icon"></i>
                        <input type='text' className='inputBox checkDetails weddingDetails' name="location" onInput={ handleChange } placeholder="Preferred location" defaultValue={ location }></input>
                    </div>
                </div>

            </div>

            <div className='row'>

                <div className='inputGroupColumn col-12'>
                     <label className="block mb-2 font-semibold">
                        Max guests:
                    </label>
                    <div class='col-12'>
                        <i className="fa-solid fa-person-circle-question icon"></i>
                        <input type='number' className='inputBox checkDetails weddingDetails' name="maxGuests" onInput={ handleChange } placeholder="max guests" defaultValue={ maxGuests }></input>
                    </div>

                </div>

            </div>

            <SizePreferenceList getColor={ getColor } handleChange={ handleChange } sizeSystem={ sizeSystem } country={ country } initialEmptyCheck={ initialEmptyCheck } countryEmpty={ countryEmpty } checkEmpty={ checkEmpty }/>
 
            <WeddingStyleDropdown handleChange={ handleChange } getColor={ getColor } weddingStyle={ weddingStyle } weddingStyleDescription={ weddingStyleDescription } religiousType={ religiousType } initialEmptyCheck={ initialEmptyCheck } styleEmpty={ styleEmpty }/>

            <WeddingColorSelector getColor={ getColor } mainColor={ mainColor } accentColor={ accentColor } handleChange={ handleChange } initialEmptyCheck={ initialEmptyCheck } colorEmpty={ colorEmpty }/>

        </>

    );


}