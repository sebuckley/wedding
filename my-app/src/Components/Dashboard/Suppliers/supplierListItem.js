
import { useState, useEffect } from "react";
import { Link  } from 'react-router-dom';
import '../Dashboard.css';
import { splitByCapitalNums, updateSupplierTask, deleteSupplierTaskItem } from '../../Wigits/dataFunctions';
import { getSupplierIndex, saveSupplierList, deleteSupplierListItem } from '../../Wigits/dataFunctions-suppliers';
import { getTaskIndex } from '../../Wigits/dataFunctions-taskList';

export default function SupplierListItem(props){

    const item = props.item;
    const index = props.index;
    const setSupplierList = props.setSupplierList;
    const supplierList = props.supplierList;
    const supplierBooked = props.supplierBooked;
    const [status, setStatus] = useState(item.status);

    // Keep local status synced to prop changes so UI reflects updates immediately
    useEffect(() => {
        setStatus(item.status);
    }, [item.status]);

    const stateChange = props.stateChange;
    const setStateChange = props.setStateChange; 
    const supplierStatuses = props.supplierStatuses;
    const setTaskList = props.setTaskList;
    const taskList = props.taskList;
    const user = props.user;

    const getSupplierLink = (a, name) => {

        const link = "/managemywedding/supplier/?supplierID=" + a;

        return <Link to={link}>{name}</Link>

    }

    const getEmail = (a) => {

        const link = "mailto:" + a;

        return <a href={link}><i className="fa-solid fa-envelope icon3"></i></a>

    }

    const getPhone = (a, UUID) => {

        let href;
        let link;

        if(a === ""){

            link = "managemywedding/supplier/?supplierID=" + UUID;
            href = <a href={link}><i className="fa-solid fa-circle-plus icon3"></i></a>;

        }else{

            link = "tel:" + a;
            href = <a href={link}><i className="fa-solid fa-phone icon3"></i></a>;

        }

        return href;

    }

    const getWebsite = (a, UUID) => {

        let href;
        let link;

        if(a === ""){

            link = "managemywedding/supplier/?supplierID=" + UUID;
            href = <a href={link}><i className="fa-solid fa-circle-plus icon3"></i></a>;

        }else{

            link = a;
            href = <a href={link} target="_blank"><i className="fa-solid fa-globe icon3"></i></a>;

        }

        return href;

    }

     const getType = (taskID, supplierID) => {

        let name;
        let link;

        if(typeof taskID === "undefined" || taskID === ""){

            link = "/#/managemywedding/supplier/?supplierID=" + supplierID;
            name = <a href={link}>add type</a>;

        }else{

            const index = getTaskIndex(taskList, taskID);
            const taskName = taskList.list[index].taskName

            name = taskName;

        }

        return name;

    }

    const onChange = (e) => {

        const value = e.target.value;
        const name = e.target.className;
        setStatus(value);
        let supplierID = e.target.parentElement.nextSibling.innerText
        let index = getSupplierIndex(supplierID,supplierList);

        supplierList.list[index]["status"] = value;
        supplierList.list[index]["payments"] = [];
        supplierList.list[index]["updated"] = new Date();
        supplierList.list[index]["updatedBy"] = user.eamil;

        saveSupplierList(supplierList);
        setSupplierList(supplierList);

        let newTaskList = updateSupplierTask(supplierList, supplierID, value, taskList, supplierList.list[index], user);
        setTaskList(newTaskList);

        if(value === "Booked"){

            supplierBooked(supplierList, supplierList.list[index].taskTypeID, supplierID);

        }

        if(value === "Booked" || value === "Enquiry made" || value === "Quote recieved"){

            const reDirectString = "/#/managemywedding/supplier/?supplierID=" + supplierID.trim();
            window.location.replace(reDirectString);

        }


    }

    const deleteListItem = (e) => {

        let UUID = e.target.parentElement.previousSibling.innerText;

        let index = getSupplierIndex(UUID);

        let newList = deleteSupplierListItem(supplierList, index, UUID);
        let newTaskList = deleteSupplierTaskItem(taskList, UUID);

        setTaskList(newTaskList);
        setSupplierList(newList);
        setStateChange((stateChange + 1));

    }

    return (

        <div>

            <div className={ "supplierRow " + index} key={ index }>

                <div className="col-2">{ getSupplierLink(item.UUID, item.name) }</div>
                <div className="col-2" title="supplier type">{ getType(item.taskTypeID, item.UUID) }</div>
                <div className="col-1" title="email">{ getEmail(item.email) }</div>
                <div className="col-1" title="call">{ getPhone(item.phone, item.UUID) }</div>
                <div className="col-1" title="website">{ getWebsite(item.website, item.UUID) }</div>
                <div className="col-2" title={ item.status }>
            
                    <select className={ item.type } name="status" value={ status } onChange={ onChange } >
                        <option value="">None</option>
                        {supplierStatuses.map((s, i) => (
                            <option key={i} value={s}>{s}</option>
                        ))}
                     </select>
                </div>
                <div className="col-2" style={{"display":"none"}}> { item.UUID }</div>
                <div className="col-2" > <button className="deleteButton" onClick={ deleteListItem }>Delete</button></div>


            </div>

        </div>

    )

}