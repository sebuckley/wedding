const  getBridalParty = () => {

    const checkItem = JSON.parse(localStorage.getItem("bridalParty"));
    return checkItem;

}

const saveBridalParty = (list) => {

    const setItem = localStorage.setItem("bridalParty", JSON.stringify(list));

    if(setItem){

        return true;

    }else{

        return false;

    }

}

const saveBridalPartyItem = (weddingParty, key, value) => {

    const setValue = weddingParty[key] = value;
    
    if(!setValue){

        throw Error;

    }
    const set = saveBridalParty(weddingParty);

    if(set){

        return true;

    }else{

        return false;

    }

}

const deleteBridalPartyItem = (weddingParty, key) =>{

    delete weddingParty[key];
    saveBridalParty(weddingParty);
    
    return weddingParty;

}


export { getBridalParty, saveBridalParty, saveBridalPartyItem, deleteBridalPartyItem } 
  