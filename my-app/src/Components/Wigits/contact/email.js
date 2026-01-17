import { useEffect, useState } from 'react';

// This fucntion returns either an input or a link in an icon for email addresses
export function checkValidEmail(email) {

    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const regexResult = regex.test(email);

    return regexResult;

}

export default function Email(props){

    const [ update, setUpdate ] = useState(0);
    const [ email, setEmail ] = useState(props.value);
    const [ validEmail, setValidEmail ] = useState(false);
    const [ emailLength, setEmailLength ] = useState(0);
    const type = props.type || "input";
    const classNameText = props.class || "inputBox checkIcon";
    const updateFunction = props.updateFunction || function(){};
    
    const onChange = function(e){ 
        
        setEmail( e.target.value ); 
        setUpdate( update + 1 );
        updateFunction(e);
        checkEmail( e.target.value );
    
    };

    const checkEmail = (email) => {

        const isValidEmail = checkValidEmail(email);
        setEmailLength(email.length);
        setValidEmail(isValidEmail);

        return isValidEmail;
        
    }

    const getEmailLink = (email, type="input") => {

        let itemName;
        let item;

        if(type === "input"){

            itemName = "fa-solid fa-envelope icon";

        }else{

            itemName = "fa-solid fa-envelope icon3";

        }

        if(item !== "" && validEmail){

            let href = "mailto:" + email;
        
            item = <a href={href}> <i className={ itemName }></i></a>;

        }else if(type==="input"){

            item = <i className={ itemName }></i>;

        }else{

            item= null;

        }

        return  item;
        
    }

    const getValidation = () => {

         let icon;

        if(validEmail){

            icon = <i style={{ color: "var(--green)"}} className="fa-solid fa-circle-check icon2 emailCheck"></i>

        }else if(emailLength > 0){

           icon = <i style={{ color: "var(--red)"}} className="fa-solid fa-circle-xmark icon2 emailCheck"></i>

        }else{

            icon = <i style={{ color: "var(--grey)"}} className="fa-solid fa-circle-minus icon2 emailCheck"></i>

        }

        return icon;

    }

    const getInput = () => {

        return(

            <div className='row'>

                <div className='inputGroup col-12'>

                    { getEmailLink(email, "input") }
                    <input type='email' className={ classNameText } onChange={ onChange } name='email' placeholder='email' value={ email }></input>
                    { getValidation() }
                    
                </div>

            </div>

        );
    
    }

    const getIcon = () => {

        return getEmailLink(email, "icon" );

    }

    useEffect(() => {

        setEmail(props.value);

    }, [props.value]);

    useEffect(() => {

        let emailCheck = checkEmail(email);

        if(validEmail !== emailCheck){

            setValidEmail(true);

        }

    }, [email]);

    return(

        ( type === "input" ) ? getInput() : getIcon()

    )

}