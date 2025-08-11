export default function SupplierCostDetails(props){

    const type = props.type;
    const onInput = props.onInput;
    const value = parseFloat(props.value).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    const currency = props.currency;
    const currencyList = props.currencyList;

    const formatNumber = (e) => {

        if(e.target.value !== ""){

            e.target.value = currencyList[currency].symbol +  parseFloat(e.target.value).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

        }else{

            e.target.value = currencyList[currency].symbol + " 0.00";
        }

    }

    const getType = (info) => {

        let name;

        if(type === "booked" && info === "name"){

            name = "cost";

        }else if(type === "quote" && info === "name"){

            name = "quote";

        }else if(type === "booked" && info === "placeholder"){

            name = "0.00 (cost)";

        }else if(type === "quote" && info === "placeholder"){

            name = "0.00 (quote)";

        }

        return name;

    }

    return(

           <div className='row'>

                <div className='inputGroup col-12'>
                    <i className="icon">{currencyList[currency].symbol}</i>
                    <input type='text' className='inputBox' name={ getType("name") }  placeholder={ getType("placeholder")}  onChange={ onInput } defaultValue={ value } numeric="true" onBlur={ formatNumber }></input>

                </div>

            </div>

    );


}