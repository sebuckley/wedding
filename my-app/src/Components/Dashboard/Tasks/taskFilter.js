

import '../Dashboard.css';

export default function TaskFilter(props){

    const setTaskFilter = props.setTaskFiltered;

    const onClick = (e) => {

        e.preventDefault();
        setTaskFilter(e.target.innerText);

         const filterButtons = document.getElementsByClassName('filterButton');

        for(let i = 0; i < filterButtons.length; i++){

            filterButtons[i].className = "filterButton";

        }

        const filterButtons2 = document.getElementsByClassName('filterButton2');

        for(let i = 0; i < filterButtons2.length; i++){

            filterButtons2[i].className = "filterButton2";

        }

        e.target.className = "filterButton activeFB";

    }

    const onClick2 = (e) => {

        e.preventDefault();
        setTaskFilter(e.target.innerText);

        const filterButtons = document.getElementsByClassName('filterButton');

        for(let i = 0; i < filterButtons.length; i++){

            filterButtons[i].className = "filterButton";

        }

        const filterButtons2 = document.getElementsByClassName('filterButton2');

        for(let i = 0; i < filterButtons2.length; i++){

            filterButtons2[i].className = "filterButton2";

        }

        e.target.className = "filterButton2 activeFB2";

    }

    return (

        <div>

            <div className="filterButtons 1"> 

                <button className='filterButton activeFB' onClick={ onClick }>All</button>
                <button className='filterButton' onClick={ onClick }>To-do</button>
                <button className='filterButton' onClick={ onClick }>In-progress</button>
                <button className='filterButton' onClick={ onClick }>Completed</button>
               

            </div>

            <div className="filterButtons 2"> 

                <button className='filterButton2' onClick={ onClick2 }>Not started</button>
                <button className='filterButton2' onClick={ onClick2 }>Planned</button>
                <button className='filterButton2' onClick={ onClick2 }>Researched</button>
                <button className='filterButton2' onClick={ onClick2 }>Enquiry made</button>
                <button className='filterButton2' onClick={ onClick2 }>Selected</button>

            </div>

        </div>

    )

}