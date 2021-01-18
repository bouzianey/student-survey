import React from "react";
import "./SignIn.css";
import surveyImage from "../static/online_survey.jpg";
import SignInForm from './SignIn';

function Home({onChangeLogin}) {
  const handleLogin =(data) =>
  {
    onChangeLogin(data);
  }
  return (
    <div className="home">
      <div className="container">
        <div className="row align-items-center my-5">
          <div className="col-lg-7">
            <img
              className="img-fluid rounded mb-4 mb-lg-0"
              src={surveyImage}
              alt=""
            />
          </div>
          <div className="col-lg-5">
          <SignInForm  onChangeLogin={handleLogin}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;