import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import PropTypes from 'prop-types';
import OptionComponent from './QuestionResponse';


const TextComponent = ({questionID, question }) => {
    const QuestionID = {questionID};
    return (
        <div key={`{question.label}`}>
            <label htmlFor='{QuestionID}'>{question.label}   :</label>
            <label htmlFor='{QuestionID}1'>{question.content}</label>
            <input></input>
        </div>
    );
};

TextComponent.propTypes = {
    idx: PropTypes.number,
    question: PropTypes.object,
    handleQuestionChange: PropTypes.func,
};

export default TextComponent;