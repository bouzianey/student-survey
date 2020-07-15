import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import PropTypes from 'prop-types';
import OptionComponent from './QuestionResponse';



const TextComponent = ({idx,response, questionID, question, handleResponseChange, handleResponseContentChange }) => {

    const QuestionID = {questionID};

    const [TextContent, setTextContent] = useState(response.content);

    const handleTextResponseChange = (e) => {
        handleResponseChange(e.target.value, idx)
    };

    return (
        <div key={`{question.label}`}>
            <label htmlFor='{QuestionID}'>{question.label}   :</label>
            <label htmlFor='{QuestionID}1'>{question.content}</label>
            <input
            type="text"
                name={'text-{idx}'}
                data-idx={idx}
                id={idx}
                className="name"
                value={TextContent.value}
                handleTextResponseChange = {handleTextResponseChange}
            />
        </div>
    );
};

TextComponent.propTypes = {
    idx: PropTypes.number,
    question: PropTypes.object,
    handleQuestionChange: PropTypes.func,
};

export default TextComponent;