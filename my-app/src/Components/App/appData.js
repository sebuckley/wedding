import { useState } from 'react';

export default function appData() {

    function isObject (item) {

        return (typeof item === "object" && !Array.isArray(item) && item !== null);

    }

    const saveData = (data, name = "systemData") => {

        const checkObject = isObject(data);

        if(checkObject){

            const objectString = JSON.stringify(data);
            const fs = require("fs");
            fs.writeFile(name + ".json", objectString);
            return true;

        }else{

            return false;

        };

        

    }
    
    const getData = (name = "systemData") => {

        const data = fetch(name + ".json").then( response => response.json());
        return data;
     

    }

}