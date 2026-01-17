import '../Dashboard.css';
import { useState } from 'react';
import { getTaskList, saveTaskList, checkExistingTask } from '../../Wigits/dataFunctions-taskList';
import { uuidv4 } from '../../Wigits/dataFunctions';

export default function AddTask(props){

    const [display, setDisplay] = useState(false);
    const [newTask, setNewTask] = useState('');
    const setTaskList = props.setTaskList;

    if(newTask === ''){

        if(localStorage.getItem('newTask') !== null){

            setNewTask(localStorage.getItem('newTask'));
            setDisplay(true);

        }

    }

    const onInput = (e) =>{

        const value = e.target.value.trim();

        localStorage.setItem("newTask", value);
        checkEmpty(e.target);

    }

    const checkForm = () => {

        let allowedEmpty = [];

        const getForm = document.getElementById("inputForm");
        let empty = 0;

        for(let i = 0; i < getForm.length; i ++){

            let itemValue = getForm[i].value;
            let tagName = getForm[i].tagName;
            let itemName = getForm[i].name;

            if(tagName !== "BUTTON" && allowedEmpty.includes(itemName) === false && itemValue === ""){

                empty += 1;

                if(tagName === "SELECT"){

                    getForm[i].style.outline = "1px solid var(--red)";
    
                }else{
    
                    getForm[i].style.borderColor = "var(--red)";
    
                }
                                    
            }else{

                if(itemValue !== ""){

                    let index = allowedEmpty.indexOf(itemName);
                    if (index !== -1) {

                        allowedEmpty.splice(index, 1);

                    }

                }

            }

        }

        return [empty, allowedEmpty];

    }

    function toProperCase(str) {

        str.toLowerCase();
        let words = str.split(' ');

        let splitWord = words.map(word => {

            return word.charAt(0).toUpperCase() + word.slice(1);

        });

        let newWord = splitWord.join('');

        return newWord;
       

    }

    const submitForm = () => {

        const emptyInputs = checkForm();
        let newTask = {};

        if(emptyInputs[0] === 0){

            const formData = document.getElementById("inputForm");
            let taskList = getTaskList();

            for(let i = 0; i < formData.length; i++){

                if(formData[i].tagName !== "BUTTON"){

                    let newValue = toProperCase(formData[i].value);

                    const checkExisting = checkExistingTask(taskList, newValue);

                    if(checkExisting){

                        alert("This task already exists");
                        return;

                    }

                    newTask[formData[i].getAttribute("name")] = toProperCase(formData[i].value);

                }

            }

            const user = JSON.parse(localStorage.getItem("token"));

            newTask["created"] = new Date();
            newTask["history"] = []
            newTask["createdBy"] = user.user;
            newTask["taskID"] = uuidv4();
            newTask["state"] = "";
            newTask["activity"] = "";
            newTask["toDoDate"] = "";
            newTask["lastUpdated"] = "";
            newTask["lastUpdatedBy"] = "";
        
            taskList.list.push(newTask);
            taskList.length = taskList.list.length;

            saveTaskList(taskList);
            setTaskList(taskList);
            
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

        setNewTask('');

    }

    const clearForm = () => {

        const getForm = document.getElementById("inputForm");

        for( let i = 0; i < getForm.length; i++){

            getForm[i].value = "";

        }

        localStorage.removeItem('newTask');
        setNewTask('');

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

    return(

        <section id="addTaskSection">

            <i onClick={ displayAddTask } id="addTaskIcon" className="fa fa-circle-plus iconHeader"></i>
            <h1 onClick={ displayAddTask } id="addTaskTitle">Add Task</h1>

            <form id='inputForm' style={ getCurrentDisplay() } target="_blank">

                <div className='row two'>

                    <div className='inputGroup col-12'>
                        <i className="fa fa-user icon"></i>
                        <input type='text' className='inputBox' onInput={ onInput } onChange={ e => setNewTask( e.target.value )} name='taskName' placeholder='Add task' value={ newTask }></input>
                    </div>
               
                </div>

                <div className='row'>

                    <div className='inputGroup col-12'>
                        <button type='button' onClick={ submitForm } id='submitBtn' className='button primary'>Add Task</button>
                        <button type='button' onClick={ clearNewTask } id='clearBtn' className='button secondary'>Clear form</button>
                    </div>

                </div>

            </form>

        </section>

    )

}