import React, { useState } from "react";
import logo from "../logo.svg";
import "../App.css";
import PropTypes from 'prop-types';
import OptionComponent from './QuestionResponse';



const TextComponent = ({ question, onTextChange}) => {

  const [textContent, setTextContent] = useState("");

  const handleTextResponseChange = (e) => {
    const value = e.target.value;
      setTextContent(value);
      onTextChange(question.id, question.student_id, value);

  };

  return (
      <div>
          <p><label htmlFor='{question.id}'>{question.label}  :  {question.student_name}</label></p>
          <p><label htmlFor='{question.id}1'>{question.content}</label>
          <input
              type="text"
              name='text'
              className="name"
              value={textContent}
              onChange={handleTextResponseChange}
          />
          </p>
      </div>
  );
};


TextComponent.propTypes = {
    idx: PropTypes.number,
    question: PropTypes.object,
    handleQuestionChange: PropTypes.func,
};

export default TextComponent;