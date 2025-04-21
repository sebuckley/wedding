import React from 'react';

export default function Select(props){

    const array = props.arrayList;

    const displayBlankOption = () => {

        return <option></option>;

    }

    const displayNoneOption = () => {

        return <option>None</option>;

    }

    return(


        <select name={ props.name }>

            { props.blank ? displayBlankOption(): "" }
            { props.none ? displayNoneOption(): "" }
            { array.map( (e) => <option value={e} key={e}>{e}</option> ) }

        </select>


    )

}