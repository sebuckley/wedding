

import '../Dashboard.css';

export default function ListType(props){

    const setListType = props.setListType;
    const listType = props.listType;
    const settings = props.settings;
    const setSettings = props.setSettings;  

    const onClick = (e) => {

        e.preventDefault();
        setListType(e.target.innerText);
        const newSettings = { ...settings };
        newSettings["guestList"].filter.listType = e.target.innerText;
        setSettings(newSettings);
        sessionStorage.setItem("settings", JSON.stringify(newSettings));

        const filterButtons = document.getElementsByClassName('listSelectButton');

        for(let i = 0; i < filterButtons.length; i++){

            filterButtons[i].className = "listSelectButton";

        }

        e.target.className = "listSelectButton activeLS";

    }

    const getActive = (button, listType) => {

        let text;

        if(listType === button){

            text = "listSelectButton activeLS";

        }else{

            text = "listSelectButton";

        }

        return text;

    }

    return (

        <div className="listSelectButtons"> 

            <button className={ getActive("Wedding party", listType) } onClick={ onClick }>Wedding party</button>
            <button className={ getActive("Primary guests", listType) } onClick={ onClick }>Primary guests</button>
            <button className={ getActive("Guest list", listType) } onClick={ onClick }>Guest list</button>
            <button className={ getActive("Dietry list", listType) } onClick={ onClick }>Dietry list</button>

        </div>

    )

}