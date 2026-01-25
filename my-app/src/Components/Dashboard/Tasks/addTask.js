import '../Dashboard.css';
import { useState } from 'react';
import { getTaskList, saveTaskList, checkExistingTask } from '../../Wigits/dataFunctions-taskList';
import { uuidv4 } from '../../Wigits/dataFunctions';

export default function AddTask(props){

    const object = {

        taskName: '',
        groupSelect: '',
        groupInput: '',
        phaseSelect: '',
        phaseInput: ''

    }

    const [display, setDisplay] = useState(false);
    const [formData, setFormData] = useState("");
    const [displayGroupInput, setDisplayGroupInput] = useState(false);
    const [displayPhaseInput, setDisplayPhaseInput] = useState(false);
    const setTaskList = props.setTaskList;
    const taskList = props.taskList;
    const user = props.user;
    const getGroup = props.getGroup;
    const getPhases = props.getPhases;

    if(formData === ''){

        if(localStorage.getItem('newTask') !== null){

            setFormData(localStorage.getItem('newTask'));
            setDisplay(true);

        }else{

            setFormData(object);

        }

    }

    const onChange = (e) =>{

        const value = e.target.value;
        const name = e.target.name;

        if(name === "groupSelect" && value === "add"){

            setDisplayGroupInput(true);
            

        }else if(name === "phaseSelect" && value === "add"){

            setDisplayPhaseInput(true);

        }else if(name === "groupSelect" && value !== "add"){

            setDisplayGroupInput(false);
            

        }else if(name === "phaseSelect" && value !== "add"){

            setDisplayPhaseInput(false);

        }

        checkEmpty(e.target);
        setFormData({...formData, [name]: value});
        localStorage.setItem("newTask", JSON.stringify(formData));

    }

    const checkForm = () => {

        let empty = 0;

        if(formData.taskName === ""){

            empty += 1;
            let item = document.getElementsByName("taskName")[0];
            item.style.borderColor = "var(--red)";

        }else{

            let item = document.getElementsByName("taskName")[0];
            item.style.borderColor = "var(--grey)";

        }

        if(formData.groupSelect === ""){

            empty += 1;
            let item = document.getElementsByName("groupSelect")[0];
            item.style.outline = "2px solid var(--red)";    

        }else{

            let item = document.getElementsByName("groupSelect")[0];
            item.style.outline = "none";        

        }

        if(formData.phaseSelect === ""){

            empty += 1;
            let item = document.getElementsByName("phaseSelect")[0];
            item.style.outline = "2px solid var(--red)";  

        }else{

            let item = document.getElementsByName("phaseSelect")[0];
            item.style.outline = "none";        

        }

         if(formData.groupSelect === "add" && formData.groupInput === ""    ){

            empty += 1;
            let item = document.getElementsByName("groupSelect")[0];
            item.style.outline = "2px solid var(--red)";    

        }else{

            let item = document.getElementsByName("groupSelect")[0];
            item.style.outline = "none";        

        }

        if(formData.phaseSelect === "add" && formData.phaseInput === ""){

            empty += 1;
            let item = document.getElementsByName("phaseSelect")[0];
            item.style.outline = "2px solid var(--red)";  

        }else{

            let item = document.getElementsByName("phaseSelect")[0];
            item.style.outline = "none";  

        }


        return [empty];

    }

    function toProperCase(str) {

        str.toLowerCase();
        let words = str.split(' ');

        let splitWord = words.map(word => {

            return word.charAt(0).toUpperCase() + word.slice(1);

        });

        let newWord = splitWord.join(' ');

        return newWord;
       

    }

    const submitForm = () => {

        const emptyInputs = checkForm();
        let newTask = {};
        let tempTaskList = { ...taskList };

        if(emptyInputs[0] === 0){

            let newValue = formData.taskName;

            const checkExisting = checkExistingTask(taskList, newValue);

            if(checkExisting){

                alert("This task already exists");
                return;

            }

            newTask["activity"] = "";
            newTask["created"] = new Date();
            newTask["createdBy"] = user.user;
            newTask["group"] = formData.groupSelect === "add" ? formData.groupInput : formData.groupSelect;
            newTask["history"] = [];
            newTask["order"] = "";
            newTask["phase"] = formData.phaseSelect === "add" ? formData.phaseInput : formData.phaseSelect;
            newTask["state"] = "To-do";
            newTask["taskID"] = uuidv4();
            newTask["taskName"] = toProperCase(formData.taskName);
            newTask["toDoDate"] = "";
            newTask["lastUpdated"] = "";
            newTask["lastUpdatedBy"] = "";
        
            tempTaskList.list.push(newTask);
            tempTaskList.length = taskList.list.length;

            saveTaskList(tempTaskList);
            setTaskList(tempTaskList);
            setDisplay(false);
            setDisplayGroupInput(false);
            setDisplayPhaseInput(false);
            
            clearForm();
            clearState();
            localStorage.removeItem("newTask");

        }else{

            let string = "Please resolve issues! \n";

            if(emptyInputs[0] > 0){

                  string += "\nYou have " + emptyInputs[0] + " empty required fields.";

            }

            alert(string);
            
        }

    }

    const checkEmpty = (item) => {

        if(item.value !== ""){

            if(item.tagName === "SELECT"){

                item.style.outline = "none";

            }else{

                item.style.borderColor = "var(--grey)";

            }

            item.style.color  = "var(--black)";

        }

    }

    const clearState = () => {

        setFormData('');

    }

    const clearForm = () => {

        setFormData("");
        localStorage.removeItem('newTask');

    }

    const clearNewTask = () => {

        const checkAction = window.confirm("Are you sure you want to clear the form?");

        if (checkAction === true) {
            
            clearForm();
            clearState();

        } 

    }

    const getCurrentDisplay = () => {

        let style;
        
        if(display){

            style = { display: "" };

        }else{

            style = { display: "none" };
    
        }

        return style;

    }

    const displayAddTask = () =>{

        if(display === true){

            setDisplay(false);

        }else{

            setDisplay(true);

        }

    }

    const getColor = (item) => {

        let color;

        if(item === ""){

            color = { color: "var(--grey)"}

        }else{

            color = { color: "var(--black)"}

        }

        return color;

    }

    const getClassName = () => {

        if(display){

            return "fa fa-circle-minus iconHeader";

        }else{

            return "fa fa-circle-plus iconHeader";

        }

    }

    return(

        <section id="addTaskSection">

            <i onClick={ displayAddTask } id="addTaskIcon" className={ getClassName() }></i>
            <h1 onClick={ displayAddTask } id="addTaskTitle">Add Task</h1>

            <form id='inputForm' style={ getCurrentDisplay() } target="_blank">

                <div className='row two'>

                    <div className='inputGroup col-12'>
                        <i className="fa fa-user icon"></i>
                        <input type='text' className='inputBox'  onChange={ onChange } name='taskName' placeholder='Add task' value={ formData.taskName }></input>
                    </div>
               
                </div>

                <div className="row">
                    <div className="inputGroup col-12">
                        <i className="fa-solid fa-circle-info icon"></i>
                        
                        <select className="guestType" name="groupSelect" value={ formData.groupSelect } onChange={ onChange } style={ getColor(formData.groupSelect) }>
                            <option value="" hidden>Supplier type... (required)</option>
                            { getGroup() }
                            <option value="add" >Add new</option>
                        </select>
                    </div>
                </div>

                 <div className='row two customGroup' style={{ display: displayGroupInput ? '' : 'none' }}>

                    <div className='inputGroup col-12'>
                        <i className="fa fa-user icon"></i>
                        <input type='text' className='inputBox' onChange={ onChange } name='groupInput' placeholder='Add task group' value={ formData.groupInput }></input>
                    </div>
               
                </div>

               

                 <div className="row">
                    <div className="inputGroup col-12">
                        <i className="fa-solid fa-circle-info icon"></i>
                        
                        <select className="guestType" name="phaseSelect" value={ formData.phaseSelect } onChange={ onChange } style={ getColor(formData.phaseSelect) }>
                            <option value="" hidden>Supplier phase... (required)</option>
                            { getPhases()}
                             <option value="add" >Add new</option>
                        </select>
                    </div>
                </div>

                <div className='row two customPhase' style={{ display: displayPhaseInput ? '' : 'none' }}>

                    <div className='inputGroup col-12'>
                        <i className="fa fa-user icon"></i>
                        <input type='text' className='inputBox'  onChange={ onChange } name='phaseInput' placeholder='Add task phase' value={ formData.phase }></input>
                    </div>
               
                </div>

                <div className='row'>

                    <div className='inputGroupColumn col-12'>
                        <button type='button' onClick={ submitForm } id='submitBtn' className='button primary'>Add Task</button>
                        <button type='button' onClick={ clearNewTask } id='clearBtn' className='button secondary'>Clear form</button>
                    </div>

                </div>

            </form>

        </section>

    )

}