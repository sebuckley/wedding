

import '../Dashboard.css';

export default function GuestFilter(props){

    const setGuestFilter = props.setGuestFilter;

    const onClick = (e) => {

        e.preventDefault();
        setGuestFilter(e.target.innerText);

        const filterButtons = document.getElementsByClassName('guestfilterButton');

        for(let i = 0; i < filterButtons.length; i++){

            filterButtons[i].className = "guestfilterButton";

        }

        e.target.className = "guestfilterButton activeGuestFB";

    }

    return (

        <div className="filterButtons"> 

            <button className="guestfilterButton activeGuestFB" onClick={ onClick }>All</button>
            <button className="guestfilterButton" onClick={ onClick }>Confirmed</button>
            <button className="guestfilterButton" onClick={ onClick }>Declined</button>
            <button className="guestfilterButton" onClick={ onClick }>Not confirmed</button>

        </div>

    )

}