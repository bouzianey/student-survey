import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import TextComponent from './QuestionTextResponse';
import RadioComponent from './QuestionRadioResponse';

function App() {

  const [studentSurvey, setStudentSurvey] = useState([]);
  const submit = e => {
        e.preventDefault();
        const objectToSend = {
        }

    fetch("http://localhost:5000/get_api", {
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => setStudentSurvey(res));
  };

  return (
    <div className="App">
      <input type="submit" onClick={submit} value="Submit" />
        <label htmlFor='SurveyName'>  Survey Name : {studentSurvey.surveyName}</label>
        <label htmlFor='InstructorName'>  Instructor Name : {studentSurvey.InstructorName}</label>
        <label htmlFor='SurveyID'>  Survey ID : {studentSurvey.survey_id}</label>
      {studentSurvey.questionList &&
        studentSurvey.questionList.map((question) => (
          <>
            {(question.type === "radio") ? <RadioComponent questionID={question.id} question={question}/> : <TextComponent questionID={question.id} question={question}/> }
          </>
        ))}
    </div>
  );
}

export default App;