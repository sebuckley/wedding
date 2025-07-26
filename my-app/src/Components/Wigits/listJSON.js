import React from "react";

const ListItemsJSON = (props) => {

  
  const dataList = props.data;
  let returnItems = [];

  console.log(dataList);

  function checkCapital(str){

    let sL = str.length;
    let capital = false;
    let strPos = [0];
    
    for (let i = 0; i < sL; i++) {

      if (str.charAt(i) === str.charAt(i).toUpperCase()) {

        capital = true;
        strPos.push(i);
       
      }

    }

    return [capital, strPos];

  }

   function titleCase(s) {

    let [capital,char] = checkCapital(s);

    let word = [];
    let wordSplit;

    if(capital === true){

      let createSplit = []

      for(let i = 0; i < char.length; i++){ 

          createSplit.push(s.slice(char[i],char[i + 1]));
  
      }

      wordSplit = createSplit;


    }else{

      wordSplit = [s];

    }

    for(let i = 0; i < wordSplit.length; i ++){

      let newWord = wordSplit[i].toLowerCase().charAt(0).toUpperCase() + wordSplit[i].slice(1)
      word.push(newWord);

    }
    
    return word.join(' ').trim();
  
  } 

  const getInputType = (key, value) => {


    console.log(key.includes("Date"));

    if(key === "Description" || key === "Dress Code"){

      const rows = Math.ceil(value.length / 56);
      const convertText = value.replace(/\\n/g,'\r\n');
      const countNewLines = (value.match(/\\n/g) || []).length;
      
      return <textarea rows={ rows + countNewLines } value={ convertText }></textarea>;

    }else if(key.includes("Date")){

      const convertText = new Date(value).toISOString().slice(0, 16);

      return <input className='inputBox2' type='datetime-local' value={ convertText }></input>;

    }else{

      return <input className='inputBox2' type='text' value={ value }></input>;

    }

  }

    Object.entries(dataList).forEach(([key, value]) => {

        returnItems.push(<li><div className="titleName">{ titleCase(key) }:</div><div className="inputName">{ getInputType(titleCase(key), value) }</div></li>); 

      });
   
    return <ul>{returnItems}</ul>;

};

export default ListItemsJSON;