import React, { useState } from "react";
import logo from "../logo.svg";
import "../App.css";
import PropTypes from 'prop-types';
import OptionComponent from "./OptionResponse";


const RadioComponent = ({ i, question, onRadioChange}) => {


  const handleRadioResponseChange = (e, idx, val) => {

            const obj = {
        content : val,
        question_id :question.id
    }
            onRadioChange(idx,question.student_id, question.id, obj);

  };

  return (
     <div key={`{question.label}`}>
        <p>
        <label htmlFor='{QuestionID}'>{question.label} :  {question.student_name} </label>
        </p>
         <p>
      {question.options &&
        question.options.map((option, idx) => (
          <>
            { <OptionComponent idx={idx} i ={i} option={option} onOptionChange={handleRadioResponseChange} /> }
          </>
        ))}
        </p>
    </div>
  );
};


RadioComponent.propTypes = {
    idx: PropTypes.number,
    question: PropTypes.object,
    handleQuestionChange: PropTypes.func,
};


export default RadioComponent;