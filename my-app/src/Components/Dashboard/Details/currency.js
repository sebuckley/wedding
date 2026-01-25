import React from "react";
import Flag from "./flag"
import currencyList from "./currencyList";

export default function CurrencySelector(props) {
  
  const handleChange = props.handleChange;
  const getColor = props.getColor;
  const selectedCurrency = props.value || "";

  return (

    <div className="row">
      <div className="inputGroupColumn col-12">
      <label htmlFor="currency" className="block mb-2 font-medium">
        Select Currency:
      </label>

      <div class='col-12'>

      { selectedCurrency !== "" ? <Flag countryCode={currencyList[selectedCurrency].icon} alt={ currencyList[selectedCurrency].name + " flag" }/> : <i className="fa-solid fa-money-bill icon"></i> } 

      <select
        id="currency"
        value={selectedCurrency}
        onChange={ handleChange }
        className="guestType weddingDetails"
        name="currency"
        style={ getColor(selectedCurrency)}
      >
         <option value="" hidden className="noOption">please select currency... (required)</option>

        {
        
          Object.entries(currencyList).map(([key, value]) => {
            
            if(value.active){

              return <option key={key} value={key}> {key} - {value.name}</option>

            } 

            return null;

          })

        }

      </select>

      </div>
      </div>

      
    </div>
  );
}
