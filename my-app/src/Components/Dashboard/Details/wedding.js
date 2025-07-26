import WeddingColorSelector from "./weddingColors";
import WeddingStyleDropdown from "./weddingStyle";
import SizePreferenceList from "./country";

export default function WeddingPlans(props){

    const setBridalParty = props.setBridalParty;
    const saveBridalParty = props.saveBridalParty;
    const setListUpdated = props.setListUpdated;
    const bridalParty = props.bridalParty;
    const listUpdated = props.listUpdated;
    const details = bridalParty["weddingDetails"];
    const handleChange = props.handleChange;
    const getColor = props.getColor;
    let budget;
    let country;
    let sizeSystem
    let location;
    let date;
    let mainColor;
    let accentColor;
    let weddingStyle;
    let religiousType;
    let maxGuests;

    if(typeof details !== "undefined"){

        date = details.dateTime;
       
        budget = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(details.budget);
        country = details.country;
        sizeSystem = details.sizeSystem;
        location = details.location;
        mainColor = details.mainColor;
        accentColor = details.mainColor;
        weddingStyle = details.weddingStyle;
        religiousType = details.religiousType;
        maxGuests = details.maxGuests;

    }else{

        budget = ""; 
        country = "";
        sizeSystem = ""
        location = "";   
        mainColor = "";
        accentColor = "";
        weddingStyle = "";
        religiousType = "";
        maxGuests = "";

    }

    const changeToDate = () => {

        let item = document.getElementsByClassName("dateChange");
        item[0].type = 'datetime-local';

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

    }

    const getDateValue = (date) => {

        let returnValue = "";

        if(date !== ""){

            returnValue = date;

        }
        
        return returnValue;

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

            item[0].value = !isNaN(Number(currentValue))
                                    ? new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(Number(currentValue))
                                    : currentValue

        }

    }

    return(

        <>

            <h2 className="text-2xl font-semibold mb-4">Wedding Plans</h2>

             <div className='row'>

                <div className='inputGroup col-12'>
                    <label className="block mb-2 font-semibold">
                        Preferred date and time:
                    </label>
                    <div>
                        <i className="fa-solid fa-calendar-day icon"></i>
                        <input type={ checkType(date) } className='inputBox dateChange weddingDetails' name="dateTime" placeholder="Proposed date and time"   onFocus={ changeToDate } onBlur={ changeToText } defaultValue={ getDateValue(date) }></input>
                    </div>
                </div>

            </div>

            <div className='row'>

                <div className='inputGroup col-12'>
                    <label className="block mb-2 font-semibold">
                        Budget:
                    </label>
                    <div>
                        <i className="fa-solid fa-sterling-sign icon"></i>
                        <input
                            type='text'
                            className='inputBox costChange weddingDetails'
                            name="budget"
                            placeholder="£10,000.00 (budget)"
                            step="0.01"
                            onBlur={changeToTextCost}
                            
                            numeric="true"
                            defaultValue={
                                budget && !isNaN(Number(budget))
                                    ? new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(Number(budget))
                                    : budget
                            }
                        />
                    </div>
                </div>

            </div>

            <div className='row'>

                <div className='inputGroup col-12'>
                    <label className="block mb-2 font-semibold">
                        Preferred location:
                    </label>
                    <div>
                        <i className="fa-solid fa-location-arrow icon"></i>
                        <input type='text' className='inputBox weddingDetails' name="location" onInput={ handleChange } placeholder="Preferred location" defaultValue={ location }></input>
                    </div>
                </div>

            </div>

            <div className='row'>

                <div className='inputGroup col-12'>
                     <label className="block mb-2 font-semibold">
                        Max guests:
                    </label>
                    <div>
                        <i className="fa-solid fa-person-circle-question icon"></i>
                        <input type='number' className='inputBox weddingDetails' name="maxGuests" onInput={ handleChange } placeholder="max guests" defaultValue={ maxGuests }></input>
                    </div>

                </div>

            </div>

             <div className='row'>

                <div className='inputGroup col-12'>
                   <SizePreferenceList getColor={ getColor } handleChange={ handleChange } sizeSystem={ sizeSystem } country={ country }/>
                </div>

            </div>

            <WeddingStyleDropdown handleChange={ handleChange } getColor={ getColor } weddingStyle={ weddingStyle } religiousType={ religiousType }/>

            <WeddingColorSelector getColor={ getColor } mainColor={ mainColor } accentColor={ accentColor } handleChange={ handleChange }/>

          
        </>

    );


}