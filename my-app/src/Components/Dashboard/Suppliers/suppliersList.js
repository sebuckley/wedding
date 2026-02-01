import { useState } from "react";
import '../Dashboard.css';
import SupplierListItem from "./supplierListItem";

export default function SupplierList(props){
  
    const supplierList = props.supplierList;
    const setSupplierList = props.setSupplierList;
    const wedding = props.wedding;
    const supplierFilter = props.supplierFilter;
    const supplierFilter2 = props.supplierFilterTask;
    const suppliersSorted = props.supplierSorted;
    const suppliersSortedBy = props.supplierSortedBy;
    const stateChange = props.stateChange;
    const setStateChange = props.setStateChange;
    const supplierStatuses = props.supplierStatuses;
    const setTaskList = props.setTaskList;
    const taskList = props.taskList;
    const user = props.user;
    const supplierBooked = props.supplierBooked;
    const [state, setState] = useState(0);


    const getList = (array) => {

        array = sortSupplierList(array, suppliersSortedBy, suppliersSorted);

        let htmlContent;

        if(array.length > 0){

            if(supplierFilter === "All" && supplierFilter2 === "All"){

                htmlContent =  array.map((item, index) => {

                    return (

                        <SupplierListItem 
                            item={ item } 
                            index={ index } 
                            setSupplierList={ setSupplierList } 
                            supplierList={ supplierList } 
                            key={index} 
                            stateChange={ stateChange } 
                            setStateChange={ setStateChange } 
                            supplierStatuses={ supplierStatuses } 
                            user={ user } 
                            taskList={ taskList } 
                            setTaskList= { setTaskList }
                            supplierBooked={ supplierBooked }
                        />

                    )

                })

            }else{

                htmlContent =  array.map((item, index) => {

                    if(supplierFilter === "All" && supplierFilter2 !== "All"){

                        if(item.taskTypeID === supplierFilter2){
                        
                            return (

                                  <SupplierListItem 
                                    item={ item } 
                                    index={ index } 
                                    setSupplierList={ setSupplierList } 
                                    supplierList={ supplierList } 
                                    key={index} 
                                    stateChange={ stateChange } 
                                    setStateChange={ setStateChange } 
                                    supplierStatuses={ supplierStatuses } 
                                    user={ user } 
                                    taskList={ taskList } 
                                    setTaskList= { setTaskList }
                                    supplierBooked={ supplierBooked }
                                />

                            )

                        }


                    }else if(supplierFilter2 === "All" && supplierFilter !== "All"){

                         if(item.status === supplierFilter){
                        
                            return (

                                  <SupplierListItem 
                                    item={ item } 
                                    index={ index } 
                                    setSupplierList={ setSupplierList } 
                                    supplierList={ supplierList } 
                                    key={index} 
                                    stateChange={ stateChange } 
                                    setStateChange={ setStateChange } 
                                    supplierStatuses={ supplierStatuses } 
                                    user={ user } 
                                    taskList={ taskList } 
                                    setTaskList= { setTaskList }
                                    supplierBooked={ supplierBooked }
                                />

                            )

                        }
        
                    }else if(supplierFilter === item.status && item.taskTypeID === supplierFilter2){

                        return (

                             <SupplierListItem 
                                item={ item } 
                                index={ index } 
                                setSupplierList={ setSupplierList } 
                                supplierList={ supplierList } 
                                key={index} 
                                stateChange={ stateChange } 
                                setStateChange={ setStateChange } 
                                supplierStatuses={ supplierStatuses } 
                                user={ user } 
                                taskList={ taskList } 
                                setTaskList= { setTaskList }
                                supplierBooked={ supplierBooked }
                            />

                        )

                    }

                })


                
            }

            return htmlContent;

        }else{

            return <div><div>No suppliers in the list</div></div>

        }
        
    }

    const sortSupplierList = (array, sortBy="name", type) => {

        if(type === "asc"){

            array.sort((a, b) => a.name.localeCompare(b.name)); 

        }else{

            array.sort((a, b) => b.name.localeCompare(a.name)); 

        }

        return array;

    }

    return(

        <section id="supplierListSection">

            <h2>Suppliers List</h2>

            { supplierList === "" ? <p>No Suppliers in the list</p> : "" }

            <div id="supplierList">

                { supplierList !== "" ? getList(supplierList.list) : "" }
            
            </div>
   
        </section>

    )
    
}