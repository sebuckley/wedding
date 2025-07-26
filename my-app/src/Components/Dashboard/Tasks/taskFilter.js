

import '../Dashboard.css';

export default function TaskFilter(props){

    const setTaskFilter = props.setTaskFiltered;
    const filterName = props.filterName;
    
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

    const getActive = (button, filterName, type) => {

        let text;

        if(type === 1){

            if(button === filterName){

                text = "filterButton activeFB";

            }else{

                text = "filterButton";

            }

        }else{

            if(button === filterName){

                text = "filterButton2 activeFB2";

            }else{

                text = "filterButton2";

            }


        }

        return text;

    }

    return (

        <div>

            <div className="filterButtons 1"> 

                <button className={ getActive("All", filterName,1) } onClick={ onClick }>All</button>
                <button className={ getActive("To-do", filterName,1) } onClick={ onClick }>To-do</button>
                <button className={ getActive("In-progress", filterName,1) } onClick={ onClick }>In-progress</button>
                <button className={ getActive("Completed", filterName,1) } onClick={ onClick }>Completed</button>
               
            </div>

            <div className="filterButtons 2"> 

                <button className={ getActive("Not started", filterName,2) } onClick={ onClick2 }>Not started</button>
                <button className={ getActive("Planned", filterName,2) } onClick={ onClick2 }>Planned</button>
                <button className={ getActive("Researched", filterName,2) } onClick={ onClick2 }>Researched</button>
                <button className={ getActive("Enquiry made", filterName,2) } onClick={ onClick2 }>Enquiry made</button>
                <button className={ getActive("Selected", filterName,2) } onClick={ onClick2 }>Selected</button>

            </div>

        </div>

    )

}