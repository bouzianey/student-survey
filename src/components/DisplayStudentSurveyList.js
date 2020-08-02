import React, { useState } from "react";
import SurveyResponse from './SurveyResponse';
import './popup_window.css'
import './SignIn.css'

const DisplayStudentSurvey = ({user}) =>{

        const [studentSurveyList, setStudentSurveyList] = useState([]);
        const [studentSurveyQuestion, setStudentSurveyQuestion] = useState([]);
        const [studentSurvey, setStudentSurvey] = useState([]);
        const [survey_id, setSurveyID] = useState("");
        const [isShown, setShown] = useState(false);
        const [isShownButton, setShownButton] = useState(false);
        const [isShownModButton, setShownModButton] = useState(false);
        const [isDisplayed, setIsDisplayed] = useState(true);

         const displaySurveyList = e => {

            setIsDisplayed(false);

            const objectToSend2 = {
                    id : user.id,
                }

            fetch("http://localhost:5000/get_student_survey_list", {
                method: "POST",
                headers: {
                "Content-type": "application/json",
              },
                body: JSON.stringify(objectToSend2),
            })
              .then((res) => res.json())
              .then((res) => {
                    setStudentSurveyList(res);
              });
      };

        const displaySurvey = (id) => {

            setSurveyID(id);
            openForm_Instructions();
            setShown(true);
      };
            const openForm_Instructions = () => {
                document.getElementById("instructionForm").style.display = "block";
                setShownButton(true);
            };
            const closeForm_Instructions = () => {
                document.getElementById("instructionForm").style.display = "none";
                setShownButton(false);
                setShownModButton(false);
            };
            const handleButtonCloseChange = e => {
                setShown(false);
                closeForm_Instructions();
            }

  return (
    <div className="wrapper" id="1">
        {
                isDisplayed == true ? displaySurveyList() : ""
        }
        <table border={2} id="1">
            {
                studentSurveyList.map((surveyList, idx) => (
                    <tr>
                        <td><b>{surveyList.surveyID} : </b></td><td><b>Name : </b> {surveyList.name} </td><td><b> Date :</b> {surveyList.date} </td>
                        <td><input type="submit" className="btn-primary" onClick={(id) =>displaySurvey(surveyList.surveyID)}  value="Display Survey" /></td>
                    </tr>

                ))
            }
        </table>
        <br/>
        <div className="form-popup" id="instructionForm">

              {
                  isShown == true ? <SurveyResponse user={user} surveyID={survey_id} onChangeClose={handleButtonCloseChange}/> : ""
              }
        </div>

    </div>
  );
}

export default DisplayStudentSurvey;