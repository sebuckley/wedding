
import { useState } from "react";
import '../Dashboard.css';
import { splitByCapitalNums } from '../../Wigits/dataFunctions';
import { getSupplierIndex, saveSupplierList, deleteSupplierListItem } from '../../Wigits/dataFunctions-suppliers';

export default function SupplierListItem(props){

    const item = props.item;
    const index = props.index;
    const setSupplierList = props.setSupplierList;
    const supplierList = props.supplierList;
    const [status, setStatus] = useState(item.status);
    const stateChange = props.stateChange;
    const setStateChange = props.setStateChange; 
    const supplierStatuses = props.supplierStatuses;


    const getSupplierLink = (a, name) => {

        const link = "./supplier/?supplierID=" + a;

        return <a href={link}>{name}</a>

    }

    const getEmail = (a) => {

        const link = "mailto:" + a;

        return <a href={link}><i className="fa-solid fa-envelope icon3"></i></a>

    }

    const getPhone = (a, UUID) => {

        let href;
        let link;

        if(a === ""){

            link = "./supplier/?supplierID=" + UUID;
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

            link = "./supplier/?supplierID=" + UUID;
            href = <a href={link}><i className="fa-solid fa-circle-plus icon3"></i></a>;

        }else{

            link = a;
            href = <a href={link} target="_blank"><i className="fa-solid fa-globe icon3"></i></a>;

        }

        return href;

    }

     const getType = (a, UUID) => {

        let type;
        let link;

        if(typeof a === "undefined" || a === ""){

            link = "./supplier/?supplierID=" + UUID;
            type = <a href={link}>add type</a>;

        }else{

            type = splitByCapitalNums(a);

        }

        return type;

    }

    const onChange = (e) => {

        const value = e.target.value;
        setStatus(value);
        let UUID = e.target.parentElement.nextSibling.innerText
        let index = getSupplierIndex(UUID);

       

        supplierList.list[index]["status"] = value;
        saveSupplierList(supplierList);
        setSupplierList(supplierList);


    }

    const deleteListItem = (e) => {

        let UUID = e.target.parentElement.previousSibling.innerText;
        let index = getSupplierIndex(supplierList, UUID);
        let newList = deleteSupplierListItem(supplierList, index);
        setSupplierList(newList);
        setStateChange((stateChange + 1));

    }

    return (

        <div>

            <div className={ "supplierRow " + index} key={ index }>

                <div className="col-2">{ getSupplierLink(item.UUID, item.name) }</div>
                <div className="col-2" title="supplier type">{ getType(item.type, item.UUID) }</div>
                <div className="col-1" title="email">{ getEmail(item.email) }</div>
                <div className="col-1" title="call">{ getPhone(item.phone, item.UUID) }</div>
                <div className="col-1" title="website">{ getWebsite(item.website, item.UUID) }</div>
                <div className="col-2" title={ item.status }>
                    <select className="" name="status" value={status} onChange={ onChange }>
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