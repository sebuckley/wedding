import { splitByCapitalNums } from "./dataFunctions";
import { supplierStatuses } from "../../App";
import { Link } from 'react-router-dom';

export default function TaskRow(props){

    const taskID = props.taskID;
    const taskName = props.taskName;
    const state = props.state;
    const activity = props.activity;
    const toDoDate = props.toDoDate;
    const deleteTaskItem = props.deleteTaskItem;
    const onChangeDate = props.onChangeDate;
    const linkSuppliers = props.linkSuppliers;
    const getSupplierLink = props.getSupplierLink;
    const supplierID = props.supplierID;
    const taskListConfirmed = props.taskListConfirmed;
    
    const selectOptionState = (className, state) => {

        let currentState;

        if(state ===""){

        currentState = "To-do";

        }else{
    
        currentState = state;

        }

        return(

        <select className={ className }  value={ currentState } disabled>

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

        <select className={ className }  value={ currentState } disabled>

            { 
            
                supplierStatuses.map((item) => {

                    return (

                        <option value={item}>{item}</option>

                    )

                }) 
            
            }

        </select>

        )


    }

    const addDate = (date, type) => {

        let returnObject;
        let currentDate;

        if (!date || isNaN(new Date(date).getTime())) {

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

         
            returnObject = <div className="inputDate inputGroupColumn col-3" ><label>Next Action Date:</label><input type='date' onChange={ onChangeDate } className="dateBox2" value={ currentDate }></input></div>


        }else{

            returnObject = <div className="inputDate col-3" style={{display: "flex", alignItems: "flex-end", marginBottom: "20px"}}><label>Due Date:</label>{ currentDate }</div>

        }

        return returnObject;

    }

    const getObject = () => {

        let object;

        if(state === "To-do" && toDoDate === ""){

            object = !taskListConfirmed ? <div className="inputDelete col-2"><button className="deleteButton" onClick={ deleteTaskItem }>Delete</button></div> : <div className="inputDelete col-2" style={{display: "flex", alignItems: "flex-end", marginBottom: "20px"}}></div>

        }else if(state === "Booked"){

            object = <div className="inputDelete col-2" >{ getSupplierLink(supplierID.trim()) } </div>;

        }else{

            object = <div className="inputDelete col-2">{ linkSuppliers(taskName, state, activity, taskID) } </div>;

        }


        return object;

    }

    return(

        <div className="row" key={ taskID }>

            <div className="taskTitleName col-3">

                 <Link to={`/managemywedding/task/?taskId=${ taskID }`}>{ taskName }:</Link>
                

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

           
            {state === "Completed" ?  addDate(toDoDate): addDate(toDoDate, "input") }
               

            

            { getObject() }

            

            <div className="inputID" style={{"display": "none"}}>

                { taskID }

            </div>

            <div className="taskName" style={{"display": "none"}}>

                { taskName }

            </div>

        </div>


    )

}