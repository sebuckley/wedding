import { useState } from 'react';

export default function PaymentHistory(props){

    const paymentsMade = props.paymentsMade;
    const [display, setDisplay] = useState(false)

    const sortPayments = (payments) => {

       payments.sort((a, b) =>  new Date(b.paidDate) - new Date(a.paidDate));  

    }

    const toggleDisplay = () => {
        
        setDisplay(prev => !prev);
        
    };

    sortPayments(paymentsMade);

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

      


        return dateConstruct;


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

    const getPaymentHistory = () => {

        let paymentHistory = paymentsMade.map((item) => {

            return (
            
                    <div className="row" style={ getStyle() }>
                    
                        <div className='paymentHistory col-12 payment'>
                
                            <div className="col-3">{ addDate(item.date) }</div>
                            <div className="col-3">{ item.payment }</div>
                            <div className="col-3">{ item.paymentMethod }</div>
                            <div className='col-3'>{ item.paidBy}</div>
                            
                        </div>
                        
                    </div>

            );

        });

        return paymentHistory;

    }

    return (

         <section id="paymentHistory">

            <h3 style={{ textAlign: "left", width: "100%" }}><i onClick={toggleDisplay} id="openPaymentHistory" className={`fa ${display ? "fa-circle-minus" : "fa-circle-plus"} icon3`} aria-hidden="false" title="open payment history"></i> Payment History</h3>
            { paymentsMade.length > 0 ? getPaymentHistory() : <div style={ getStyle() }>No payment history</div> }
                
        </section>

    )

}