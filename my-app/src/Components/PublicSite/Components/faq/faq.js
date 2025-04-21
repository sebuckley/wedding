import './faq.css';
import React from 'react';
import faqIcon from '../../../../images/faq.png';
import QuestionList from './questionList';

export default function FAQ(props){

    const headerOn = props.headerOn;
    const emailLink = "mailtto:" + props.wedding.email + "?subject=" + props.wedding.name + " - " + props.wedding.faqSubject;
    const emailAddress = props.wedding.email;
    const faq = props.faq;

    const displayHeader = () => {

        return (

            <div className="faqheader">
                <h1>Frequently asked questions</h1>
            </div>

        );

    }

    const displayAnswer = (e) => {

        e.preventDefault();

        const targetClick = e.target
        let currentDisplay;
        let iconChange;

        if(targetClick.className === "plus"){

            currentDisplay = targetClick.parentNode.parentNode.querySelectorAll(".answer")[0];;
            iconChange = targetClick.parentNode.parentNode.querySelector(".plus");

        }else if(targetClick.className === "answer"){

            currentDisplay = targetClick;
            iconChange = targetClick.parentNode.querySelector(".plus");

        }else{

            currentDisplay = targetClick.parentNode.querySelectorAll(".answer")[0];
            iconChange = targetClick.parentNode.querySelector(".plus");

        }

        console.log(currentDisplay.style.display);

        

        if(getComputedStyle(currentDisplay).display === "none" || currentDisplay.style.display === null){

            currentDisplay.style.display = "block";
            iconChange.style.backgroundImage = "url('./images/minus.png')";
          

        } else{

            currentDisplay.style.display = "none";
            iconChange.style.backgroundImage = "url('./images/plus.png')";
          
        }

    }

    return(

        <section id="FAQ">

            { headerOn ? displayHeader() : ""}

            <div className="faq">

                <div className="left">

                    <div>
                        <img src={faqIcon} width="60px" height="60px" alt="faq icon" />
                        <p>FAQ's</p>
                        <p>More questions email us: </p>
                        <a href={ emailLink }>{ emailAddress }</a>
                    </div>
                    
                </div>

                <div className="right">

                    <QuestionList displayAnswer={ displayAnswer } faq={ faq } />

                </div>

            </div>
        
        </section>

    )

}
