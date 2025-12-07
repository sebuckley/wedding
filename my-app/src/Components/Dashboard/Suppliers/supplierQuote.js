export default function SupplierQuoteDetails(props){

    const onInput = props.onInput;
    let quote = props.quote;
    const quoteDate = props.quoteDate || "";
    const getColor = props.getColor;
    const quoteBy = props.quoteBy || "";
    const currency = props.currency;
    const currencyList = props.currencyList;

    if( quote !== ""){

        quote = currencyList[currency].symbol + parseFloat(quote).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    }

    const formatNumber = (e) => {

        let value = e.target.value.replace(/[£$€¥,.]/g, "");

        if(value !== ""){

            value = currencyList[currency].symbol +  parseFloat(value).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

        }else{

            value = currencyList[currency].symbol + " 0.00";

        }

        e.target.value = value;

    }

    return(

        <>
            {/* Quote */}
            <div className='row'>

                <div className='inputGroup col-12'>
                    <label className="block mb-2 font-semibold">
                        Quote:
                    </label>
                    <i className="icon">{currencyList[currency].symbol}</i>
                    <input type='text' className='inputBox' name="quoteValue"  placeholder="0.00 (quote)"  onChange={ onInput } defaultValue={ quote } numeric="true" onBlur={ formatNumber }></input>

                </div>

            </div>

            {/* Deposit date */}    
            <div className='row'>

                <div className='inputGroup col-12'>
                    <label className="block mb-2 font-semibold">
                        Quote date:
                    </label>
                    <i className="fa-solid fa-calendar-check icon"></i>
                    <input type='date' className='dateBox3 dateChange' name="quoteDate" style={ getColor(quoteDate) } onChange={ onInput } defaultValue={ quoteDate } ></input>

                </div>

            </div>

             {/* Quote by */}
            <div className='row'>

                <div className='inputGroup col-12'>
                    <label className="block mb-2 font-semibold">
                        Quoted by:
                    </label>
                    <i className="fa-solid fa-person icon"></i>
                    <input type='text' className='inputBox' name="quoteBy"  placeholder="name of official"  onChange={ onInput } defaultValue={ quoteBy } ></input>

                </div>

            </div>
        </>
    );


}