

import '../Dashboard.css';

export default function GuestFilter(props){

    const setGuestFilter = props.setGuestFilter;
    const filterName = props.filterName;

    const onClick = (e) => {

        e.preventDefault();
        setGuestFilter(e.target.innerText);

        const filterButtons = document.getElementsByClassName('guestfilterButton');

        for(let i = 0; i < filterButtons.length; i++){

            filterButtons[i].className = "guestfilterButton";

        }

        e.target.className = "guestfilterButton activeGuestFB";

    }

    const getActive = (button, name) =>{

        let text;

        if(button === name){

            text = "guestfilterButton activeGuestFB";

        }else{

            text = "guestfilterButton";

        }

        return text;

    }

    return (

        <div className="filterButtons"> 

            <button className={ getActive("All", filterName) } onClick={ onClick }>All</button>
            <button className={ getActive("Confirmed", filterName) } onClick={ onClick }>Confirmed</button>
            <button className={ getActive("Declined", filterName) } onClick={ onClick }>Declined</button>
            <button className={ getActive("Not confirmed", filterName) } onClick={ onClick }>Not confirmed</button>

        </div>

    )

}