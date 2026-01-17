

import '../Dashboard.css';

export default function TaskSort(props){
 
    const setTaskSortedBy = props.setTaskSortedBy;
    const setTaskSorted = props.setTaskSorted;
    const taskSorted = props.taskSorted;
    const taskSortedBy = props.taskSortedBy;
    const taskGroupBy = props.taskGroupBy;
    const setTaskGroupBy = props.setTaskGroupBy;
    const settings = props.settings;
    const setSettings = props.setSettings;

    const onChange = (e) => {

        e.preventDefault();

        const settingsCopy = { ...settings };

        const itemName = e.target.className;
        const itemValue = e.target.value;
        
        if(itemName === "taskSortedBy"){

            setTaskSortedBy(itemValue);
            settingsCopy["tasks"].sort.taskSortedBy = itemValue;

        }else if(itemName === "taskGroupBy"){

            setTaskGroupBy(itemValue);
            settingsCopy["tasks"].sort.taskGroupedBy = itemValue;

        }else{

            setTaskSorted(itemValue);
            settingsCopy["tasks"].sort.taskSorted = itemValue;

        }

        setSettings(settingsCopy);
        sessionStorage.setItem("settings", JSON.stringify(settingsCopy));

    }

    return (

        <div className="sortOptions"> 

            <div className="col-3">

                <select name="taskGroupBy" className="taskGroupBy" onChange={ onChange } value={ taskGroupBy } >

                    <option value="none">List</option>
                    <option value="group">Task Group Type</option>
                    <option value="phase">Task Phase</option>
                    <option value="order">Priority Order</option>

                </select>

            </div>

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