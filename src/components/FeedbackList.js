import React, { useState, useEffect } from "react";
import { MDBDataTable } from 'mdbreact';
import car from "../static/prof.jpg";
import "./Styling.css"

const DisplayFeedbackList = ({user}) =>{

        const [studentFeedbackList, setStudentFeedbackList] = useState([]);
        const [feedbackContent, setFeedbackContent] = useState("");
        const [dataObj, setDataObj] = useState({});

        const displayFeedback = (val) => {
            setFeedbackContent(val);
            openForm_Instructions();
        }
        useEffect(() => {

            const displaySurveyList = e => {

            const objToSend={
             studentID : user.id
            };
            fetch("https://survey-manager-yb-scsu.herokuapp.com/get_instructor_feedback_list", {
                method: "POST",
                headers: {
                "Content-type": "application/json",
              },
                body: JSON.stringify(objToSend),
            })
              .then((res) => res.json())
              .then((res) => {

                  const rowList = [];
                  if(res.result === "success") {
                      setStudentFeedbackList(res);
                      for (const feedbackList of res.feedbackList) {
                          const rowObj = {
                            survey_name: feedbackList.surveyName,
                            date: feedbackList.date,
                            display_feedback: <input type="submit" className="btn-primary" onClick={(id) =>displayFeedback(feedbackList.content)}  value="Display Feedback" />

                          }
                        rowList.push(rowObj);
                    }
                  }
                  else {
                      console.log("There isn't any feedback provided yet!")
                  }
                    const data = {
                              columns: [
                                {
                                  label: 'Survey Name',
                                  field: 'survey_name',
                                  sort: 'asc',
                                  width: 150
                                },
                                {
                                  label: 'Date',
                                  field: 'date',
                                  sort: 'asc',
                                  width: 270
                                },
                                  {
                                  label: 'Display Feedback',
                                  field: 'display_feedback',
                                  sort: 'asc',
                                  width: 100
                                }
                              ]
                    }
                    data.rows = rowList;
                    setDataObj(data);
              });
      };
    displaySurveyList();
  }, []);
            const openForm_Instructions = () => {

                document.getElementById("instructionForm").style.display = "block";
                document.getElementById("containerFeedback").style.display = "block";
                document.getElementById("DataGrid").style.display = "none";
            };
            const closeForm_Instructions = () => {

                document.getElementById("containerFeedback").style.display = "none";
                document.getElementById("instructionForm").style.display = "none";
                document.getElementById("DataGrid").style.display = "block";
                setFeedbackContent("");
            };

  return (
    <div className="wrapper" id="1">
        <h2>Professor's Feedback</h2>
        <div id="DataGrid">
            <MDBDataTable
                striped
                bordered
                small
                data={dataObj}
              />
        </div>
        <div className="form-popup" id="instructionForm">
            <div className="container-feedback darker" id="containerFeedback">
                <img src={car} alt="avatar"/>
                    <p>{feedbackContent}</p>
                    <span className="time-left"></span>
            </div>
              <input type="submit" className="btn-danger" onClick={(id) =>closeForm_Instructions()}  value="close Feedback" />
        </div>
    </div>
  );
}

export default DisplayFeedbackList;