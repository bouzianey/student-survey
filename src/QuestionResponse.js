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
            <label htmlFor='{QuestionID}2'>{question.type}</label>
        </div>
    );
};

const RadioComponent = ({questionID , question}) => {
    const QuestionID = {questionID};
    return (
        <div key={`{question.label}`}>
            <label htmlFor='{QuestionID}'>{question.label}</label>
        </div>
    );
};

TextComponent.propTypes = {
    idx: PropTypes.number,
    question: PropTypes.object,
    handleOptionChange: PropTypes.func,
};

RadioComponent.propTypes = {
    idx: PropTypes.number,
    question: PropTypes.object,
    handleOptionChange: PropTypes.func,
};

export default TextComponent;