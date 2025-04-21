const getDateDayDMY = (date) => {

    const d = new Date(date);

    const monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let end;

    const calDayNumber = d.getDate();

    if(calDayNumber === 1 || calDayNumber === 21 || calDayNumber === 31){

        end = "st";
        
    }else if(calDayNumber === 2 || calDayNumber === 22){

        end = "nd";
        
    }else if(calDayNumber === 3 || calDayNumber === 23){

        end = "rd";
        
    }else{

        end = "th";
    }
    
    const monthName = monthNames[d.getMonth()];
    const dayName = weekday[d.getDay()];
    const year = d.getFullYear();

    return dayName + " " + calDayNumber + end + " of " + monthName + " " + year;

}

export default getDateDayDMY;