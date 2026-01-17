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

    if(getList === null){

        return [0, "no match", []];
        
    }

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

    console.log("Saving guest list item:",guestList, index, key, value);

        guestList.list[index][key] = value;
    
    
    const set = saveGuestList(guestList);

    if(set){

        return true;

    }else{

        return false;

    }

}

const saveGuestListItemGuest = (guestList, index, guestIndex, key, value) => {

    console.log("Saving add guest list item:",guestList, index, guestIndex, key, value);

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

const getGuestIndexRole = (guestList, role) => {

    let index = -1;
    let guestIndex = -1;
    let found = false;

    for(let i = 0; i < guestList.length; i++){

        if(guestList.list[i].additionalGuests.length > 0){

            let result = getGuestGuestIndexRole(guestList.list[i].additionalGuests, role);

            if(result[0]){

                index = i;
                guestIndex = result[1];
                found = true;
                break;  

            }
           
        }

        if(guestList.list[i].role === role){

            index = i;
            found = true;
            break;
            
        }

    }

    return [found, index, guestIndex];

}

const getGuestGuestIndexRole = (additionalGuests, role) => {

    let index = -1;
    let found = false;

    for(let i = 0; i < additionalGuests.length; i++){

        if(additionalGuests[i].role === role){

            index = i;
            found = true;
            break;
            
        }

    }

    return [found, index];

}

const deleteGuestListItem = (guestList, index) => {

    guestList.list.splice(index, 1);
    guestList.length = guestList.list.length;

    saveGuestList(guestList);

    return guestList;

}

export { getGuestList,checkExistingGuest, saveGuestList, saveGuestListItem, saveGuestListItemGuest,  getGuestIndex, getGuestIndexRole, deleteGuestListItem } 
  