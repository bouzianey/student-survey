import React from "react";
import { Link, withRouter } from "react-router-dom";


function Navigation(props) {
  console.log(props.loggedInStatus);
  return (
    <div className="navigation">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Smart Survey
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ml-auto">
              <li
                className={`nav-item  ${
                  props.location.pathname === "/" ? "active" : ""
                }`}
              >
                <Link className="nav-link" to="/">
                  Home
                  <span className="sr-only">(current)</span>
                </Link>
              </li>
               { props.loggedInStatus == "NOT_LOGGED_IN" ?
              <li
                  className={`nav-item  ${
                      props.location.pathname === "/SignIn" ? "active" : ""
                  }`}
              >
                <Link className="nav-link" to="/SignIn">
                  Sign in
                </Link>
              </li>
                  : ""
              }
              { props.loggedInStatus == "LOGGED_IN"  ?
              <li
                  className={`nav-item  ${
                      props.location.pathname === "/SurveyResponse" ? "active" : ""
                  }`}
              >
                <Link className="nav-link" to="/SurveyResponse">
                  SurveyResponse
                </Link>
              </li>: ""
              }

              { props.loggedInStatus == "LOGGED_IN"  ?
                <li
                  className={`nav-item  ${
                      props.location.pathname === "/LogOut" ? "active" : ""
                  }`}
              >
                <Link className="nav-link" to="/LogOut">
                  Log out
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