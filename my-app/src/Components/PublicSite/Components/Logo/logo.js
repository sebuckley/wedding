// import './logo.css'; 
import React from 'react';

export default function Logo(props){

    return(

        <div style={props.canvasStyle}>
    
            <div style={props.fNameStyle}> { props.fName } </div>

            <div style={props.andStyle}> & </div>

            <div style={props.sNameStyle}> { props.sName } </div>

        </div>

    )

}



