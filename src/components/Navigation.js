import React from "react";
import { Link, withRouter } from "react-router-dom";
import home_icon from "../static/survey-icon.png"
import "./Styling.css";

function Navigation(props) {
  return (
    <div className="navigation">
      <nav className="navbar navbar-expand-lg navbar-dark bg-info">
        <div className="container">
          <div className="alignIcon">
            <Link to="/">
              <img src={home_icon} alt="avatar" width="8%"/>
            </Link>
          </div>
          <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarResponsive"
              aria-controls="navbarResponsive"
              aria-expanded="false"
              aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ml-auto">

              {props.loggedInStatus !== "LOGGED_IN" ?
                  <li
                    className={`nav-item  ${
                        props.location.pathname === "/" ? "active" : ""
                    }`}
                  >
                    <Link className="nav-link" to="/">
                      Home
                      <span className="sr-only">(current)</span>
                    </Link>
                  </li> : ''
              }
              {props.loggedInStatus === "LOGGED_IN" ?
                  <li
                      className={`nav-item  ${
                          props.location.pathname === "/SurveyResponse" ? "active" : ""
                      }`}
                  >
                    <Link className="nav-link" to="/SurveyResponse">
                      Pending Surveys
                    </Link>
                  </li> : ""
              }
              {props.loggedInStatus === "LOGGED_IN" ?
                  <li
                      className={`nav-item  ${
                          props.location.pathname === "/FeedbackList" ? "active" : ""
                      }`}
                  >
                    <Link className="nav-link" to="/FeedbackList">
                      Feedbacks
                    </Link>
                  </li> : ""
              }
              {props.loggedInStatus === "LOGGED_IN" ?
                  <li
                      className={`nav-item  ${
                          props.location.pathname === "/LogOut" ? "active" : ""
                      }`}
                  >
                    <Link className="nav-link" to="/LogOut">
                      Logout
                    </Link>
                  </li> : ""
              }
              <li
                  className={`nav-item  ${
                      props.location.pathname === "/Contact" ? "active" : ""
                  }`}
              >
                <Link className="nav-link" to="/Contact">
                  Contact
                </Link>
              </li>
              <li
                  className={`nav-item  ${
                      props.location.pathname === "/About" ? "active" : ""
                  }`}
              >
                <Link className="nav-link" to="/About">
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default withRouter(Navigation);