const getGuestList = () => {

        const getList = JSON.parse(localStorage.getItem("guestList"));

        return getList;

}

const checkExistingGuest = (firstName, surname, email) =>{

    const getList = JSON.parse(localStorage.getItem("guestList"));

    let returnArray;
    let firstNameCheck = false;
    let surnameCheck = false;
    let emailCheck = false;

    for(let i = 0; i < getList.length; i++){

        if(getList.list[i].firstName === firstName){

            firstNameCheck = true;

        }

        if(getList.list[i].surname === surname){

            surnameCheck = true;

        }

         if(getList.list[i].email === email){

            emailCheck = true;

        }

        if(firstNameCheck && surnameCheck && emailCheck){

            break;

        }

    }

    if(!firstNameCheck && !surnameCheck && !emailCheck){

        returnArray = [0, "no match", []];

    }else if(firstNameCheck && surnameCheck && emailCheck){

        returnArray = [1, "full match", ["first name", "surname", "email"]];

    }else if(firstNameCheck && surnameCheck && !emailCheck){

        returnArray = [2, "partial match", ["first name", "surname"]];

    }else if(firstNameCheck && !surnameCheck && emailCheck){

        returnArray = [3, "partial match", ["first name", "email"]];

    }else if(!firstNameCheck && surnameCheck && emailCheck){

        returnArray = [3, "partial match", ["surname", "email"]];

    }else if(!firstNameCheck && !surnameCheck && emailCheck){

        returnArray = [1, "email match", ["email"]];

    }else if(!firstNameCheck && surnameCheck && !emailCheck){

        returnArray = [5, "partial match", ["surname"]];

    }

    return returnArray;

}

const saveGuestList = (guestList) => {

    guestList.length = guestList.list.length;
    const setItem = localStorage.setItem("guestList", JSON.stringify(guestList));

    if(setItem){

        return true;

    }else{

        return false;

    }

}

const saveGuestListItem = (guestList, index, key, value) => {

    guestList.list[index][key] = value;
    
    const set = saveGuestList(guestList);

    if(set){

        return true;

    }else{

        return false;

    }

}

const saveGuestListItemGuest = (guestList, index, guestIndex, key, value) => {

    guestList.list[index]["additionalGuests"][guestIndex][key] = value;
    
    const set = saveGuestList(guestList);

    if(set){

        return true;

    }else{

        return false;

    }

}

const getGuestIndex = (guestList, personID) => {

    for(let i = 0; i < guestList.length; i++){

        if(guestList.list[i].UUID === personID){

            return i;

        }

    }

}

const deleteGuestListItem = (guestList, index) => {

    guestList.list.splice(index, 1);
    guestList.length = guestList.list.length;

    saveGuestList(guestList);

    return guestList;

}




export { getGuestList,checkExistingGuest, saveGuestList, saveGuestListItem, saveGuestListItemGuest,  getGuestIndex, deleteGuestListItem } 
  