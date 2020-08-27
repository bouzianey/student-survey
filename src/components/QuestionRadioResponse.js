import React from "react";
import "../App.css";
import PropTypes from 'prop-types';
import OptionComponent from "./OptionResponse";
import "./Styling.css";


const RadioComponent = ({ i, question, onRadioChange}) => {


  const handleRadioResponseChange = (e, idx, val) => {

            const obj = {
        content : val,
        question_id :question.id
    }
            onRadioChange(i,idx,question.student_id, question.id, obj);

  };

  return (
     <div key={`{question.label}`}>
        <p>
        <h5 htmlFor='{QuestionID}'>{question.label} :  {question.student_name} </h5>
        </p>
         <table className="table-grid" border={0}>
             <thead align="center">
                <tr>
                        <th></th>
                        <th>Strongly disagree</th>
                        <th>Disagree</th>
                        <th>Neutral</th>
                        <th>Agree</th>
                        <th>Strongly agree</th>
                </tr>
            </thead>
            <tbody align="center">
      {question.options &&
        question.options.map((option, idx) => (
          <>
            { <OptionComponent idx={idx} i ={i} option={option} onOptionChange={handleRadioResponseChange} /> }
          </>
        ))}
            </tbody>
        </table>
    </div>
  );
};


RadioComponent.propTypes = {
    idx: PropTypes.number,
    question: PropTypes.object,
    handleQuestionChange: PropTypes.func,
};


export default RadioComponent;