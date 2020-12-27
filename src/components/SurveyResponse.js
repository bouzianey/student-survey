import React, { useState } from "react";
import "../App.css";
import "./Styling.css";
import TextComponent from './QuestionTextResponse';
import RadioComponent from './QuestionRadioResponse';

const SurveyResponse = ({user, surveyID, onChangeClose}) => {

        const [studentSurvey, setStudentSurvey] = useState([]);
        const [responses, setResponses] = useState([]);
        const [isDisplayed, setIsDisplayed] = useState(true);
        const [isFormErrorDisplayed, setIsFormErrorDisplayed] = useState(false);
        const [formErrorsState, setformErrorsState] = useState([]);
        const [formResultState, setformResultState] = useState("");

        const iniatializeFormError = () => {

            if(formErrorsState.length === 0){

                    Object.values(studentSurvey.questionList).forEach(val => {
                    formErrorsState.push({check_point: "invalid"});
                });

            }
            setIsFormErrorDisplayed(false);
        }
        const formValid = () => {

            let valid = true;
            console.log(formErrorsState);
            // validate form errors being empty & the form was filled out
            Object.values(formErrorsState).forEach(val => {
              val.check_point === "invalid" && (valid = false);
            });

            return valid;
        };
        const handleTextChange = (i, questionId, std_id, value) => {
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

            if(value.length === 0){

                formErrorsState[i].check_point= "invalid";
            }
            else
            {
                formErrorsState[i].check_point= "valid";
            }
        }

        const handleRadioChange = (i , idx, std_id, questionId, value) => {

            const newRadioResponses = [...responses];
            let rps = {};
            let checker = "valid";

            for(let newResponse of newRadioResponses)
            {
                if (questionId === newResponse.questionId && !std_id) {

                    newResponse.options[idx] = value;
                    rps = newResponse
                    break;

                } else if(newResponse.studentId && std_id === newResponse.studentId && questionId === newResponse.questionId) {

                    newResponse.options[idx] = value;
                    rps = newResponse
                    break;
                }
            }
            setResponses(newRadioResponses);

            Object.values(rps.options).forEach(val => {
                val.content === "" && (checker = "invalid");
                console.log(checker);
            });

            if(checker === "valid"){
                formErrorsState[i].check_point = "valid";
            }
            else{
                formErrorsState[i].check_point = "invalid";
            }
        }

        const handleCloseChange = (val) => {

            onChangeClose(val);
        }
        const displaySurvey = e => {

                setIsDisplayed(false);
                const objectToSend1 = {
                    id : user.id,
                    survey_id : surveyID
                }
            fetch("https://survey-manager-yb-scsu.herokuapp.com/get_student_survey", {
                method: "POST",
                headers: {
                "Content-type": "application/json",
                "Access-Control-Allow-Origin":"*"
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

                              question.options.forEach(val => {
                                  const obj = {
                                        content : "",
                                        question_id :question.id
                                  }
                                  responseToPush.options.push(obj)
                              })
                          }
                          responses.push(responseToPush)
                      }
                  );
                  setResponses(responses);
                  setStudentSurvey(res);
                  setIsFormErrorDisplayed(true);
              });
      };
      const submitSurveyResponse = e => {

            e.preventDefault();
            if(formValid()){

                const objectToSend = {
                    survey: studentSurvey.surveyName,
                    instructor: studentSurvey.InstructorName,
                    studentID: studentSurvey.studentid,
                    surveyID : studentSurvey.survey_id,
                    responseList: responses
                }
                setformResultState("Survey was successfully submitted");
                fetch('https://survey-manager-yb-scsu.herokuapp.com/post_survey_response', {
                method: 'POST',
                headers: {
                'Content-type': 'application/json',
                },
                body: JSON.stringify(objectToSend),
                }).then(res => res.json())
                handleCloseChange("Survey was successfully submitted");

            }else{
                setformResultState("Survey Invalid! make sure you answer all questions");
            }
      }

  return (
    <div className="App">
        {
            isDisplayed === true ? displaySurvey() : ""
        }
        {
            isFormErrorDisplayed === true ? iniatializeFormError() : ""
        }
        <h5 align="center">  Survey Name : {studentSurvey.surveyName}</h5>
      {studentSurvey.questionList &&
        studentSurvey.questionList.map((question, i) => (
          <>
            {
                (question.type === "radio") ? <RadioComponent key={question.id} i={i} question={question} onRadioChange={handleRadioChange}/> : <TextComponent i={i} key={question.id} question={question} onTextChange = {handleTextChange} />
            }
          </>
        ))}
        <input type="submit" className="btn-danger" onClick={(id) =>handleCloseChange("")}value="Close"/>
        <input type="submit" className="btn-primary" onClick={submitSurveyResponse} value="Submit Response" />
        {formResultState === "Survey Invalid! make sure you answer all questions" && (
                    <span className="errorMessage">{formResultState}</span>
        )}
    </div>
  );
}

export default SurveyResponse;