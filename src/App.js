import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import TextComponent from './QuestionTextResponse';
import RadioComponent from './QuestionRadioResponse';

function App() {

  const [studentSurvey, setStudentSurvey] = useState([]);
  const [Response, setResponse] = useState([]);

    const addResponse = (question) => {
        const newResponse = {  label: `Question #${question.length+1}`, type: question.type , repetition: question.repetition, surveyID: question.survey_id }
        if(question.type === 'radio') newResponse.options = [{content:'', label:'' , questionID : question.id}];
        else newResponse.content=  '';
        setResponse([...Response, newResponse]);
        return newResponse
    };

    const handleResponseChange = (newResponse, idx) => {
        const newResponses = [...Response];
        newResponses[idx].options = newResponse;
        setResponse(newResponses);

    }

    const handleResponseContentChange = (val, idx) => {

        const newResponses = [...Response];
        newResponses[idx].content = val;
        setResponse(newResponses);

    };
      const displaySurvey = e => {
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
      const submitSurveyResponse = e => {
            e.preventDefault();
            const objectToSend = {
                survey: studentSurvey.surveyName,
                instructor: studentSurvey.InstructorName,
                surveyID : studentSurvey.survey_id,
                responseList: Response
            }

            fetch('http://localhost:5000/get_survey_response', {
                method: 'POST',
                headers: {
                'Content-type': 'application/json',
            },
                body: JSON.stringify(objectToSend),
            }).then(res => res.json())
                .then(res => console.log(res));
        }


  return (
    <div className="App">
      <input type="submit" onClick={displaySurvey} value="Display Survey" />
        <label htmlFor='SurveyName'>  Survey Name : {studentSurvey.surveyName}</label>
        <label htmlFor='InstructorName'>  Instructor Name : {studentSurvey.InstructorName}</label>
        <label htmlFor='SurveyID'>  Survey ID : {studentSurvey.survey_id}</label>
      {studentSurvey.questionList &&
        studentSurvey.questionList.map((question, idx) => (
          <>
              addResponse(question)
            {(question.type === "radio") ? <RadioComponent idx = {idx} questionID={question.id} response={Response} question={question} handleResponseChange = {handleResponseChange} handleResponseContentChange = {handleResponseContentChange}/> : <TextComponent idx = {idx} questionID={question.id} question={question} handleResponseChange = {handleResponseChange} handleResponseContentChange = {handleResponseContentChange} /> }
          </>
        ))}
        <input type="submit" onClick={submitSurveyResponse} value="Submit Response" />
    </div>
  );
}

export default App;