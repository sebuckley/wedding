

import '../Dashboard.css';

export default function TaskSort(props){
 
    const setTaskSortedBy = props.setTaskSortedBy;
    const setTaskSorted = props.setTaskSorted;
    const taskSorted = props.taskSorted;
    const taskSortedBy = props.taskSortedBy;

    const onChange = (e) => {

        e.preventDefault();

        const itemName = e.target.className;
        const itemValue = e.target.value;
        
        if(itemName === "taskSortedBy"){

            setTaskSortedBy(itemValue);

        }else{

            setTaskSorted(itemValue);

        }

    }

    return (

        <div className="sortOptions"> 

            <div className="col-2">

                <select name="taskSortedBy" className="taskSortedBy" onChange={ onChange } value={ taskSortedBy } >

                    <option value="taskName">Task Name</option>
                    <option value="type">Type</option>
                    <option value="date">Date</option>

                </select>

            </div>

            <div className="col-2">

                <select name="taskSorted" className="taskSorted" onChange={ onChange } value={ taskSorted }>

                    <option value="asc">Asc</option>
                    <option value="desc">Desc</option>
                    
                </select>

            </div>

        </div>

    )

}