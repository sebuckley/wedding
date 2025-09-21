import { splitByCapitalNums } from "./dataFunctions";

export default function TaskRow(props){

    const itemID = props.itemID;
    const taskName = props.taskName;
    const state = props.state;
    const activity = props.activity;
    const toDoDate = props.toDoDate;
    const deleteTaskItem = props.deleteTaskItem;
    const onChangeDate = props.onChangeDate;
    const onChange = props.onChange;
    const linkSuppliers = props.linkSuppliers;
    const getSupplierLink = props.getSupplierLink;
    const supplierID = props.supplierID;
    
    const selectOptionState = (className, state) => {

        let currentState;

        if(state ===""){

        currentState = "To-do";

        }else{
    
        currentState = state;

        }

        return(

        <select className={ className } onChange={ onChange } defaultValue={ currentState }>

            <option value="To-do">To-do</option>
            <option value="In-progress">In-progress</option>
            <option value="Completed">Completed</option>

        </select>

        )

    }

    const selectOptionActivity = (className, activity) => {

        let currentState;

        if(activity ===""){

        currentState = "Not started";

        }else{
    
        currentState = activity;

        }

        return(

        <select className={ className } onChange={ onChange } defaultValue={ currentState }>

            <option value="Not started">Not started</option>
            <option value="Planned">Planned</option>
            <option value="Researching">Researching</option>
            <option value="Enquiry made">Enquiry made</option>
            <option value="Selected">Selected</option>

        </select>

        )


    }

    const addDate = (date, type) => {

        let returnObject;
        let currentDate;

        if (date === "" || date === null) {

        currentDate = "";

        }else{

        if(type === "input"){

            currentDate = new Date(date).toISOString().split('T')[0];

        }else{

            currentDate = new Date(date);
            let year = currentDate.getFullYear();
            let month = currentDate.getMonth()+1;
            let dt = currentDate.getDate();

            if (dt < 10) {
            dt = '0' + dt;
            }
            if (month < 10) {
            month = '0' + month;
            }
            currentDate = dt + '/' + month + '/' + year;

        }
        
        }

        if(type === "input"){

        
            returnObject = <input type='date' onChange={ onChangeDate } className="dateBox2" value={ currentDate }></input>


        }else{

            returnObject = currentDate

        }

        return returnObject;

    }

    const getObject = () => {

        let object;

        if(state === "To-do" && toDoDate === ""){

            object = <div className="inputDelete col-2" style={{display: "flex", alignItems: "flex-end"}}><button className="deleteButton" onClick={ deleteTaskItem }>Delete</button></div>;

        }else if(state === "Completed"){

            object = <div className="inputDelete col-2" style={{display: "flex", alignItems: "flex-end", marginBottom: "20px"}}>{ getSupplierLink(supplierID) } </div>;

        }else{

            object = <div className="inputDelete col-2" style={{display: "flex", alignItems: "flex-end", marginBottom: "20px"}}>{ linkSuppliers(taskName, state, activity) } </div>;

        }


        return object;

    }

    return(

        <div className="row" key={ itemID }>

            <div className="titleName col-3" style={{display: "flex", alignItems: "flex-end", marginBottom: "20px"}}>

                
                { splitByCapitalNums(taskName) }:
                

            </div>

            <div className="state col-2">

                <label>Current State:
                { selectOptionState(taskName  + " state", state) }
                </label>
            </div>

            <div className="state col-2">

                <label>Current Activity:
                { selectOptionActivity(taskName + " activity", activity) }
                </label>
            
            </div>

            <div className="inputDate col-3">
                <label>Due Date:
                {state === "Completed" ?  addDate(toDoDate): addDate(toDoDate, "input") }
                </label>

            </div>

            

            { getObject() }

            

            <div className="inputID" style={{"display": "none"}}>

                { itemID }

            </div>

            <div className="taskName" style={{"display": "none"}}>

                { taskName }

            </div>

        </div>


    )

}