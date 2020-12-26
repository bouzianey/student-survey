import React, {useState} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Home from "./components/Home";
import About from "./components/About";
import Contact  from "./components/Contact";
import SignInForm from "./components/SignIn"
import LogOutForm from "./components/LogOut"
import DisplayStudentSurvey from "./components/DisplayStudentSurveyList";
import DisplayFeedbackList from "./components/FeedbackList";



function App() {

        const [loggedInStatus, setloggedInStatus] = useState("NOT_LOGGED_IN");
        const [user, setUser] = useState({});

  const checkLoginStatus= (id) => {

    fetch("https://survey-manager-yb-scsu.herokuapp.com/login_instructor", {
                method: "POST",
                headers: {
                "Content-type": "application/json",
              },
                body: JSON.stringify(id),
            })
              .then((res) => res.json())
              .then((res) => {
                     if (
                          res.data.logged_in &&
                          this.state.loggedInStatus === "NOT_LOGGED_IN"
                        ) {
                          this.setState({
                            loggedInStatus: "LOGGED_IN",
                            user: res.data.user
                          });
                        } else if (
                          !res.data.logged_in &
                          (this.state.loggedInStatus === "LOGGED_IN")
                        ) {
                          this.setState({
                            loggedInStatus: "NOT_LOGGED_IN",
                            user: {}
                          });
                          }
              });
  }

  const componentDidMount= () => {
    this.checkLoginStatus();
  }

  const handleLogout = (val) => {

      setloggedInStatus(val);
      setUser({});
      console.log("Log out : ",loggedInStatus);

  }

  const handleLogin = (data) => {
      console.log(data);
    setloggedInStatus("LOGGED_IN")
      setUser(data)
  }

  return (
    <div className="App">
      <Router>
        <Navigation loggedInStatus={loggedInStatus}/>
        <Switch>
          <Route path="/" exact component={() => <Home />} />
          <Route path="/SurveyResponse"
                 exact component={() => loggedInStatus  === "LOGGED_IN" ? <DisplayStudentSurvey  user={user}/> : ""}
          />
          <Route path="/FeedbackList"
                 exact component={() => loggedInStatus  === "LOGGED_IN" ? <DisplayFeedbackList  user={user}/> : ""}
          />
          <Route path="/SignIn"
                 exact component={() => loggedInStatus  === "NOT_LOGGED_IN" ? <SignInForm  onChangeLogin={handleLogin}/> : ""}
          />
          <Route path="/LogOut"
                 exact component={() => loggedInStatus  === "LOGGED_IN" ? <LogOutForm onChangeLogout={handleLogout} /> : ""}
          />
          <Route path="/contact" exact component={() => <Contact />} />
          <Route path="/about" exact component={() => <About />} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;