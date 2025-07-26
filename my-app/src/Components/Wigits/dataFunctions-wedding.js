const  getWedding = () => {

    const checkItem = JSON.parse(localStorage.getItem("wedding"));
    return checkItem;

}

const saveWedding = (list) => {

    const setItem = localStorage.setItem("wedding", JSON.stringify(list));

    if(setItem){

        return true;

    }else{

        return false;

    }

}

const saveWeddingItem = (wedding, key, value) => {

    const setValue = wedding[key] = value;
    
    if(!setValue){

        throw Error;

    }
    const set = saveWedding(wedding);

    if(set){

        return true;

    }else{

        return false;

    }

}

// const checkExistingWedding = (weddingList, value) => {

//     let existing = false

//     for(let i = 0; i < weddingList.length; i++){

//         if(weddingList.list[i].taskName === value){

//             existing = true;
//             break;

//         }

//     }

//     return existing;

// }

// const getWeddingIndex = (weddingList, UUID) => {

//     for(let i = 0; i < weddingList.list.length; i++){

//         if(weddingList.list[i].itemID === UUID){

//             return i;

//         }

//     }

// }

const deleteWeddingItem = (wedding, key) =>{

    delete wedding[key];
    saveWedding(wedding);
    
    return wedding;

}


export { getWedding, saveWedding, saveWeddingItem, deleteWeddingItem } 
  