import AddSupplierPayment from "./addSupplierPayment";

export default function SupplierCostDetails(props){

    const type = props.type;
    const onInput = props.onInput;
    let cost = props.defaultValue;
    let deposit = props.deposit;
    const dueDate = props.dueDate;
    const getColor = props.getColor;
    const currency = props.currency;
    const currencyList = props.currencyList;
    let balance = props.balance;
    const user = props.user;
    const supplierList = props.supplierList;
    const setSupplierList = props.setSupplierList;
    const taskList = props.taskList;
    const setTaskList = props.setTaskList;
    const supplierID = props.supplierID;


    if(cost !== ""){


        cost = currencyList[currency].symbol + parseFloat(cost).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    }

    if(deposit !== ""){

        deposit = currencyList[currency].symbol + parseFloat(deposit).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    }

    if(balance !== null){

        balance = currencyList[currency].symbol + parseFloat(balance).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    }

    const formatNumber = (e) => {

        let value = e.target.value.replace(/[£$€¥,.]/g, "");

        if(value !== ""){

            value = currencyList[currency].symbol +  parseFloat(value).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

        }else{

            value = "";
        }

        e.target.value = value;

    }

    const displayBalance = () => {

        return(

            <div className='row'>
                
                <div className='inputGroupColumn col-12'>
                    <label className="block mb-2 font-semibold">
                        Balance:
                    </label>
                    <div className="col-12">
                        <i className="icon">{currencyList[currency].symbol}</i>
                        <input type='text' className='inputBox' disabled onChange={ onInput } value={ balance } numeric="true" ></input>
                    </div>
                </div>

            </div>

        )
    }


    return(

        <>

           <div className='row'>

                <div className='inputGroupColumn col-12'>
                    <label className="block mb-2 font-semibold">
                        Total Cost:
                    </label>
                    <div className="col-12">
                    <i className="icon">{currencyList[currency].symbol}</i>
                    <input type='text' className='inputBox' name="totalCost"  placeholder="0.00 (total cost)"  onChange={ onInput } defaultValue={ cost } numeric="true" onBlur={ formatNumber }></input>
                    </div>
                </div>

            </div>

           
            {/* Due date */}
            <div className='row'>

                <div className='inputGroupColumn col-12'>
                    <label className="block mb-2 font-semibold">
                        Due date:
                    </label>
                    <div className="col-12">
                    <i className="fa-solid fa-calendar-day icon"></i>
                    <input type='date' className='dateBox3 dateChange' name="dueDate" style={ getColor(dueDate) } onChange={ onInput } value={ dueDate } ></input>
                    </div>
                </div>

            </div>

            {/* Balance? */}
            {  balance !== null ? displayBalance() : null }


            {/* Add payment */}
  
            { balance === null || balance !== "£0.00" ? 
            
            <AddSupplierPayment 
                currency={ currency } 
                currencyList={ currencyList } 
                formatNumber={ formatNumber } 
                user={ user } 
                supplierList={ supplierList } 
                setSupplierList={ setSupplierList } 
                taskList={ taskList } 
                setTaskList={ setTaskList } 
                supplierID={ supplierID }
                paymnents={ props.payments }
              
                
            /> 
            
            : null }


        </>

    );


}