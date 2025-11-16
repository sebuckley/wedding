export default function SupplierCostDetails(props){

    const type = props.type;
    const onInput = props.onInput;
    let cost = props.defaultValue;
    let deposit = props.deposit;
    const depositDate = props.depositDate;
    const dueDate = props.dueDate;
    const getColor = props.getColor;
    const currency = props.currency;
    const currencyList = props.currencyList;
    const balancePaidBy = props.balancePaidBy;
    const depositPaidBy = props.depositPaidBy;
    let balance = props.balance;
    const paymentTypes = ["Cash", "Debit Card", "Credit Card","Bank Transfer", "Cheque", "Other"];
    const balancePaymentType = props.balancePaymentType;
    const balancePaidDate = props.balancePaidDate;
    const depositPaymentType = props.depositPaymentType;

    if(cost !== ""){


        cost = currencyList[currency].symbol + parseFloat(cost).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    }

    if(deposit !== ""){

        deposit = currencyList[currency].symbol + parseFloat(deposit).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    }

    if(balance !== ""){

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

    return(

        <>

           <div className='row'>

                <div className='inputGroup col-12'>
                    <label className="block mb-2 font-semibold">
                        Total Cost:
                    </label>
                    <i className="icon">{currencyList[currency].symbol}</i>
                    <input type='text' className='inputBox' name="totalCost"  placeholder="0.00 (total cost)"  onChange={ onInput } defaultValue={ cost } numeric="true" onBlur={ formatNumber }></input>

                </div>

            </div>

            {/* Deposit date */}    
            <div className='row'>

                <div className='inputGroup col-12'>
                    <label className="block mb-2 font-semibold">
                        Deposit date:
                    </label>
                    <i className="fa-solid fa-calendar-check icon"></i>
                    <input type='date' className='dateBox3 dateChange' name="depositDate" style={ getColor(depositDate) } onChange={ onInput } defaultValue={ depositDate } ></input>

                </div>

            </div>


            {/* Deposit */}
            <div className='row'>
                
                <div className='inputGroup col-12'>
                    <label className="block mb-2 font-semibold">
                        Deposit:
                    </label>

                    <i className="icon">{currencyList[currency].symbol}</i>
                    <input type='text' className='inputBox' name="depositValue"  placeholder="0.00 (deposit)" onChange={ onInput } defaultValue={ deposit } numeric="true" onBlur={ formatNumber }></input>

                </div>

            </div>

            {/* Who paid the deposit? */}   
            <div className='row'>

                <div className='inputGroup col-12'>
                     <label className="block mb-2 font-semibold">
                        Deposit payee:
                    </label>
                    <i className="fa-solid fa-user icon"></i>
                    <select className="guestType" name="balancePaidBy"  style={ getColor(balancePaidBy) }  value={ balancePaidBy } onChange={ onInput }>

                        <option value="" hidden className="noOption">who paid the deposit...</option>
                        <option value="Bride/Groom">Bride/Groom</option>
                        <option value="Family">Family</option>
                        <option value="Other">Other</option>
        
                    </select>

                </div>

            </div>

             {/* Deposit Payment type? */}
            <div className='row'>
    
                <div className='inputGroup col-12'>
                     <label className="block mb-2 font-semibold">
                         Paid by:
                    </label>
                    <i className="fa-solid fa-credit-card icon"></i>
                    <select className="guestType" name="depositPaymentType"  style={ getColor(depositPaymentType) } value={ depositPaymentType } onChange={ onInput }>

                        <option value="" hidden className="noOption">how was the deposit paid?...</option>
                        { paymentTypes.map((type, i) => (
                            <option key={i} value={type}>{type}</option>
                        ))    }                  
        
                    </select>
                </div>

            </div>

            {/* Due date */}
            <div className='row'>

                <div className='inputGroup col-12'>
                    <label className="block mb-2 font-semibold">
                        Due date:
                    </label>
                    <i className="fa-solid fa-calendar-day icon"></i>
                    <input type='date' className='dateBox3 dateChange' name="dueDate" style={ getColor(dueDate) } onChange={ onInput } defaultValue={ dueDate } ></input>

                </div>

            </div>

            {/* Balance? */}
            <div className='row'>
                
                <div className='inputGroup col-12'>
                    <label className="block mb-2 font-semibold">
                        Balance:
                    </label>

                    <i className="icon">{currencyList[currency].symbol}</i>
                    <input type='text' className='inputBox' disabled onChange={ onInput } defaultValue={ balance } numeric="true" ></input>

                </div>

            </div>

            {/* Who is paying the balance? */}
            <div className='row'>
    
                <div className='inputGroup col-12'>

                     <label className="block mb-2 font-semibold">
                        Balance payee:
                    </label>
                    <i className="fa-solid fa-user icon"></i>
                    <select className="guestType" name="balancePaidBy"  style={ getColor(balancePaidBy) } placeholder="Who is paying the balance?" value={ balancePaidBy } onChange={ onInput }>

                        <option value="" hidden className="noOption">who is paying the balance...</option>
                        <option value="Bride/Groom">Bride/Groom</option>
                        <option value="Family">Family</option>
                        <option value="Other">Other</option>
        
                    </select>
                </div>

            </div>

              {/* Balance paid */}
            <div className='row'>

                <div className='inputGroup col-12'>
                    <label className="block mb-2 font-semibold">
                        Balance paid date:
                    </label>
                    <i className="fa-solid fa-calendar-check icon"></i>
                    <input type='date'  className='dateBox3 dateChange' name="balancePaidDate" style={ getColor(balancePaidDate) } onChange={ onInput } defaultValue={ balancePaidDate } ></input>

                </div>

            </div>

            {/* Balance Payment type? */}
            <div className='row'>
    
                <div className='inputGroup col-12'>
                     <label className="block mb-2 font-semibold">
                        Balance paid by:
                    </label>
                    <i className="fa-solid fa-credit-card icon"></i>
                    <select className="guestType" name="balancePaymentType"  style={ getColor(balancePaymentType) } placeholder="Who is paying the balance?" value={ balancePaymentType } onChange={ onInput }>

                        <option value="" hidden className="noOption">how was the balance paid?...</option>
                        { paymentTypes.map((type, i) => (
                            <option key={i} value={type}>{type}</option>
                        ))    }                  
        
                    </select>
                </div>

            </div>


        </>

    );


}