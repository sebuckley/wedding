import { useEffect, useState } from 'react';

// This fucntion returns either an input or a link in an icon for phone addresses
export function checkValidPhone(phone){

    const regex = /^\+?(?:\d\s?){10,12}$/;
    const regexResult = regex.test(phone);

    return regexResult;

}

export default function Phone(props){

    const [ update, setUpdate ] = useState(0);
    const [ phone, setPhone ] = useState("");
    const [ validPhone, setValidPhone ] = useState(false);
    const [ phoneLength, setPhoneLength ] = useState(0);
    const type = props.type || "input";
    const classNameText = props.class || "inputBox checkIcon";
    const updateFunction = props.updateFunction || function(){};
    const name = props.numberType || "phone";
    const namePlaceHolder = props.namePlaceHolder || "phone";
    const setRemoveSpaces = props.setRemoveSpaces || false;
    
    const onChange = function(e){ 
        
       let phoneValue = e.target.value;

        if(setRemoveSpaces){

            phoneValue = removeSpaces(e);
        
        }

        e.target.value = phoneValue;

        console.log(e.target.value);

        setPhone( phoneValue ); 
        setUpdate( update + 1 );
        updateFunction(e);
        //checkPhone( phoneValue );

    };

    const getPhoneLink = (phone, type="input") => {

        let itemName;
        let item;

        if(type === "input"){

            itemName = "fa-solid fa-phone icon";

        }else{

            itemName = "fa-solid fa-phone icon3";

        }

        if(item !== "" && validPhone){

            let href = "tel:" + phone;
        
            item = <a href={href}> <i className={ itemName }></i></a>;

        }else if(type==="input"){

            item = <i className={ itemName }></i>;

        }else{

            item= null;

        }

        return  item;
        
    }

    const checkPhone = (phone) => {

        const regexResult = checkValidPhone(phone);
        setPhoneLength(phone.length);
       
        setValidPhone(regexResult);
        return regexResult;

    }

    const getValidation = () => {

         let icon;

        if(validPhone){

            icon = <i style={{ color: "var(--green)"}} className="fa-solid fa-circle-check icon2 phoneCheck"></i>

        }else if(phoneLength > 0){

           icon = <i style={{ color: "var(--red)"}} className="fa-solid fa-circle-xmark icon2 phoneCheck"></i>

        }else{

            icon = <i style={{ color: "var(--grey)"}} className="fa-solid fa-circle-minus icon2 phoneCheck"></i>

        }

        return icon;

    }

    const getInput = () => {

        return(

            <div className='row'>

                <div className='inputGroup col-12'>

                    { getPhoneLink(phone, "input") }
                    <input type='phone' className={ classNameText } onChange={ onChange } name={ name } placeholder={ namePlaceHolder } value={ phone }></input>
                    { getValidation() }
                    
                </div>

            </div>

        );
    
    }

    const getIcon = () => {

        return getPhoneLink(phone, "icon" );

    }

    const removeSpaces = (e) => {

        let value = e.target.value;
        value = value.split(" ").join("");

        return value;
    
    };

    useEffect(() => {

        setPhone(props.value);

    }, [props.value]);

    useEffect(() => {

        let phoneCheck = checkPhone(phone);

        if(validPhone !== phoneCheck){

            setValidPhone(phoneCheck);

        }

    }, [phone]);



    return(

        ( type === "input" ) ? getInput() :  getIcon()

    )

}