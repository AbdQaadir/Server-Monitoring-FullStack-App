import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
//Components
import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import Login from "./components/Login";
// import LoginForm from "./components/reduxLogin";
import Register from "./components/Register";
import Profile from "./components/Profile";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: { username: "", password: "" },
      register: { username: "", password: "" },
    };
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <div className="container">
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/profile" component={Profile} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
