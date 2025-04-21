import React from "react";

const ListItems = (props) => {

  const dataList = props.data;
  let returnItems = [];

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

    Object.entries(dataList).forEach(([key, value]) => {

        returnItems.push(<li><div className="titleName">{ titleCase(key) }:</div><div className="inputName"><input type='text' value={value}></input></div></li>); 

      });
   
    return <ul>{returnItems}</ul>;

};

export default ListItems;