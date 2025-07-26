import { useState } from 'react';

export default function Notes(props){

    const notes = props.notes;
    const [display, setDisplay] = useState(false)


    const sortNotes = (notes) => {

       notes.sort((a, b) =>  new Date(b.created) - new Date(a.created));  

    }

    const toggleDisplay = () => {
        
        setDisplay(prev => !prev);
        
    };



    sortNotes(notes);

    const addDate = (date) => {

       let dateConstruct;

        let newDate = new Date(date);
        let year = newDate.getFullYear();
        let month = newDate.getMonth()+1;
        let dt = newDate.getDate();
        let hours = newDate.getHours();
        const minutes = newDate.getMinutes().toString().padStart(2, '0');

// Determine AM or PM
        const amOrPm = hours >= 12 ? 'pm' : 'am';

        // Convert to 12-hour format
        hours = hours % 12 || 12;

        // Format the time string
        const timeString = `${hours}:${minutes}${amOrPm}`;

        if (dt < 10) {
          dt = '0' + dt;
        }
        if (month < 10) {
          month = '0' + month;
        }

        dateConstruct = dt + '/' + month + '/' + year;

      
        let newTime = new Date(date).toISOString().split('T')[1];

        return dateConstruct + " " + timeString;


    }

    const getFirstNote = () =>{


        return <><div className="col-5">{ notes[0].note }</div ><div className='col-3'>{ addDate(notes[0].created) }</div><div className='col-3'>{  notes[0].createdBy }</div><div className='col-1'><i onClick={toggleDisplay} id="openNotes" className={`fa ${display ? "fa-circle-minus" : "fa-circle-plus"} icon3`} aria-hidden="false" title="open notes"></i></div></>;

    }

    const getStyle = () => {

        let style;

        if(!display){

            style = { 
                
                display: "none",
                textAlign: "left",
                width: "100%"

            }

        }else{

            style = { 
                
                textAlign: "left",
                width: "100%"

            }

        }

        return style;

    }

   

    const getRemainingNotes = () => {

        let remainingNotes = notes.map((item, index) => {

            if(index > 0){

                return <div className="row "><div className='additionalNote col-12 notes' style={ getStyle() }><div className="col-5">{ item.note }</div><div className="col-3">{ addDate(item.created) }</div><div className="col-3">{ item.createdBy }</div><div className='col-1'></div></div></div>;

            }


        });

        return remainingNotes;

    }

    return (

        <>

            <h3 style={{ textAlign: "left", width: "100%" }}>Latest note</h3>

            <div className='row'>

           
                
                <div className='firstNote col-12 notes'>

                    { notes.length > 0 ? getFirstNote() : <p>No current notes.</p> }
                            
                </div>

                    

            </div>
                <h3 style={ getStyle() }>Notes</h3>
            
                { notes.length > 1 ? getRemainingNotes() : "" }
                
     

        </>

    )

}