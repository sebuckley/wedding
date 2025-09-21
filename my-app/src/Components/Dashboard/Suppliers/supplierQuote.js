export default function SupplierQuoteDetails(props){

    const type = props.type;
    const onInput = props.onInput;
    let value = props.value;

    if( value !== ""){

        value = parseFloat(props.value).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    }

    const currency = props.currency;
    const currencyList = props.currencyList;

    const formatNumber = (e) => {

        if(e.target.value !== ""){

            e.target.value = currencyList[currency].symbol +  parseFloat(e.target.value).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

        }else{

            e.target.value = currencyList[currency].symbol + " 0.00";

        }

    }

    return(

        <div className='row'>

            <div className='inputGroup col-12'>
                <i className="icon">{currencyList[currency].symbol}</i>
                <input type='text' className='inputBox' name="quote"  placeholder="0.00 (quote)"  onChange={ onInput } defaultValue={ value } numeric="true" onBlur={ formatNumber }></input>

            </div>

        </div>

    );


}