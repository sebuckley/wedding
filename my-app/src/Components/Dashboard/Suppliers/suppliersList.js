import { useState } from "react";
import '../Dashboard.css';
import SupplierListItem from "./supplierListItem";

export default function SupplierList(props){
  
    const supplierList = props.supplierList;
    const setSupplierList = props.setSupplierList;
    const wedding = props.wedding;
    const supplierFilter = props.supplierFilter;
    const supplierFilter2 = props.supplierFilter2;
    const suppliersSorted = props.guestSorted;
    const suppliersSortedBy = props.guestSortedBy;
    const stateChange = props.stateChange;
    const setStateChange = props.setStateChange;
    const supplierStatuses = props.supplierStatuses;
    const setTaskList = props.setTaskList;
    const taskList = props.taskList;
    const user = props.user;

    const getList = (array) => {

        array = sortSupplierList(array, suppliersSortedBy, suppliersSorted);

        let htmlContent;

        if(array.length > 0){

            if(supplierFilter === "All" && supplierFilter2 === "All"){

                htmlContent =  array.map((item, index) => {

                    console.log(supplierFilter, supplierFilter2);

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
                        />

                    )

                })

            }else{

                htmlContent =  array.map((item, index) => {

                    console.log(supplierFilter, supplierFilter2);

                    if(supplierFilter === "All" && supplierFilter2 !== "All"){

                        if(item.type === supplierFilter2){
                        
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
                                />

                            )

                        }
        
                    }else if(supplierFilter === item.status && item.type === supplierFilter2){

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

    const sortSupplierList = (array, sortBy="name", type="asc") => {

        if(sortBy === "name"){

            if(type === "asc"){

                array.sort((a, b) => a.name.localeCompare(b.name)); 

            }else{

                array.sort((a, b) => b.name.localeCompare(a.name)); 

            }

        }else if(sortBy === "maxGuests"){

            if(type === "asc"){

                array.sort((a, b) => a.maxGuests - b.maxGuests); 

            }else{

                array.sort((a, b) =>  b.maxGuests - a.maxGuests); 

            }


        }else if(sortBy === "rsvp"){

            if(type === "asc"){

                array.sort((a, b) => a.rsvp.localeCompare(b.rsvp)); 

            }else{

                array.sort((a, b) => b.rsvp.localeCompare(a.rsvp)); 

            }

        }else if(sortBy === "First name"){

            if(type === "asc"){

                array.sort((a, b) => a.firstName.localeCompare(b.firstName)); 

            }else{

                array.sort((a, b) => b.firstName.localeCompare(a.firstName)); 

            }

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