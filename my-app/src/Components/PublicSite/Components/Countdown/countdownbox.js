import './countdown.css';
import React from 'react';

export default function CountdownBox(props){

    return(

        <div className="countdown">

            <div className="types">

                <div className='label'>{props.label}{props.data > 1 ? "'s": ""}</div>
                <div className='timeInfo'>{props.data}</div>

            </div>

        </div>           

    );

}