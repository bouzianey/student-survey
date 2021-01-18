import React, { useState, useEffect } from "react";
import SurveyResponse from './SurveyResponse';
import { MDBDataTable } from 'mdbreact';
import './popup_window.css'
import './SignIn.css'

const DisplayStudentSurvey = ({user}) =>{

        const [studentSurveyList, setStudentSurveyList] = useState([]);
        const [resultState, setResultState] = useState("");
        const [survey_id, setSurveyID] = useState("");
        const [isShown, setShown] = useState(false);
        const [isShownButton, setShownButton] = useState(false);
        const [isShownModButton, setShownModButton] = useState(false);
        const [refreshSurveyList,setRefreshSurveyList] = useState(false);
        const [dataObj, setDataObj] = useState({});

        useEffect(() => {

            const displaySurveyList = e => {

            const objToSend={
             id : user.id
            };
            fetch("https://survey-manager-yb-scsu.herokuapp.com/get_student_survey_list", {
                method: "POST",
                headers: {
                "Content-type": "application/json",
                //"Access-Control-Allow-Origin":"*"
              },
                body: JSON.stringify(objToSend),
            })
              .then((res) => res.json())
              .then((res) => {
                    setStudentSurveyList(res);

                    const data = {
                              columns: [
                                {
                                  label: 'ID',
                                  field: 'ID',
                                  sort: 'asc',
                                  width: 150
                                },
                                {
                                  label: 'Name',
                                  field: 'Name',
                                  sort: 'asc',
                                  width: 270
                                },
                                {
                                  label: 'Date',
                                  field: 'Date',
                                  sort: 'asc',
                                  width: 200
                                },{
                                  label: 'Status',
                                  field: 'Status',
                                  sort: 'asc',
                                  width: 100
                                },
                                {
                                  label: 'Button',
                                  field: 'Button',
                                  sort: 'asc',
                                  width: 100
                                }
                              ]
                    }
                 const rowList = [];
                for (const surveyList of res) {

                  const rowObj = {
                    ID: surveyList.surveyID,
                    Name: surveyList.name,
                    Date: surveyList.date,
                    Status: "Not Completed",
                    Button: <input type="submit" className="btn-primary" onClick={(id) =>displaySurvey(surveyList.surveyID)}  value="Display Survey" />

                  }
                  rowList.push(rowObj);
                }
                data.rows = rowList;
                setDataObj(data);
              });
      };
    displaySurveyList();
  }, [refreshSurveyList]);
        const displaySurvey = (id) => {

            setSurveyID(id);
            openForm_Instructions();
            setShown(true);
      };
            const openForm_Instructions = () => {
                document.getElementById("instructionForm").style.display = "block";
                document.getElementById("DataGrid").style.display = "none";
                setShownButton(true);
            };
            const closeForm_Instructions = () => {
                document.getElementById("instructionForm").style.display = "none";
                document.getElementById("DataGrid").style.display = "block";
                setShownButton(false);
                setShownModButton(false);
            };
            const handleButtonCloseChange = (val) => {
                setShown(false);
                setResultState(val);
                if (val.length > 0)
                {
                    document.getElementById("popup-alert").style.display = "block";
                    setRefreshSurveyList(true);
                }
                closeForm_Instructions();
            }

  return (
    <div className="wrapper" id="1">
        <h2>List of Pending Surveys</h2>
        <div id="DataGrid">
            <MDBDataTable
                striped
                bordered
                small
                data={dataObj}
              />
        </div>
        <div className="form-popup" id="instructionForm">

              {
                  isShown === true ? <SurveyResponse user={user} surveyID={survey_id} onChangeClose={handleButtonCloseChange}/> : ""
              }
        </div>
        <div key="popup-alert" className="pop-alter-box" id="popup-alert">
            {resultState === "Survey was successfully submitted" && (
                    <span className="badge-success">{resultState}</span>
        )}
        </div>

    </div>
  );
}

export default DisplayStudentSurvey;