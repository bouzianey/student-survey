import React, { useState } from "react";
import logo from "../logo.svg";
import "../App.css";
import PropTypes from 'prop-types';
import OptionComponent from './QuestionResponse';



const TextComponent = ({i, question, onTextChange}) => {

  const [textContent, setTextContent] = useState("");

  const handleTextResponseChange = (e) => {
    const value = e.target.value;
      setTextContent(value);
      onTextChange(i, question.id, question.student_id, value);

  };

  return (
      <div>
          <p><h5 htmlFor='{question.id}'>{question.label}  :  {question.student_name}</h5></p>
          <p><h6 htmlFor='{question.id}1'>{question.content}</h6>
          <input
              type="text"
              name='text'
              className={textContent.length === 0 ? "error" : null}
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