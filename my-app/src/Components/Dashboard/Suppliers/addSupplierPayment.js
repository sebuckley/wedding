import '../Dashboard.css';
import { useState, useEffect } from 'react';
import { uuidv4 } from '../../Wigits/dataFunctions';
import { getSupplierIndex, saveSupplierList } from '../../Wigits/dataFunctions-suppliers';
import { splitByCapitalNums, updateSupplierTask } from '../../Wigits/dataFunctions';
import { use } from 'react';

export default function AddSupplierPayment(props) {

    const [display, setDisplay] = useState(false);
    const [stateChange, setStateChange] = useState(0); 

    let paymentDate;
    let payment;
    let paidBy;
    let paymentMethod;
    const currency = props.currency;
    const currencyList = props.currencyList;
    const paymentTypes = ["Cash", "Debit Card", "Credit Card","Bank Transfer", "Cheque", "Other"];
    const user = props.user;
    const supplierList = props.supplierList;
    const setSupplierList = props.setSupplierList;
    const formatNumber = props.formatNumber;
    const taskList = props.taskList;
    const setTaskList = props.setTaskList;
    const supplierID = props.supplierID;
    const payments = props.payments;

    let object = {

        paymentDate: "",
        payment: "",
        paidBy: "",
        paymentMethod: "",

    };

    const [ formData, setFormData ] = useState(object);

    useEffect(() => {

        const savedData = localStorage.getItem("supplierPaymentData");

        if (savedData) {

            setFormData(JSON.parse(savedData));

        }

    }, []);
 

    const onInput = (e) => {

        const item = e.target.name;
        let value = e.target.value;

        if(item === "type"){

            value = value.split("").join("");

        }

        let newObject = formData;

        newObject[item] = value;

        setFormData({...formData, [item]: value});

        localStorage.setItem("supplierPaymentData", JSON.stringify(newObject));


    };

    const clearForm = () => {

        object = {

            paymentDate: "",
            payment: "",
            paidBy: "",
            paymentMethod: "",

        };

        setFormData(object);
        localStorage.removeItem("supplierPaymentData");
        setDisplay(false);

    };

    const resetIcons = () => {

        const reset = (cls) => {

            const icon = document.getElementsByClassName(cls)[0];
            if (icon) {
                icon.style.color = "var(--grey)";
                icon.className = `fa-solid fa-circle-minus icon2 ${cls}`;
            }

        };

        reset("emailCheck");
        reset("phoneCheck");

    };

    const submitForm = () => {

        let errors = [];
        if (!formData.paymentDate) errors.push("Payment date is required.");
        if (!formData.payment) errors.push("Payment amount is required.");
        if (!formData.paymentMethod) errors.push("Payment type is needed.");
        if (!formData.paidBy) errors.push("Please specify who made the payment.");

        if (errors.length > 0) {

            alert("Please fix the following issues:\n\n" + errors.join("\n"));
            return;

        }

        const supplierIndex = getSupplierIndex(supplierID,supplierList);
        let supplierPayments = supplierList.list[supplierIndex].payments;
        console.log("supplierPayments", supplierPayments);
        let existingPayments = supplierPayments?.paymentsMade || [];
        let existingBalance = supplierPayments.balance;
        console.log("existingBalance", existingBalance);
        let existingBalanceValue = supplierPayments?.balance === null ? supplierPayments?.totalCost : supplierPayments?.balance;
        console.log("existingBalanceValue", existingBalance);
        let paymentType;
        let newBalance;

        // Adjust balance
        newBalance = parseFloat(existingBalanceValue) - parseFloat(formData.payment);
        supplierPayments.balance = newBalance.toFixed(2);

        

        if(existingBalance < 0 && existingBalance !== null){
            alert("The payment amount exceeds the outstanding balance. Please check the amount and try again.");
            return;
        }

        if(existingPayments.length === 0){

            paymentType = "Deposit";

        }else if(newBalance === 0){

            paymentType = "Final Payment";

        }else{

            paymentType = "Partial Payment";

        }

        const payment = {

            payment: parseFloat(formData.payment).toFixed(2), 
            currency: currency,
            
            type: paymentType,
            paymentMethod: formData.paymentMethod,
            date: formData.paymentDate,
            paidBy: formData.paidBy,
            previousBalance: parseFloat(supplierPayments?.balance || supplierPayments?.cost || 0).toFixed(2),
            balanceAfterPayment: newBalance.toFixed(2),

            created: new Date().toISOString(),
            createdBy: user.email,
            updated: new Date().toISOString(),
            updatedBy: user.email,
            UUID: uuidv4()

        };

        existingPayments.push(payment);

        supplierPayments.paymentsMade = existingPayments;

        // Create a new supplier list immutably to avoid mutating React state directly
        let newList = { ...supplierList, list: supplierList.list.map((sup, idx) => 
            idx === supplierIndex 
            ? { ...sup, payments: supplierPayments }
            : sup
        )};
        newList.length = newList.list.length;

        // Update state and persist
        setSupplierList(newList);
        saveSupplierList(newList);
        setStateChange(stateChange + 1);

       // Update task list (this may mutate the supplier list object internally)
       let newTaskList = updateSupplierTask(newList, newList.list[supplierIndex].UUID, "Shortlisted", taskList, newList.list[supplierIndex], user);
       setTaskList(newTaskList);

       // Ensure supplier state reflects any mutations made by updateSupplierTask
       setSupplierList({ ...newList });
       saveSupplierList(newList);

       clearForm();
       setDisplay(false);

    };

    const clearPaymentData = () => {

        const supplierIndex = getSupplierIndex(supplierID,supplierList);
        let supplierPayments = supplierList.list[supplierIndex].payments;
        console.log("supplierPayments before clear", supplierPayments);
        supplierPayments.paymentsMade = [];
        supplierPayments.balance = null;

        let newList = { ...supplierList, list: supplierList.list.map((sup, idx) => 
            idx === supplierIndex 
            ? { ...sup, payments: supplierPayments }
            : sup
        )};
        newList.length = newList.list.length;   
        setSupplierList(newList);
        saveSupplierList(newList);
        setStateChange(stateChange + 1);
        alert("All payment data cleared.");

    };

    const getColor = (item) => {

        let color;

        if(item === ""){

            color = { color: "var(--grey)"}

        }else{

            color = { color: "var(--black)"}

        }

        return color;

    }

    const toggleDisplay = () => setDisplay(prev => !prev);


    return (

        <section id="addSupplierPayment">

            <h3 style={{ textAlign: "left", width: "100%" }}><i onClick={toggleDisplay} id="openAddPayment" className={`fa ${display ? "fa-circle-minus" : "fa-circle-plus"} icon3`} aria-hidden="false" title="add new supplier payment"></i> Add Payment</h3>
            

            <div id="supplierPaymentForm" style={{ display: display ? "" : "none" }}>
               {/* Payment date */}    
            <div className='row'>

                <div className='inputGroup col-12'>
                    <label className="block mb-2 font-semibold">
                        Payment date:
                    </label>
                    <i className="fa-solid fa-calendar-check icon"></i>
                    <input type='date' className='dateBox3 dateChange' name="paymentDate" style={ getColor(formData.paymentDate) } onChange={ onInput } value={ formData.paymentDate } ></input>

                </div>

            </div>

            {/* Payment amount */}
            <div className='row'>
                
                <div className='inputGroup col-12'>
                    <label className="block mb-2 font-semibold">
                        Payment amount:
                    </label>

                    <i className="icon">{currencyList[currency].symbol}</i>
                    <input type='text' className='inputBox' name="payment"  placeholder="0.00 (payment)" onChange={ onInput } value={ formData.payment } numeric="true" ></input>

                </div>

            </div>

            {/* Who made the payment? */}   
            <div className='row'>

                <div className='inputGroup col-12'>
                     <label className="block mb-2 font-semibold">
                        Payee:
                    </label>
                    <i className="fa-solid fa-user icon"></i>
                    <select className="guestType" name="paidBy"  style={ getColor(formData.paidBy) }  value={ formData.paidBy } onChange={ onInput }>

                        <option value="" hidden className="noOption">who made the payment...</option>
                        <option value="Bride/Groom">Bride/Groom</option>
                        <option value="Family">Family</option>
                        <option value="Other">Other</option>
        
                    </select>

                </div>

            </div>

             {/* Payment type? */}
            <div className='row'>
    
                <div className='inputGroup col-12'>
                     <label className="block mb-2 font-semibold">
                         Paid by:
                    </label>
                    <i className="fa-solid fa-credit-card icon"></i>
                    <select className="guestType" name="paymentMethod"  style={ getColor(formData.paymentMethod) } value={ formData.paymentMethod } onChange={ onInput }>

                        <option value="" hidden className="noOption">how was the payment made?...</option>
                        { paymentTypes.map((type, i) => (
                            <option key={i} value={type}>{type}</option>
                        ))    }                  
        
                    </select>
                </div>

            </div>

               

                <div className="row">
                    <div className="inputGroup col-12">
                        <button type="button" className="button primary" onClick={submitForm}>Add Payment</button>
                        <button type="button" className="button secondary" onClick={clearForm}>Clear payment</button>
                    </div>
                </div>
            </div>

             {/* <div className="row">
                <div className="inputGroup col-12">
                    
                    <button type="button" className="button secondary" onClick={clearPaymentData}>Clear payments</button>
                </div>
            </div> */}

        </section>

        

    );
}
