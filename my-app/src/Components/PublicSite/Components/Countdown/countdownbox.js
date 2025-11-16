import './countdown.css';
import React from 'react';

export default function CountdownBox(props){

    let formatted;

    const getNumber = (number, label) => {

        if(label === "Second" || label === "Minute"){

            formatted = number;

        }else{

            formatted = number < 10 ? '0' + number : String(number);

        }

        return formatted;

    }

    return(

        <div className="countdown">

            <div className="types">

                <div className='label' style={{ "backgroundColor": "var(--primary)", "color":"var(--primary-text)", "border": "1px solid var(--primary)", "padding":"20px", "margin": "0px" }}>{props.label}{props.data > 1 ? "'s": ""}</div>
                <div className='timeInfo' style={{ "backgroundColor": "var(--secondary)", "color":"var(--secondary-text-color)", "border": "1px solid var(--primary)", "padding":"20px", "borderRadius": "0px 0px 20px 20px" }}>{getNumber(props.data, props.label)}</div>

            </div>

        </div>           

    );

}