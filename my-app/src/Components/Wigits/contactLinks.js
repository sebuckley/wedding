const getPhoneLink = (num, type="input", setValidPhone) => {

    let itemName;
    let item = num;

    let validPhone = checkPhone(num);
    setValidPhone(validPhone);

    if(type === "input"){

        itemName = "fa-solid fa-phone icon";

    }else{

        itemName = "fa-solid fa-phone icon3";

    }

        if(item !== "" && validPhone){

        let href = "tel:" + num;
        item = <a href={href}> <i className={ itemName }></i></a>

    }else{

        item = <i className={ itemName }></i>;

    }

    return item;
    
}

const checkPhone = (number) => {

    const char = number.length;
    let phoneNumber = number;
    let validNumber = false;
    let result;

    if( isNaN(phoneNumber) === false && phoneNumber.length === 11){

        validNumber = true;

    }
    
    const getIcon = document.getElementsByClassName("phoneCheck")[0];

    if(validNumber){

        getIcon.style.color = "var(--green)";
        getIcon.className = "fa-solid fa-circle-check icon2 phoneCheck";
        result = true;

    }else if(char > 0){

        getIcon.style.color = "var(--red)";
        getIcon.className = "fa-solid fa-circle-xmark icon2 phoneCheck";
        result = false;

    }else{

        getIcon.style.color = "var(--grey)";
        getIcon.className = "fa-solid fa-circle-minus icon2 phoneCheck";
        result = false;

    }

    return result;

}

const getEmailLink = (email, type="input") => {

        let itemName;
        let item;
    let validEmail = checkEmail(email, "no");


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

const checkEmail = (email, updateIcon="yes") => {

    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const char = email.length;
    const regexResult = regex.test(email);
    let result;

    console.log(updateIcon)

    if(updateIcon === "yes"){

        const getIcon = document.getElementsByClassName("emailCheck")[0];

        console.log(getIcon);

        if(regexResult){

            getIcon.style.color = "var(--green)";
            getIcon.className = "fa-solid fa-circle-check icon2 emailCheck";
            result = true;

        }else if(char > 0){

            getIcon.style.color = "var(--red)";
            getIcon.className = "fa-solid fa-circle-xmark icon2 emailCheck";
            result = false;

        }else{

            getIcon.style.color = "var(--grey)";
            getIcon.className = "fa-solid fa-circle-minus icon2 emailCheck";
            result = false;

        }

    }

    return result;

}


const getWebLink = (webLink, type="input") => {

    let itemName;
    let item = webLink; 

    if(type === "input"){

        itemName = "fa-solid fa-globe icon";

    }else{

        itemName = "fa-solid fa-globe icon3";

    }  

    if(item !== ""){

        let href = webLink.startsWith('http://') || webLink.startsWith('https://') ? webLink : 'http://' + webLink;
        item = <a href={href} target="_blank" rel="noopener noreferrer"> <i className={ itemName }></i></a>

    }else{        
        
        item = <i className={ itemName }></i>;    

    }

    return item;

}    

export { getPhoneLink, getEmailLink,checkPhone, checkEmail, getWebLink};