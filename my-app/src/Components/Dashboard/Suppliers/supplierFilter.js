

import '../Dashboard.css';

export default function SupplierFilter(props){

    const setSupplierFilter = props.setSupplierFilter;
    const filterName = props.filterName;
    const settings = props.settings;
    const setSettings = props.setSettings;

    const onClick = (e) => {

        let value = e.target.innerText.trim();

        const copySettings = { ...settings };

        console.log("copySettings", copySettings)
        copySettings["suppliers"].filter.state = value;
        setSettings(copySettings);
        sessionStorage.setItem("settings", JSON.stringify(copySettings));

        e.preventDefault();
        setSupplierFilter(value);

        const filterButtons = document.getElementsByClassName('supplierfilterButton');

        for(let i = 0; i < filterButtons.length; i++){

            filterButtons[i].className = "supplierfilterButton";

        }

        e.target.className = "supplierfilterButton activeSupplierFB";

    }

    const getActive = (button, name) =>{

        let text;

        if(button === name){

            text = "supplierButton activeSupplierFB";

        }else{

            text = "supplierfilterButton";

        }

        return text;

    }

    return (

        <div className="filterButtons"> 

            <button className={ getActive("All", filterName) } onClick={ onClick }>All</button>
            <button className={ getActive("Ruled out", filterName) } onClick={ onClick }>Ruled out</button>
            <button className={ getActive("Shortlisted", filterName) } onClick={ onClick }>Shortlisted</button>
            <button className={ getActive("Enquiry made", filterName) } onClick={ onClick }>Enquiry made</button>
            <button className={ getActive("Quote received", filterName) } onClick={ onClick }>Quote received</button>
            <button className={ getActive("Booked", filterName) } onClick={ onClick }>Booked</button>

        </div>

    )

}