import React, { useState, useEffect } from "react";
import {faqs as questionsList } from "../../PublicSite/Components/Data/data"; 
import { saveBridalPartyItem } from "../../Wigits/dataFunctions-bridalParty";
import AddFAQ from "./addQuestion";

export default function FAQ(props) {
    

    const [faqs, setFaqs] = useState(questionsList);
    const [editingIndex, setEditingIndex] = useState(null);
    const [editingAnswer, setEditingAnswer] = useState("");
    const bridalParty = props.bridalParty;

  

    // Start editing an answer
    const handleEdit = (idx) => {

        setEditingIndex(idx);
        setEditingAnswer(faqs[idx].answer);

    };

    // Save edited answer
    const handleSaveEdit = (idx) => {

        const updatedFaqs = Object.entries(faqs).map(([key, faqObj], i) =>
            key === idx ? { ...faqObj, answer: editingAnswer } : faqObj
        );

        setFaqs(updatedFaqs);
        saveBridalPartyItem(bridalParty, "faqs", updatedFaqs);
        setEditingIndex(null);
        setEditingAnswer("");

    };

    // Delete a FAQ
    const deleteQuestion = (key) => {
        const updatedFaqs = Object.entries(faqs)
            .filter(([k]) => k !== key)
            .map(([_, faqObj]) => faqObj);
        setFaqs(updatedFaqs);
        saveBridalPartyItem(bridalParty, "faqs", updatedFaqs);
    };

    return (

        <>

        <AddFAQ bridalParty={ bridalParty } faqs={ faqs } setFaqs={ setFaqs } />
        <div className="detailsContainer">

            <h2>Frequently Answered Questions (FAQ's)</h2>
        
                {Object.entries(faqs).map(([key, faqObj], idx) => (
                    <div key={key} className="row">
                        <div className="col-5">
                        <strong>{faqObj.question}</strong>
                        </div>
                     
                        {editingIndex === key ? (

                            <>
                            <div className="col-5">
                                <textarea
                                    rows="4"
                                    value={editingAnswer}
                                    onChange={e => setEditingAnswer(e.target.value)}
                                />

                                </div>

                                <div className="col-2">
                                <button onClick={() => handleSaveEdit(key)} className="button primary">Save</button>
                                </div>

                                </>
                            
                        ) : (

                            <>
                                <div className="col-5">
                                    { faqObj.answer}
                                </div>
                                <div className="col-2">
                                    <button onClick={() => handleEdit(key)} className="button primary">Edit</button>
                                    <button onClick={() => deleteQuestion(key)} className="button secondary">Delete</button>
                                </div>

                            </>
                        )}
                    </div>
                ))}
            
           
        </div>

        </>
    );
}

