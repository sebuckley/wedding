import React from 'react';

export default function QuestionList(props){

    const displayAnswer = props.displayAnswer;
    const faq = props.faq;

    const generateList = (list) => {

        let values = Object.values(list);
        let questionSet = values.map((value, key) => {

            return (
        
                <div className="questionSet" onClick={ displayAnswer } key={ key }>
                    <div className="question" ><div className="plus"></div>&nbsp;&nbsp;&nbsp; { value.question }</div>
                    <div className="answer" onClick={ props.displayAnswer }>{ value.answer }</div>
                </div>

            )
        
        })

        return questionSet;

    }

    return(

        <div>

            { generateList(faq) }
        
            
        </div>

    )

}