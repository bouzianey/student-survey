import React, { useState } from "react";
import "../App.css";
import TextComponent from './QuestionTextResponse';
import RadioComponent from './QuestionRadioResponse';

const SurveyResponse = ({user, surveyID, onChangeClose}) => {

        const [studentSurvey, setStudentSurvey] = useState([]);
        const [responses, setResponses] = useState([]);
        const [isDisplayed, setIsDisplayed] = useState(true);


        const handleTextChange = (questionId, std_id, value) => {
            const newTextResponses = [...responses];
            let textItem;

            for(let newResponse of newTextResponses)
            {
                if (questionId === newResponse.questionId && !std_id) {

                    textItem = newResponse;
                    break;

                } else if(newResponse.studentId && std_id === newResponse.studentId && questionId === newResponse.questionId) {

                    textItem = newResponse;
                    break;
                }
            }
            if(textItem){
                textItem.content = value;
            }
            setResponses(newTextResponses);
        }

        const handleRadioChange = (idx, std_id, questionId, value) => {

            const newRadioResponses = [...responses];

            for(let newResponse of newRadioResponses)
            {
                if (questionId === newResponse.questionId && !std_id) {

                    newResponse.options[idx] = value;
                    break;

                } else if(newResponse.studentId && std_id === newResponse.studentId && questionId === newResponse.questionId) {

                    newResponse.options[idx] = value;
                    break;
                }
            }
            setResponses(newRadioResponses);
        }

        const handleCloseChange = e => {

            onChangeClose();
        }
        const displaySurvey = e => {

                setIsDisplayed(false);
                const objectToSend1 = {
                    id : user.id,
                    survey_id : surveyID
                }
            fetch("http://localhost:5000/get_student_survey", {
                method: "POST",
                headers: {
                "Content-type": "application/json",
              },
                body: JSON.stringify(objectToSend1),
            })
              .then((res) => res.json())
              .then((res) => {

                  const questionsList = res.questionList;
                  const responses = [];
                  questionsList.forEach(question => {

                      const responseToPush = {
                          questionId: question.id
                      }
                          if (question.repetition === "multiple") {

                                responseToPush.studentId =  question.student_id
                          }
                          if (question.type === "radio") {

                              responseToPush.options = []
                          }
                          responses.push(responseToPush)
                      }
                  );
                  setResponses(responses)
                  setStudentSurvey(res)
              });
      };
      const submitSurveyResponse = e => {
            e.preventDefault();
            const objectToSend = {
                survey: studentSurvey.surveyName,
                instructor: studentSurvey.InstructorName,
                studentID: studentSurvey.studentid,
                surveyID : studentSurvey.survey_id,
                responseList: responses
            }
            console.log(objectToSend)
            fetch('http://localhost:5000/post_survey_response', {
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
        {
                isDisplayed == true ? displaySurvey() : ""
        }
        <label htmlFor='SurveyName'>  Survey Name : {studentSurvey.surveyName}</label>
        <label htmlFor='InstructorName'>  Instructor Name : {studentSurvey.InstructorName}</label>
        <label htmlFor='SurveyID'>  Survey ID : {studentSurvey.survey_id}</label>
      {studentSurvey.questionList &&
        studentSurvey.questionList.map((question, i) => (
          <>
            {
                (question.type === "radio") ? <RadioComponent key={question.id} i={i} question={question} onRadioChange={handleRadioChange}/> : <TextComponent key={question.id} question={question} onTextChange = {handleTextChange} />
            }
          </>
        ))}
        <input type="submit" className="btn-cancel" onClick={handleCloseChange} value="Close"/>
        <input type="submit" onClick={submitSurveyResponse} value="Submit Response" />
    </div>
  );
}

export default SurveyResponse;