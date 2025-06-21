
const checkCapital = (str) => {

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

const splitByCapitalNums = (Str) => {

    let split = Str.split(/(?=[A-Z0-9&-])/).join(" ");

    return split;

}

const titleCase = (s) => {

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

        let newWord = wordSplit[i].toString().toLowerCase().charAt(0).toUpperCase() + wordSplit[i].slice(1)
        word.push(newWord);

    }

    return word.join(' ').trim();

} 

const createClass = (key) => key.replace(/\s/g,"");

const isEmpty = (obj) => JSON.stringify(obj) === '{}';

const uuidv4 = () => {

    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {

        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);

    });

}


export { checkCapital, titleCase, createClass, isEmpty, uuidv4, splitByCapitalNums }