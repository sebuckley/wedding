import React from 'react';

export default function Select(props){

    const array = props.arrayList;
    const onChange = props.onChange;
    const className = props.className;
    const value = props.value || "";
    const name = props.name;

    const getText = (name) => {

        let text;

        if(name === "diet"){

            text = "Please confirm dietry requirements";

        }else if(name === "allergies"){
    
            text = "Please confirm any allergies";

        }else{

            text = "Please confirm ....";

        }

        return text;

    }

    const getColor = () => {

        let color;

        if(value === ""){

            color = { "color": "var(--grey)"};

        }else{

            color = { "color": "black"};
        }

        return color;

    } 


    return(


        <select className={ className } name={ name } value={ value } onChange={ onChange } style={ getColor(value) }>

            <option value="" hidden className="noOption">{ getText( name )  }</option>
            { array.map( (e) => <option value={e} key={e}>{e}</option> ) }

        </select>


    )

}