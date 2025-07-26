export default function SupplierCostDetails(props){

    const type = props.type;
    const onInput = props.onInput;
    const value = props.value;

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
                    <i className="fa-solid fa-sterling-sign icon"></i>
                    <input type='number' className='inputBox' name={ getType("name") } min="0"  placeholder={ getType("placeholder")} step="0.01" onInput={ onInput } defaultValue={ value }></input>

                </div>

            </div>

    );


}