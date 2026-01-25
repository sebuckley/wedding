import { useState, useEffect } from 'react';
import { saveTaskList } from '../../Wigits/dataFunctions-taskList';
import '../Dashboard.css';

export default function UpdateTask(props) {

    const { task, taskList, setTaskList, user, getPhases, getGroups } = props;
    
    console.log("Updating task:", task);
    
    const [formData, setFormData] = useState({

        taskName: '',
        state: '',
        activity: '',
        phase: '',
        group: '',
        toDoDate: '',
        description: ''

    });

    useEffect(() => {

        if (task) {

            setFormData({
                taskName: task.taskName || '',
                state: task.state || '',
                activity: task.activity || '',
                phase: task.phase || '',
                group: task.group || '',
                order: task.order || '',
                toDoDate: task.toDoDate ? task.toDoDate.split('T')[0] : '',
                description: task.description || '',
                createdBy: task.createdBy || ''
            });

        }

    }, [task]);

    const formatDate = (date) => {

        if (!date) return 'N/A';
        const d = new Date(date);
        return d.toLocaleDateString() + ' ' + d.toLocaleTimeString();

    };

    const handleChange = (e) => {

        const { name, value } = e.target;
        const tempTask = { ...formData, [name]: value };
        setFormData(tempTask);

        tempTask.lastUpdatedBy = user.email;
        tempTask.lastUpdated = new Date();

        const updatedTaskList = { ...taskList };
        const taskIndex = updatedTaskList.list.findIndex(t => t.taskID === task.taskID);
        if (taskIndex !== -1) {
            if (name === 'order') {
                updatedTaskList.list = reorderTasks(updatedTaskList.list, taskIndex, parseInt(value));
            } else {
                updatedTaskList.list[taskIndex] = { ...updatedTaskList.list[taskIndex], ...tempTask };
            }
            setTaskList(updatedTaskList);
            saveTaskList(updatedTaskList);
        }

    };

    const reorderTasks = (taskList, currentIndex, newOrder) => {
        const currentOrder = taskList[currentIndex].order;
        const updatedList = [...taskList];
        
        if (newOrder === currentOrder) return updatedList;
        
        if (newOrder > currentOrder) {
            // Moving task down (increasing order)
            for (let i = 0; i < updatedList.length; i++) {
                if (updatedList[i].order > currentOrder && updatedList[i].order <= newOrder && i !== currentIndex) {
                    updatedList[i].order -= 1;
                }
            }
        } else {
            // Moving task up (decreasing order)
            for (let i = 0; i < updatedList.length; i++) {
                if (updatedList[i].order < currentOrder && updatedList[i].order >= newOrder && i !== currentIndex) {
                    updatedList[i].order += 1;
                }
            }
        }
        
        updatedList[currentIndex].order = newOrder;
        return updatedList;
    };

    const getColor = (value) => {

        let color;

        if(value === "" || value === "Not confirmed" || typeof value === "undefined"){

            color = { color: "var(--grey)"}

        }else{

            color = { color: "var(--black)"}

        }

        return color;

    }

  
    if (!task) {

        return <div>Loading task...</div>;

    }

    return (

        <div className="taskContainer">

            <div>
                <h2>Update Task: { task.taskName }</h2>

                 

                    <div className='row'>
                        <div className='inputGroupColumn col-12'>
                            <label className="block mb-2 font-semibold">Task Name</label>
                            <div className="col-12">
                                <i className="fa fa-tasks icon"></i>
                                <input 
                                    type="text" 
                                    className='inputBox' 
                                    name="taskName" 
                                    value={ formData.taskName } 
                                    onChange={handleChange}
                                    placeholder='Task name'
                                    disabled={formData.createdBy === "system" ? true : false }
                                />
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='inputGroupColumn col-12'>
                            <label className="block mb-2 font-semibold">Phase</label>
                            <div className="col-12">
                                <i className="fa fa-layer-group icon"></i>
                                <select name="phase" className='guestType' style={ getColor(formData.phase) }  value={ formData.phase } onChange={handleChange}>
                                    <option value="">Select Phase</option>
                                    {getPhases(true)}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='inputGroupColumn col-12'>
                            <label className="block mb-2 font-semibold">Group</label>
                            <div className="col-12">
                                <i className="fa fa-object-group icon"></i>
                                <select name="group" className='guestType' style={ getColor(formData.group) }  value={ formData.group} onChange={handleChange}>
                                    <option value="">Select Group</option>
                                    {getGroups(true)}
                                </select>
                            </div>
                        </div>
                    </div>

                    
                    <div className='row'>
                        <div className='inputGroupColumn col-12'>
                            <label className="block mb-2 font-semibold">Order</label>
                            <div className="col-12">
                                <i className="fa fa-sort icon"></i>
                                <select name="order" className='guestType' style={ getColor(formData.order) }  value={ formData.order || '' } onChange={handleChange}>
                                    <option value="">Select Order</option>
                                    {Array.from({ length: taskList.list.length }, (_, i) => (
                                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='inputGroupColumn col-12'>
                            <label className="block mb-2 font-semibold">Description</label>
                            <div className="col-12">
                                <i className="fa fa-file-text icon"></i>
                                <textarea 
                                    className='inputBox' 
                                    name="description" 
                                    value={ formData.description } 
                                    onChange={ handleChange }
                                    placeholder='Description'
                                    rows="4"
                                />
                            </div>
                        </div>
                    </div>

                    
                    <div className='row'>
                        <div className='inputGroupColumn col-12'>
                            <label className="block mb-2 font-semibold">Created</label>
                            <div className="col-12">
                                <p className="inputBox" style={{ backgroundColor: '#f5f5f5', padding: '8px', borderRadius: '4px' }}>
                                    { formatDate(task.created) }
                                </p>
                            </div>
                        </div>
                        <div className='inputGroupColumn col-12'>
                            <label className="block mb-2 font-semibold">Created By</label>
                            <div className="col-12">
                                <p className="inputBox" style={{ backgroundColor: '#f5f5f5', padding: '8px', borderRadius: '4px' }}>
                                    { task.createdBy || 'N/A' }
                                </p>
                            </div>
                        </div>
                    </div>

                       <div className='row'>
                        <div className='inputGroupColumn col-12'>
                            <label className="block mb-2 font-semibold">Updated</label>
                            <div className="col-12">
                                <p className="inputBox" style={{ backgroundColor: '#f5f5f5', padding: '8px', borderRadius: '4px' }}>
                                    { formatDate(task.lastUpdated) }
                                </p>
                            </div>
                        </div>
                        <div className='inputGroupColumn col-12'>
                            <label className="block mb-2 font-semibold">Updated By</label>
                            <div className="col-12">
                                <p className="inputBox" style={{ backgroundColor: '#f5f5f5', padding: '8px', borderRadius: '4px' }}>
                                    { task.lastUpdatedBy || 'N/A' }
                                </p>
                            </div>
                        </div>
                    </div>


            </div>
        </div>
    );
}
