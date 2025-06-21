

import '../Dashboard.css';

export default function ListType(props){

    const setListType = props.setListType;

    const onClick = (e) => {

        e.preventDefault();
        setListType(e.target.innerText);

        const filterButtons = document.getElementsByClassName('listSelectButton');

        for(let i = 0; i < filterButtons.length; i++){

            filterButtons[i].className = "listSelectButton";

        }

        e.target.className = "listSelectButton activeLS";

    }

    return (

        <div className="listSelectButtons"> 

            <button className="listSelectButton activeLS" onClick={ onClick }>Primary guests</button>
            <button className="listSelectButton" onClick={ onClick }>Guest list</button>
            <button className="listSelectButton" onClick={ onClick }>Dietry list</button>

        </div>

    )

}