import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import PropTypes from 'prop-types';
import OptionComponent from "./OptionResponse";


const RadioComponent = ({idx,response, questionID , question, handleResponseChange, handleResponseContentChange}) => {
    const QuestionID = {questionID};
    return (
    <div key={`{question.label}`}>
        <label htmlFor='{QuestionID}'>{question.label}</label>

      {question.options &&
        question.options.map((option) => (
          <>
            { <OptionComponent optionID={option.question_id} option={option}/> }
          </>
        ))}
    </div>
  );
};

RadioComponent.propTypes = {
    idx: PropTypes.number,
    question: PropTypes.object,
    handleQuestionChange: PropTypes.func,
};

export default RadioComponent;