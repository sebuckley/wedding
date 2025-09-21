import '../Dashboard.css';
import { useState, useEffect } from 'react';
import { saveBridalPartyItem } from "../../Wigits/dataFunctions-bridalParty";

// import { parsePhoneNumberFromString, isPossiblePhoneNumber, isValidPhoneNumber, validatePhoneNumberLength } from 'libphonenumber-js';

export default function AddFAQ(props){

    const [display, setDisplay]  = useState(false);
    const user = props.user;
    const bridalParty = props.bridalParty;
    const faqs = props.faqs;
    const setFaqs = props.setFaqs;
    const [newQuestion, setNewQuestion] = useState("");
    const [newAnswer, setNewAnswer] = useState("");


    const saveItem = (item, value) => {

        const checkItem = localStorage.getItem("addGuest");

        if(checkItem === null){

            const addGuest = {

                [item]: value

            }

            localStorage.setItem("addGuest", JSON.stringify(addGuest));

        }else{

            const list = JSON.parse(checkItem);

            Object.assign(list, { [item]: value });

            localStorage.setItem("addGuest", JSON.stringify(list));

        }

    }  

    const clearState = () => {

        setNewQuestion('');
        setNewAnswer('');
      
    }

    const clearForm = () => {

        const getForm = document.getElementById("inputForm");

        for( let i = 0; i < getForm.length; i++){

            getForm[i].value = "";

        }

    }

    const clearLocalAddGuest = () => {

        localStorage.removeItem("addGuest");

    }

    const resetIcons = () => {

        document.getElementsByClassName("phoneCheck")[0].style.color = "var(--grey)";
        document.getElementsByClassName("phoneCheck")[0].className = "fa-solid fa-circle-minus icon2 phoneCheck";
        document.getElementsByClassName("emailCheck")[0].style.color = "var(--grey)";
        document.getElementsByClassName("emailCheck")[0].className = "fa-solid fa-circle-minus icon2 emailCheck";

    }

    const clearAddQuestion = () => {

        const checkAction = window.confirm("Are you sure you want to clear the form?");

        if (checkAction === true) {
            
            clearLocalAddGuest();
            clearForm();
            resetIcons();
            clearState();

        } 

    }


    const getCurrentDisplay = () => {

        let style;
        

        if(display){

            style = { display: "" }

        }else{

            style = { display: "none" }

        }

        return style;

    }

    const displayAddQuestion = () => {

        const getIcon = document.getElementById("addQuestionIcon");

        if(display){

            setDisplay(false);
            getIcon.className = "fa fa-circle-plus iconHeader3";

        }else{

            setDisplay(true);
            getIcon.className = "fa fa-circle-minus iconHeader3";

        }

    }

    // Add new FAQ
    const handleAddFAQ = (e) => {

        e.preventDefault();

        if (newQuestion && newAnswer) {
            const updatedFaqs = [
                ...Object.values(faqs),
                { question: newQuestion, answer: newAnswer },
    
            ];
            setFaqs(updatedFaqs);
            saveBridalPartyItem(bridalParty, "faqs", updatedFaqs);
            setNewQuestion("");
            setNewAnswer("");
        }
    };



    return(

        <section id="addQuestionSection">

            <i onClick={ displayAddQuestion } id="addQuestionIcon" className="fa fa-circle-plus iconHeader3"></i>
            <h1 onClick={ displayAddQuestion } id="addQuestionTitle">Add FAQ</h1>
            
            <form id='inputForm' style={ getCurrentDisplay() } target="_blank">
                <p style={{width: "calc(100%-30px)", padding:"10px"}}>A chance to answer any of the common questions that guests are asking.</p>

                {/* Question */}
                <div className="row">

                    <div className="col-12">
                        <i className="fa fa-circle-question icon"></i>
                        <input
                            type="text"
                            className="inputBox"
                            placeholder="Question"
                            value={newQuestion}
                            onChange={e => setNewQuestion(e.target.value)}
                        />

                    </div>

                </div>

                {/* Answer */}
                <div className="row">

                    <div className="col-12">
                        <i className="fa fa-comment icon"></i>
                        <input
                            type="text"
                            className="inputBox"
                            placeholder="Answer"
                            value={newAnswer}
                            onChange={e => setNewAnswer(e.target.value)}
                        />

                    </div>

                </div>

                {/* Buttons */}
                <div className="row">

                    <div className="col-12">
                        
                        <button onClick={ handleAddFAQ } className="button primary">Add</button>

                    </div>
                

                </div>

            </form>

        </section>


    )


}