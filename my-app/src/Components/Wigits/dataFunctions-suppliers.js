const getSupplierList = () => {

    const getList = JSON.parse(localStorage.getItem("supplierList"));
    return getList;

};

const saveSupplierList = (supplierList) => {

    supplierList.length = supplierList.list.length;
    localStorage.setItem("supplierList", JSON.stringify(supplierList));
    return true;

};

const getSupplierIndex = (supplierID,supplierList="") => {

    let supplierListUsed;

    if(supplierList === ""  || typeof supplierList === "undefined"){

        supplierListUsed = getSupplierList();

    }else{

        supplierListUsed = supplierList;

    }
 
    for(let i = 0; i < supplierListUsed.length; i++){

        if(supplierListUsed.list[i].UUID.trim() === supplierID.trim()){

            return i;

        }

    }

}

const updateSupplierItem = (UUID,name,value) => {

    const supplierList = getSupplierList();

    let index = getSupplierIndex(supplierList, UUID);
    supplierList.list[index][name] = value;
    saveSupplierList(supplierList);

}

const getSupplierName = (UUID) => {

  const supplierList = getSupplierList();

    let index = getSupplierIndex(UUID);
    
    return supplierList.list[index].name;
    

}

const updateSupplierObject = (supplierList,index,object) => {

    supplierList.list[index] = object;
    saveSupplierList(supplierList);

    return supplierList;

}

const checkExistingSupplier = (name, email) => {

    const getList = getSupplierList();

    if (!getList || !getList.list) return [0, "no match", []];

    let nameCheck = false;
    let emailCheck = false;

    for (let i = 0; i < getList.list.length; i++) {

        if (getList.list[i].name === name) nameCheck = true;
        if (getList.list[i].email === email) emailCheck = true;

        if (nameCheck && emailCheck) break;
        
    }

    if (!nameCheck && !emailCheck) return [0, "no match", []];
    if (nameCheck && emailCheck) return [1, "full match", ["name", "email"]];
    if (emailCheck) return [1, "email match", ["email"]];
    if (nameCheck) return [1, "name match", ["name"]];

    return [0, "no match", []];

};

const deleteSupplierListItem = (supplierList, index) => {

    supplierList.list.splice(index, 1);
    supplierList.length = supplierList.list.length;

    saveSupplierList(supplierList);

    return supplierList;

}

export { getSupplierList, saveSupplierList, checkExistingSupplier, getSupplierIndex, updateSupplierItem, deleteSupplierListItem, updateSupplierObject, getSupplierName};
